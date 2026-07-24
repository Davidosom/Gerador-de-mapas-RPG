// ================= CHAT + ROLAGEM DE DADOS =================
// Painel de texto na sidebar mais à esquerda. Funciona 100% local (sem sala
// multiplayer ativa, é só um array em memória + DOM); quando há uma sala ativa,
// as mensagens também são sincronizadas via Room (ver syncChatMessage/onRemoteMessages),
// andando de carona no mesmo poll de 1500ms já usado pra tudo mais.

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// Reconhece comandos de dado: NdM ou NdM±mod (ex: 1d20, 2d6+3, d100).
function parseDiceCommand(input) {
  const m = input.trim().match(/^(\d{1,2})?[dD](\d{1,3})\s*([+-]\s*\d{1,3})?$/);
  if (!m) return null;
  const count = m[1] ? parseInt(m[1], 10) : 1;
  const sides = parseInt(m[2], 10);
  const modifier = m[3] ? parseInt(m[3].replace(/\s/g, ''), 10) : 0;
  if (count < 1 || count > 20 || sides < 2) return null;
  return { count, sides, modifier };
}

function rollDice(count, sides) {
  const rolls = [];
  for (let i = 0; i < count; i++) rolls.push(1 + Math.floor(Math.random() * sides));
  return rolls;
}

function formatRollMessage({ count, sides, modifier }, rolls) {
  const sum = rolls.reduce((a, b) => a + b, 0) + modifier;
  // Mostra o(s) valor(es) originais dos dados entre aspas sempre que houver
  // soma de múltiplos dados ou modificador (+/-), já que nesses casos o
  // resultado final difere do que caiu em cada dado.
  const showDetail = rolls.length > 1 || modifier !== 0;
  const detail = showDetail ? ` ("${rolls.join(' + ')}")` : '';
  const modStr = modifier ? (modifier > 0 ? ` +${modifier}` : ` ${modifier}`) : '';
  return `🎲 rolou ${count}d${sides}${modStr} → ${sum}${detail}`;
}

const Chat = {
  messages: [],
  _logEl: null,

  init() {
    this._logEl = document.getElementById('chatLog');
    const form = document.getElementById('chatForm');
    if (!form || !this._logEl) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('chatInput');
      this.handleInput(input.value);
      input.value = '';
    });
  },

  handleInput(raw) {
    const text = raw.trim();
    if (!text) return;

    const roll = parseDiceCommand(text);
    if (roll) {
      const rolls = rollDice(roll.count, roll.sides);
      this.postMessage(formatRollMessage(roll, rolls), true);
    } else {
      this.postMessage(text, false);
    }
  },

  postMessage(text, isRoll) {
    const author = (typeof Room !== 'undefined' && Room.active)
      ? (Room.role === 'mestre' ? '🎲 Mestre' : (Room.displayName || 'Jogador'))
      : 'Você';
    const msg = { id: generateObjectId('msg'), author, text, isRoll: !!isRoll, ts: Date.now() };
    if (typeof Room !== 'undefined' && Room.active) Room.syncChatMessage(msg);
    this._appendLocal(msg);
  },

  // Chamado pelo Room a cada poll com as mensagens conhecidas do servidor — ignora
  // qualquer id já exibido (dedupe do eco otimista local vs. a cópia do poll).
  onRemoteMessages(serverMessages) {
    (serverMessages || []).forEach(m => this._appendLocal(m));
  },

  _appendLocal(msg) {
    if (!this._logEl || !msg || !msg.id) return;
    if (this.messages.some(m => m.id === msg.id)) return;
    this.messages.push(msg);

    const el = document.createElement('div');
    el.className = 'chat-message' + (msg.isRoll ? ' chat-roll' : '');
    el.innerHTML = `<span class="chat-author">${escapeHtml(msg.author)}:</span> ${escapeHtml(msg.text)}`;
    this._logEl.appendChild(el);
    this._logEl.scrollTop = this._logEl.scrollHeight;
  }
};

document.addEventListener('DOMContentLoaded', () => Chat.init());
