// ================= SALAS MULTIPLAYER (MESTRE / JOGADOR) =================
// Camada opcional de rede por cima do editor: se ninguém nunca cria/entra numa sala,
// nenhuma chamada de rede é feita e o app se comporta exatamente como antes (100%
// local). Toda a lógica de sala/permissão/sincronização vive neste arquivo — app.js só
// ganha pontos de checagem (Room.can...) e notificação (Room.sync...) que viram no-op
// sem sala ativa.

const Room = {
  active: false,
  role: null,           // 'mestre' | 'player'
  roomCode: null,
  masterToken: null,
  playerId: null,
  playerToken: null,
  displayName: null,
  version: 0,
  players: [],           // último snapshot conhecido dos jogadores (painel do Mestre)
  ownedObjectIds: [],     // (papel 'player')
  permissions: {},        // (papel 'player')
  _playerLayerVisibilityApplied: false,

  _pollHandle: null,
  _layersSyncTimer: null,
  _openBtnEl: null,

  // ---------------- Guardas de permissão ----------------
  // Todas retornam true quando não há sala ativa — o app solo continua sem restrição.
  canEditLayers() {
    return !this.active || this.role === 'mestre';
  },
  canAddObject() {
    return !this.active || this.role === 'mestre';
  },
  canDeleteObject(obj) {
    return !this.active || this.role === 'mestre';
  },
  isOwner(obj) {
    if (!this.active) return true;
    if (this.role === 'mestre') return true;
    return !!obj && !!obj.id && this.ownedObjectIds.includes(obj.id);
  },
  canMoveObject(obj) {
    // Objeto sem ficha (decoração: baú, mesa, barril...) é livre pra qualquer
    // Jogador mexer, mesmo sem ownership atribuída — só fichas (type === 'frame')
    // exigem ser dono.
    if (this.active && this.role === 'player' && obj && obj.type !== 'frame') return true;
    return this.isOwner(obj);
  },
  canEditAttributes(obj) {
    if (!this.active) return true;
    if (this.role === 'mestre') return true;
    return this.isOwner(obj) && !!this.permissions.editOwnAttributes;
  },

  // ---------------- Autenticação/transporte ----------------
  _authHeaders() {
    if (this.role === 'mestre') return { 'X-Room-Master-Token': this.masterToken };
    return { 'X-Room-Player-Id': this.playerId, 'X-Room-Player-Token': this.playerToken };
  },

  async _postAction(type, payload) {
    if (!this.active) return;
    try {
      const res = await fetch('PHP/rooms/action.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...this._authHeaders() },
        body: JSON.stringify({ roomCode: this.roomCode, type, payload })
      });
      if (!res.ok) {
        // Uma ação rejeitada (ex: 403 por falta de permissão, 404 por objeto já
        // removido por outro cliente) significa que o estado local pode ter divergido
        // do servidor — força um poll imediato pra corrigir a UI.
        console.warn('Sala: ação rejeitada', type, res.status);
        this._pollTick();
      }
    } catch (err) {
      console.warn('Sala: falha de rede ao sincronizar', type, err);
    }
  },

  // ---------------- Sincronizadores (viram no-op sem sala) ----------------
  syncLayers() {
    if (!this.active || this.role !== 'mestre') return;
    clearTimeout(this._layersSyncTimer);
    this._layersSyncTimer = setTimeout(() => {
      this._postAction('setLayers', {
        layers: state.layers,
        mapWidth: CONFIG.mapWidth,
        mapHeight: CONFIG.mapHeight
      });
    }, 700);
  },

  syncDoorsReset() {
    if (!this.active || this.role !== 'mestre') return;
    this._postAction('setDoors', { openDoors: [] });
  },

  syncDoor(idx) {
    if (!this.active) return;
    this._postAction('toggleDoor', { wallIndex: idx });
  },

  syncObjectAdd(obj) {
    if (!this.active) return;
    this._postAction('addObject', { object: obj });
  },

  syncObjectRemove(id) {
    if (!this.active || !id) return;
    this._postAction('removeObject', { id });
  },

  syncObjectMove(id, x, y) {
    if (!this.active || !id) return;
    this._postAction('moveObject', { id, x, y });
  },

  // Movimento em lote (arraste de múltiplos objetos selecionados de uma vez).
  syncObjectsMove(moves) {
    if (!this.active || !moves || moves.length === 0) return;
    if (moves.length === 1) { this.syncObjectMove(moves[0].id, moves[0].x, moves[0].y); return; }
    this._postAction('moveObjects', { moves });
  },

  syncObjectUpdate(id, fields) {
    if (!this.active || !id) return;
    this._postAction('updateObject', { id, fields });
  },

  syncChatMessage(msg) {
    if (!this.active) return;
    this._postAction('chatMessage', { message: msg });
  },

  // Usado depois de resizeMap: compara posições antes/depois (clamp) e manda só o
  // que realmente mudou.
  syncObjectsClampDiff(before, after) {
    if (!this.active || this.role !== 'mestre') return;
    const beforeById = new Map(before.map(o => [o.id, o]));
    after.forEach(obj => {
      const prev = beforeById.get(obj.id);
      if (prev && (prev.x !== obj.x || prev.y !== obj.y)) {
        this.syncObjectMove(obj.id, obj.x, obj.y);
      }
    });
  },

  // Usado depois de undo(): dois arrays completos, sem meio-termo — diffa por id e
  // emite as ações granulares equivalentes, pra manter o modelo de sincronização
  // consistente mesmo quando o Mestre desfaz uma alteração local.
  syncObjectsFullDiff(before, after) {
    if (!this.active || this.role !== 'mestre') return;
    const beforeById = new Map(before.map(o => [o.id, o]));
    const afterIds = new Set();

    after.forEach(obj => {
      afterIds.add(obj.id);
      const prev = beforeById.get(obj.id);
      if (!prev) { this.syncObjectAdd(obj); return; }

      if (prev.x !== obj.x || prev.y !== obj.y) this.syncObjectMove(obj.id, obj.x, obj.y);

      const prevAttrs = JSON.stringify(prev.attributes || null);
      const nextAttrs = JSON.stringify(obj.attributes || null);
      if (prevAttrs !== nextAttrs || !!prev.minimized !== !!obj.minimized) {
        this.syncObjectUpdate(obj.id, { attributes: obj.attributes, minimized: !!obj.minimized });
      }
    });

    before.forEach(obj => {
      if (!afterIds.has(obj.id)) this.syncObjectRemove(obj.id);
    });
  },

  setPlayerOwnership(playerId, ownedObjectIds) {
    return this._postAction('setPlayerOwnership', { playerId, ownedObjectIds });
  },

  setPlayerPermission(playerId, permission, value) {
    return this._postAction('setPlayerPermission', { playerId, permission, value });
  },

  // ---------------- Ciclo de vida da sala ----------------
  async createRoom() {
    const snapshot = {
      mapWidth: CONFIG.mapWidth,
      mapHeight: CONFIG.mapHeight,
      tileSize: CONFIG.tileSize,
      layers: state.layers,
      objects: state.objects,
      layerVisibility: state.layerVisibility
    };
    try {
      const res = await fetch('PHP/rooms/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mapSnapshot: snapshot })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { toast('Não foi possível criar a sala.', 'error'); return; }

      this.active = true;
      this.role = 'mestre';
      this.roomCode = data.roomCode;
      this.masterToken = data.masterToken;
      this._saveSession();
      this._onEnterRoom();
      toast(`Sala ${data.roomCode} criada! Compartilhe o código com o grupo.`, 'success');
    } catch (err) {
      toast('Erro de rede ao criar a sala.', 'error');
    }
  },

  async joinRoom(roomCode, displayName) {
    try {
      const res = await fetch('PHP/rooms/join.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode: roomCode.toUpperCase(), displayName })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast(data.error === 'not_found' ? 'Sala não encontrada.' : 'Não foi possível entrar na sala.', 'error');
        return;
      }

      this.active = true;
      this.role = 'player';
      this.roomCode = data.roomCode;
      this.playerId = data.playerId;
      this.playerToken = data.playerToken;
      this.displayName = data.displayName;
      this.permissions = data.permissions || {};
      this._saveSession();
      this._onEnterRoom();
      toast(`Entrou na sala ${data.roomCode} como ${data.displayName}!`, 'success');
    } catch (err) {
      toast('Erro de rede ao entrar na sala.', 'error');
    }
  },

  async _resumeSession() {
    const saved = this._loadSession();
    if (!saved || !saved.roomCode || !saved.role) return;

    this.role = saved.role;
    this.roomCode = saved.roomCode;
    this.masterToken = saved.masterToken || null;
    this.playerId = saved.playerId || null;
    this.playerToken = saved.playerToken || null;
    this.displayName = saved.displayName || null;

    if (saved.role === 'player') {
      try {
        const res = await fetch('PHP/rooms/join.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roomCode: saved.roomCode, playerId: saved.playerId, playerToken: saved.playerToken })
        });
        if (!res.ok) { this._clearSession(); return; }
        const data = await res.json();
        this.displayName = data.displayName;
        this.permissions = data.permissions || {};
      } catch (err) {
        return; // rede fora do ar — não descarta a sessão salva, tenta de novo depois
      }
    }

    this.active = true;
    this._onEnterRoom();
  },

  leave() {
    const wasActive = this.active;
    const wasPlayer = this.role === 'player';
    this.stopPolling();
    this.active = false;
    this.role = null;
    this.roomCode = null;
    this.masterToken = null;
    this.playerId = null;
    this.playerToken = null;
    this.displayName = null;
    this.players = [];
    this.ownedObjectIds = [];
    this.permissions = {};
    this._playerLayerVisibilityApplied = false;
    this._clearSession();
    this._onExitRoom();
    // Jogador não fica com cópia do mapa da sala depois de sair (pode ter segredos
    // do Mestre); o Mestre continua com o mapa local que ele mesmo criou.
    if (wasPlayer) resetLocalMapState();
    if (wasActive) toast('Você saiu da sala.', 'info');
  },

  // ---------------- Polling ----------------
  startPolling() {
    if (this._pollHandle) return;
    this._pollTick();
    this._pollHandle = setInterval(() => this._pollTick(), 1500);
  },

  stopPolling() {
    clearInterval(this._pollHandle);
    this._pollHandle = null;
  },

  async _pollTick() {
    if (!this.active) return;
    try {
      const res = await fetch(`PHP/rooms/state.php?roomCode=${encodeURIComponent(this.roomCode)}`, {
        headers: this._authHeaders()
      });
      if (res.status === 404) {
        toast('Sala não encontrada — saindo da sala.', 'warning');
        this.leave();
        return;
      }
      if (res.status === 401) {
        toast('Sessão de sala inválida — saindo da sala.', 'warning');
        this.leave();
        return;
      }
      if (!res.ok) return; // erro transitório, tenta de novo no próximo tick
      const data = await res.json();
      this._applyRemoteState(data);
    } catch (err) {
      // rede instável — silencioso, tenta de novo no próximo tick
    }
  },

  _applyRemoteState(data) {
    const versionChanged = data.version !== this.version;
    this.version = data.version;
    this.players = data.players || [];
    if (typeof Chat !== 'undefined') Chat.refreshRecipients();

    if (data.you) {
      if (data.you.role === 'player') {
        this.ownedObjectIds = data.you.ownedObjectIds || [];
        this.permissions = data.you.permissions || {};
      }
    }

    this._renderPlayersPanel();

    if (!versionChanged) return;

    if (data.mapWidth !== CONFIG.mapWidth || data.mapHeight !== CONFIG.mapHeight) {
      CONFIG.mapWidth = data.mapWidth;
      CONFIG.mapHeight = data.mapHeight;
      canvas.width = CONFIG.mapWidth * CONFIG.tileSize;
      canvas.height = CONFIG.mapHeight * CONFIG.tileSize;
      updateMapSizeInputs();
    }

    state.layers.ground = data.layers.ground;
    state.layers.walls = data.layers.walls;
    // Visibilidade de camada é preferência de cada Jogador (ver toggleLayerVisibility/
    // Room.syncLayers, que só sincroniza pro servidor quando role === 'mestre') — só
    // aplicamos o valor do servidor uma vez, na entrada da sala; depois disso, um poll
    // disparado por QUALQUER edição de outra pessoa não deve reverter o que o Jogador
    // já escolheu mostrar/ocultar na própria tela. Mestre continua sempre em sincronia
    // com o próprio valor (é a fonte dele).
    if (data.layerVisibility && (this.role !== 'player' || !this._playerLayerVisibilityApplied)) {
      state.layerVisibility = data.layerVisibility;
      this._playerLayerVisibilityApplied = true;
    }
    state.openDoors = new Set(data.openDoors || []);

    const draggedId = (state.isDragging && state.draggedObjectIndex !== null && state.objects[state.draggedObjectIndex])
      ? state.objects[state.draggedObjectIndex].id
      : null;

    const localById = new Map(state.objects.map(o => [o.id, o]));
    state.objects = data.objects.map(serverObj => {
      if (serverObj.id === draggedId) return localById.get(serverObj.id); // preserva o que está sendo arrastado localmente
      const local = localById.get(serverObj.id);
      if (local && local._cachedImage && local.imageSrc === serverObj.imageSrc) {
        return { ...serverObj, _cachedImage: local._cachedImage };
      }
      return { ...serverObj, _cachedImage: null };
    });

    if (data.messages && typeof Chat !== 'undefined') Chat.onRemoteMessages(data.messages);

    render();
  },

  // ---------------- Sessão (localStorage) ----------------
  _saveSession() {
    const session = { role: this.role, roomCode: this.roomCode };
    if (this.role === 'mestre') {
      session.masterToken = this.masterToken;
    } else {
      session.playerId = this.playerId;
      session.playerToken = this.playerToken;
      session.displayName = this.displayName;
    }
    try { localStorage.setItem('rpgRoom_session', JSON.stringify(session)); } catch (e) { /* ignora */ }
  },
  _loadSession() {
    try {
      const raw = localStorage.getItem('rpgRoom_session');
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  },
  _clearSession() {
    try { localStorage.removeItem('rpgRoom_session'); } catch (e) { /* ignora */ }
  },

  // ---------------- UI: entrar/sair da sala ----------------
  _onEnterRoom() {
    if (this._openBtnEl) this._openBtnEl.style.display = 'none';
    this._renderStatusBar();

    if (this.role === 'player') {
      document.getElementById('playersPanelSection')?.remove();
      viewMode.active = true;
      document.body.classList.add('view-mode');
      document.body.classList.add('room-player');
      state.currentTool = 'select';
      const viewBtn = document.getElementById('viewModeBtn');
      if (viewBtn) viewBtn.style.display = 'none';
      startViewModeAnimation();
      this._forceChatOpen();
    } else {
      this._renderPlayersPanel();
    }

    if (typeof Chat !== 'undefined') Chat.refreshRecipients();
    this.startPolling();
    render();
  },

  _onExitRoom() {
    if (this._openBtnEl) this._openBtnEl.style.display = '';
    this._renderStatusBar();
    document.body.classList.remove('room-player');
    document.getElementById('playersPanelSection')?.remove();
    const viewBtn = document.getElementById('viewModeBtn');
    if (viewBtn) viewBtn.style.display = '';
    if (typeof Chat !== 'undefined') Chat.refreshRecipients();
  },

  // Garante que o chat abra visível pro Jogador, mesmo que 'chat' esteja marcado
  // como painel colapsado em localStorage['rpgEditor_collapsedPanels'] de uma
  // sessão anterior no mesmo navegador (initExpandablePanels em app.js já rodou
  // e aplicou esse estado antes da sala existir).
  _forceChatOpen() {
    const chatSidebar = document.getElementById('chatSidebar');
    const chatPanel = document.querySelector('.panel[data-panel="chat"]');
    chatSidebar?.classList.remove('collapsed');
    chatPanel?.classList.remove('collapsed');
    try {
      const stored = new Set(JSON.parse(localStorage.getItem('rpgEditor_collapsedPanels') || '[]'));
      if (stored.has('chat')) {
        stored.delete('chat');
        localStorage.setItem('rpgEditor_collapsedPanels', JSON.stringify([...stored]));
      }
    } catch (e) { /* ignora */ }
  },

  // ---------------- UI: modal criar/entrar ----------------
  openRoomModal() {
    document.querySelector('.room-modal')?.remove();
    const modal = document.createElement('div');
    modal.className = 'room-modal';
    modal.innerHTML = `
      <div class="room-modal-content">
        <div class="frame-editor-header">
          <h3>🔗 Sala Multiplayer</h3>
          <button class="close-btn" data-close="true">✕</button>
        </div>
        <div class="room-modal-body">
          <div class="room-modal-section">
            <h4>🎲 Criar sala como Mestre</h4>
            <p class="hint-text">Cria uma sala a partir do mapa atual e gera um código pra compartilhar com o grupo.</p>
            <button type="button" id="roomCreateBtn" class="btn-primary" style="width:100%;">Criar Sala</button>
          </div>
          <div class="room-modal-divider"></div>
          <div class="room-modal-section">
            <h4>🧑 Entrar como Jogador</h4>
            <div class="attr-input-group">
              <label>Código da sala</label>
              <input type="text" id="roomJoinCodeInput" maxlength="10" placeholder="ex: K3F9Q2" style="text-transform:uppercase;">
            </div>
            <div class="attr-input-group">
              <label>Seu nome</label>
              <input type="text" id="roomJoinNameInput" maxlength="40" placeholder="ex: Ana">
            </div>
            <button type="button" id="roomJoinBtn" class="btn-primary" style="width:100%;">Entrar na Sala</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => modal.remove();
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    modal.querySelectorAll('[data-close="true"]').forEach(b => b.addEventListener('click', close));

    modal.querySelector('#roomCreateBtn').addEventListener('click', async () => {
      await this.createRoom();
      close();
    });
    modal.querySelector('#roomJoinBtn').addEventListener('click', async () => {
      const code = modal.querySelector('#roomJoinCodeInput').value.trim();
      const name = modal.querySelector('#roomJoinNameInput').value.trim();
      if (!code || !name) { toast('Preencha o código da sala e seu nome.', 'warning'); return; }
      await this.joinRoom(code, name);
      close();
    });
  },

  // ---------------- UI: barra de status ----------------
  _ensureStatusBarEl() {
    let el = document.getElementById('roomStatusBar');
    if (!el) {
      el = document.createElement('div');
      el.id = 'roomStatusBar';
      el.className = 'room-status-bar hidden';
      const header = document.querySelector('header');
      header.insertAdjacentElement('afterend', el);
    }
    return el;
  },

  _renderStatusBar() {
    const el = this._ensureStatusBarEl();
    if (!this.active) { el.classList.add('hidden'); el.innerHTML = ''; return; }
    el.classList.remove('hidden');

    const roleLabel = this.role === 'mestre' ? '🎲 Mestre' : `🧑 Jogador — ${this.displayName || ''}`;
    el.innerHTML = `
      <span>🔗 Sala <strong>${this.roomCode}</strong></span>
      <span>${roleLabel}</span>
      <button type="button" id="roomCopyCodeBtn">📋 Copiar código</button>
      <button type="button" id="roomLeaveBtn">🚪 Sair da Sala</button>
    `;

    el.querySelector('#roomCopyCodeBtn').onclick = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(this.roomCode)
          .then(() => toast('Código copiado!', 'success'))
          .catch(() => toast('Código da sala: ' + this.roomCode, 'info'));
      } else {
        toast('Código da sala: ' + this.roomCode, 'info');
      }
    };
    el.querySelector('#roomLeaveBtn').onclick = async () => {
      const ok = await confirmDialog('Sair da sala? Você pode entrar de novo com o código.', { confirmLabel: 'Sair' });
      if (ok) this.leave();
    };
  },

  // ---------------- UI: painel de Jogadores (Mestre) ----------------
  _ensurePlayersPanelEl() {
    let section = document.getElementById('playersPanelSection');
    if (section) return section;

    section = document.createElement('section');
    section.className = 'panel';
    section.id = 'playersPanelSection';
    section.dataset.panel = 'players';
    section.innerHTML = `
      <h3 class="panel-header">🧑‍🤝‍🧑 Jogadores <span class="panel-arrow">▼</span></h3>
      <div class="panel-body">
        <div id="playersPanelList" class="players-list"></div>
        <small class="hint-text">💡 Escolha qual Moldura cada jogador controla e se ele pode editar os próprios atributos (ex: HP).</small>
      </div>
    `;

    const header = section.querySelector('.panel-header');
    header.addEventListener('click', () => {
      section.classList.toggle('collapsed');
      header.classList.toggle('collapsed');
    });

    // Id explícito (não '.sidebar' genérico): desde que a sidebar de Chat também
    // ganhou a classe "sidebar" e vem antes no DOM, um seletor por classe pegaria o
    // painel de Chat por engano.
    const sidebar = document.getElementById('leftSidebar');
    sidebar.insertBefore(section, sidebar.firstElementChild);
    return section;
  },

  _renderPlayersPanel() {
    if (!this.active || this.role !== 'mestre') {
      document.getElementById('playersPanelSection')?.remove();
      return;
    }

    const section = this._ensurePlayersPanelEl();
    const list = section.querySelector('#playersPanelList');

    if (this.players.length === 0) {
      list.innerHTML = '<small class="hint-text">Nenhum jogador entrou ainda. Compartilhe o código da sala.</small>';
      return;
    }

    const frameOptions = state.objects
      .filter(o => o.type === 'frame')
      .map(f => `<option value="${f.id}">${(f.attributes && f.attributes.Nome) || f.template}</option>`)
      .join('');

    list.innerHTML = this.players.map(p => {
      const online = p.lastSeenAt && (Date.now() - new Date(p.lastSeenAt).getTime()) < 10000;
      return `
        <div class="player-row" data-player-id="${p.id}">
          <div class="player-row-name">
            <span class="player-dot ${online ? 'online' : 'offline'}"></span>
            ${p.displayName}
          </div>
          <select class="player-token-select" data-player-id="${p.id}">
            <option value="">— sem token —</option>
            ${frameOptions}
          </select>
          <label class="player-perm-toggle">
            <input type="checkbox" class="player-perm-checkbox" data-player-id="${p.id}" ${p.permissions && p.permissions.editOwnAttributes ? 'checked' : ''}>
            Pode editar atributos
          </label>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.player-token-select').forEach(sel => {
      const p = this.players.find(pl => pl.id === sel.dataset.playerId);
      if (p) sel.value = (p.ownedObjectIds && p.ownedObjectIds[0]) || '';
      sel.addEventListener('change', () => {
        const ids = sel.value ? [sel.value] : [];
        this.setPlayerOwnership(sel.dataset.playerId, ids);
      });
    });

    list.querySelectorAll('.player-perm-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        this.setPlayerPermission(cb.dataset.playerId, 'editOwnAttributes', cb.checked);
      });
    });
  }
};

function initRoomUI() {
  const tb = document.querySelector('.toolbar');
  const btn = document.createElement('button');
  btn.id = 'roomOpenBtn';
  btn.innerHTML = '🔗 Sala';
  btn.onclick = () => Room.openRoomModal();
  tb.appendChild(btn);
  Room._openBtnEl = btn;

  Room._resumeSession();
}

document.addEventListener('DOMContentLoaded', initRoomUI);
