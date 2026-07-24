// ================= CONFIGURAÇÃO =================
const CONFIG = {
  mapWidth: 24,
  mapHeight: 18,
  tileSize: 32,
  
  tileCategories: {
    '🌿 Terreno': [
      { id: 0, name: 'Vazio', texture: null, emoji: null, color: '#1a1a1a' },
      { id: 1, name: 'Grama', texture: 'texture-grass', emoji: null, color: '#4a7c59' },
      { id: 2, name: 'Terra', texture: 'texture-dirt', emoji: null, color: '#8b5a2b' },
      { id: 3, name: 'Pedra', texture: 'texture-stone', emoji: null, color: '#6b6b6b' },
      { id: 4, name: 'Areia', texture: 'texture-sand', emoji: null, color: '#d4b896' },
      { id: 5, name: 'Madeira', texture: 'texture-wood', emoji: null, color: '#a0754f' },
      { id: 6, name: 'Metal', texture: 'texture-metal', emoji: null, color: '#7a7a8a' },
      { id: 7, name: 'Água', texture: 'texture-water', emoji: null, color: '#4a90a4' },
      { id: 8, name: 'Lava', texture: 'texture-lava', emoji: null, color: '#c41e3a', lightRadius: 3 },
    ],
    '🧱 Estruturas': [
      { id: 20, name: 'Parede', texture: 'texture-stone', emoji: null, color: '#4a3728' },
      { id: 21, name: 'Parede L', texture: 'texture-stone', emoji: null, color: '#4a3728' },
      { id: 22, name: 'Canto', texture: 'texture-stone', emoji: null, color: '#3d2d20' },
      { id: 23, name: 'Porta', texture: 'texture-wood', emoji: '🚪', color: '#8b5a2b' },
      { id: 24, name: 'Janela', texture: null, emoji: '🪟', color: '#5a7a9a', blocksVision: false },
      { id: 25, name: 'Escada', texture: 'texture-stairs', emoji: null, color: '#7a6a5a' },
      { id: 26, name: 'Tapete', texture: 'texture-rug', emoji: null, color: '#8a2f2f' },
      { id: 27, name: 'Plataforma', texture: 'texture-wood', emoji: null, color: '#9a7a4a' },
      { id: 28, name: 'Entulho', texture: 'texture-stone', emoji: null, color: '#5a5248' },
      { id: 29, name: 'Alçapão', texture: 'texture-wood', emoji: '🕳️', color: '#3a2a1a' },
      { id: 30, name: 'Coluna', texture: 'texture-stone', emoji: null, color: '#7a7a72' },
    ],
    '🎒 Objetos': [
      { id: 40, name: 'Baú', texture: 'texture-wood', emoji: '🪙', color: '#d4a017' },
      { id: 41, name: 'Mesa', texture: 'texture-wood', emoji: '🪵', color: '#8b5a2b' },
      { id: 42, name: 'Cadeira', texture: 'texture-wood', emoji: '🪑', color: '#7a4a2a' },
      { id: 43, name: 'Fogueira', texture: 'texture-lava', emoji: '🔥', color: '#ff6b35', lightRadius: 5 },
      { id: 44, name: 'Tocha', texture: null, emoji: '🕯️', color: '#ffaa33', lightRadius: 4 },
      { id: 45, name: 'Barril', texture: 'texture-wood', emoji: '🛢️', color: '#6b4a2a' },
      { id: 46, name: 'Livro', texture: null, emoji: '📚', color: '#8b4513' },
      { id: 47, name: 'Poção', texture: null, emoji: '🧪', color: '#00ff88' },
    ],
    '⚔️ Itens RPG': [
      { id: 60, name: 'Espada', texture: 'texture-metal', emoji: '🗡️', color: '#c0c0c0' },
      { id: 61, name: 'Escudo', texture: 'texture-metal', emoji: '🛡️', color: '#8888aa' },
      { id: 62, name: 'Arco', texture: 'texture-wood', emoji: '🏹', color: '#a0754f' },
      { id: 63, name: 'Chave', texture: 'texture-metal', emoji: '🗝️', color: '#ffd700' },
      { id: 64, name: 'Gema', texture: null, emoji: '💎', color: '#00ffff' },
      { id: 65, name: 'Moeda', texture: 'texture-metal', emoji: '🪙', color: '#ffd700' },
      { id: 66, name: 'Crânio', texture: null, emoji: '💀', color: '#f0f0f0' },
      { id: 67, name: 'Planta', texture: 'texture-grass', emoji: '🌿', color: '#5a9a5a' },
      { id: 1000, name: 'Moldura', texture: 'texture-metal', emoji: '🖼️', color: '#5a5a6a', type: 'frame' },
    ],
    '🏙️ Era Moderna': [
      { id: 80, name: 'Asfalto', texture: 'texture-asphalt', emoji: null, color: '#3a3a3a' },
      { id: 81, name: 'Concreto', texture: 'texture-concrete', emoji: null, color: '#9a9a92' },
      { id: 82, name: 'Vidro', texture: 'texture-glass', emoji: null, color: '#a8d8e8', blocksVision: false },
      { id: 83, name: 'Poste de Luz', texture: null, emoji: '💡', color: '#3a3a2a' },
      { id: 84, name: 'Carro', texture: null, emoji: '🚗', color: '#7a2f2f' },
      { id: 85, name: 'Banco', texture: 'texture-wood', emoji: null, color: '#6b4a2a' },
      { id: 86, name: 'Lixeira', texture: null, emoji: '🗑️', color: '#4a4a4a' },
      { id: 87, name: 'Computador', texture: null, emoji: '🖥️', color: '#2a2a2a' },
      { id: 88, name: 'Pistola', texture: null, emoji: '🔫', color: '#333333' },
      { id: 89, name: 'Maleta', texture: null, emoji: '💼', color: '#5a3d2b' },
      { id: 90, name: 'Cone de Trânsito', texture: null, emoji: '🚧', color: '#e67e22' },
    ]
  }
};
// ================= ESTADO GLOBAL =================
const state = {
  // Grid-based layers (ground e walls)
  layers: {
    ground: new Array(CONFIG.mapWidth * CONFIG.mapHeight).fill(0),
    walls: new Array(CONFIG.mapWidth * CONFIG.mapHeight).fill(0)
  },
  // Objetos livres (array de objetos com posição X/Y)
  objects: [],
  
  currentLayer: 'ground',
  currentTool: 'brush',
  currentTileId: 1,
  
  // Visibilidade das camadas
  layerVisibility: {
    ground: true,
    walls: true,
    objects: true
  },
  
  // Controle de interação
  isDrawing: false,
  isDragging: false,
  draggedObjectIndex: null,
  dragOffset: { x: 0, y: 0 },

  // Seleção múltipla de objetos (camada Objetos + ferramenta Mover): ids (não índices,
  // que mudam a cada poll/undo/eraser) dos objetos atualmente selecionados.
  selectedObjectIds: new Set(),
  isMarqueeSelecting: false,
  marqueeStart: null,
  marqueeEnd: null,
  // Snapshot { id, x, y } de cada objeto selecionado, tirado no início do arraste em
  // grupo — usado pra calcular o delta aplicado aos "seguidores" do objeto arrastado.
  dragGroupStart: null,
  camera: {
    offset: { x: 0, y: 0 },
    isPanning: false,
    start: { x: 0, y: 0 },
    zoom: 1
  },
  
  history: [],
  collapsedCategories: new Set(Object.keys(CONFIG.tileCategories)),
  referenceImage: null,

  // Régua de medição
  metersPerTile: 1.5,
  isMeasuring: false,
  rulerStart: null,
  rulerEnd: null,

  // Ferramentas de forma (Linha / Retângulo)
  isDrawingShape: false,
  shapeStart: null,
  shapeEnd: null,

  // Overlay de alcance de movimento (Moldura em exibição, ou null)
  rangeOverlay: null,

  // Sistema de sombra: índices (camada walls) das portas atualmente abertas
  openDoors: new Set(),

  // Ferramenta de Área de Efeito (clique e arraste, círculo persistente)
  isDrawingAoE: false,
  aoeCenter: null,
  aoeEdge: null
};
// ================= MODO DE VISUALIZAÇÃO/PLAY =================
const viewMode = {
  active: false,
  selectedObject: null,
  hoveredObject: null,
  isPanning: false,
  panStart: { x: 0, y: 0 },

  toggle() {
    this.active = !this.active;
    const btn = document.getElementById('viewModeBtn');

    if (this.active) {
      btn.classList.add('active');
      btn.innerHTML = '✏️ Editar';
      document.body.classList.add('view-mode');
      state.currentTool = 'select';
      startViewModeAnimation();
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '▶️ Visualizar';
      document.body.classList.remove('view-mode');
      this.selectedObject = null;
      this.hoveredObject = null;
    }
    render();
  },

  // x/y já em espaço de mapa (saída de getMousePos, que já subtrai o offset da câmera)
  selectObject(x, y) {
    for (let i = state.objects.length - 1; i >= 0; i--) {
      const obj = state.objects[i];
      if (x >= obj.x && x < obj.x + obj.w &&
          y >= obj.y && y < obj.y + obj.h) {
        this.selectedObject = i;
        render();
        return true;
      }
    }
    this.selectedObject = null;
    render();
    return false;
  },

  // Alterna aberta/fechada uma Porta (camada walls, id 23) na célula indicada.
  // Retorna true se havia uma porta ali (clique "consumido").
  toggleDoorAt(x, y) {
    const gridX = Math.floor(x / CONFIG.tileSize);
    const gridY = Math.floor(y / CONFIG.tileSize);
    const idx = getIndexFromCoords(gridX, gridY);
    if (idx === -1 || state.layers.walls[idx] !== 23) return false;

    if (state.openDoors.has(idx)) state.openDoors.delete(idx);
    else state.openDoors.add(idx);
    Room.syncDoor(idx);
    render();
    return true;
  },

  // Atualiza o item sob o cursor (para o destaque dinâmico); só redesenha quando muda.
  updateHover(x, y) {
    let found = null;
    for (let i = state.objects.length - 1; i >= 0; i--) {
      const obj = state.objects[i];
      if (x >= obj.x && x < obj.x + obj.w && y >= obj.y && y < obj.y + obj.h) {
        found = i;
        break;
      }
    }
    if (found !== this.hoveredObject) {
      this.hoveredObject = found;
      render();
    }
  },

  startPan(x, y) {
    this.isPanning = true;
    this.panStart = { x, y };
    canvas.style.cursor = 'grabbing';
  },

  doPan(clientX, clientY) {
    if (!this.isPanning) return;
    const dx = clientX - this.panStart.x;
    const dy = clientY - this.panStart.y;
    state.camera.offset.x += dx;
    state.camera.offset.y += dy;
    this.panStart = { x: clientX, y: clientY };
    render();
  },

  endPan() {
    this.isPanning = false;
    canvas.style.cursor = 'grab';
  },

  // Info tooltip ao selecionar objeto
  getSelectedInfo() {
    if (this.selectedObject === null || this.selectedObject >= state.objects.length) return null;
    const obj = state.objects[this.selectedObject];
    const tile = getTileConfig(obj.tileId);
    return {
      name: tile?.name || 'Desconhecido',
      emoji: tile?.emoji || '',
      type: obj.type === 'frame' ? 'Moldura' : 'Objeto',
      position: `(${Math.round(obj.x)}, ${Math.round(obj.y)})`,
      template: obj.template || null,
      attributes: obj.type === 'frame' ? { ...obj.attributes } : null,
      customAttributes: obj.customAttributes || []
    };
  }
};
// ================= CANVAS =================
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d', { alpha: false });
canvas.width = CONFIG.mapWidth * CONFIG.tileSize;
canvas.height = CONFIG.mapHeight * CONFIG.tileSize;
applyCanvasZoom();

// ================= UTILITÁRIOS =================
function getTileConfig(id) {
  for (const tiles of Object.values(CONFIG.tileCategories)) {
    const found = tiles.find(t => t.id === id);
    if (found) return found;
  }
  return CONFIG.tileCategories['🌿 Terreno'][0];
}

function getIndexFromCoords(x, y) {
  if (x < 0 || x >= CONFIG.mapWidth || y < 0 || y >= CONFIG.mapHeight) return -1;
  return y * CONFIG.mapWidth + x;
}

function getCoordsFromIndex(index) {
  return {
    x: index % CONFIG.mapWidth,
    y: Math.floor(index / CONFIG.mapWidth)
  };
}

// ================= FERRAMENTAS DE FORMA (LINHA / RETÂNGULO) =================
function getLineCells(x0, y0, x1, y1) {
  const cells = [];
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  let x = x0, y = y0;

  while (true) {
    cells.push({ x, y });
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x += sx; }
    if (e2 <= dx) { err += dx; y += sy; }
  }
  return cells;
}

function getRectOutlineCells(x0, y0, x1, y1) {
  const minX = Math.min(x0, x1), maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1), maxY = Math.max(y0, y1);
  const cells = [];

  for (let x = minX; x <= maxX; x++) {
    cells.push({ x, y: minY });
    if (maxY !== minY) cells.push({ x, y: maxY });
  }
  for (let y = minY + 1; y <= maxY - 1; y++) {
    cells.push({ x: minX, y });
    if (maxX !== minX) cells.push({ x: maxX, y });
  }
  return cells;
}

function getShapeCells() {
  if (!state.shapeStart || !state.shapeEnd) return [];
  const { x: x0, y: y0 } = state.shapeStart;
  const { x: x1, y: y1 } = state.shapeEnd;
  return state.currentTool === 'rect'
    ? getRectOutlineCells(x0, y0, x1, y1)
    : getLineCells(x0, y0, x1, y1);
}

function applyShapeCells(cells) {
  if (!Room.canEditLayers()) return;
  const newValue = state.currentTileId;
  cells.forEach(({ x, y }) => {
    const idx = getIndexFromCoords(x, y);
    if (idx !== -1) state.layers[state.currentLayer][idx] = newValue;
  });
  Room.syncLayers();
}

// ================= SISTEMA DE SOMBRA / LINHA DE VISÃO =================
// Uma célula da camada walls bloqueia a visão, exceto uma Porta (id 23) aberta.
function isOpaqueCell(idx) {
  const wallId = state.layers.walls[idx];
  if (!wallId) return false;
  if (wallId === 23 && state.openDoors.has(idx)) return false;
  const tile = getTileConfig(wallId);
  if (tile && tile.blocksVision === false) return false; // janela, vidro etc.
  return true;
}

// ================= COLISÃO (MODO VISUALIZAÇÃO) =================
// Uma célula da camada walls impede passagem, exceto uma Porta (id 23) aberta.
// Diferente de isOpaqueCell (visão): aqui uma Janela/Vidro continua bloqueando —
// dá pra enxergar através, mas não pra atravessar.
function isBlockingWallCell(idx) {
  const wallId = state.layers.walls[idx];
  if (!wallId) return false;
  if (wallId === 23 && state.openDoors.has(idx)) return false;
  return true;
}

// Checa se o CENTRO do retângulo (x,y,w,h) em pixels cai numa célula bloqueadora da
// camada walls — mesma convenção de "onde este objeto está no grid" que
// getCharacterVisionSources/getLightSources já usam (centro, não a caixa inteira).
// Necessário porque o token minimizado (56px, FRAME_MINIMIZED_SIZE) e o card cheio
// (140x180) são maiores que um tile (32px) — colisão pela caixa inteira faria
// qualquer Moldura nunca caber por uma porta de 1 tile de largura.
function isBlockedAt(x, y, w, h) {
  const gx = Math.floor((x + w / 2) / CONFIG.tileSize);
  const gy = Math.floor((y + h / 2) / CONFIG.tileSize);
  const idx = getIndexFromCoords(gx, gy);
  return idx !== -1 && isBlockingWallCell(idx);
}

// Reaproveita getLineCells (Bresenham) para andar da origem até o alvo: qualquer
// célula opaca ANTES do alvo bloqueia a visão. O próprio alvo é sempre "visto" mesmo
// que seja opaco (ex: a face de uma parede à frente do observador).
function hasLineOfSight(x0, y0, x1, y1) {
  const cells = getLineCells(x0, y0, x1, y1);
  for (let i = 1; i < cells.length; i++) {
    const idx = getIndexFromCoords(cells[i].x, cells[i].y);
    if (idx === -1) return false;
    const isTarget = i === cells.length - 1;
    if (!isTarget && isOpaqueCell(idx)) return false;
  }
  return true;
}

// Todas as células dentro do raio (distância euclidiana) com linha de visão livre
// a partir de (sx, sy).
function computeVisionFromSource(sx, sy, radius) {
  const visible = new Set();
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      if (Math.hypot(dx, dy) > radius) continue;
      const tx = sx + dx, ty = sy + dy;
      if (tx < 0 || ty < 0 || tx >= CONFIG.mapWidth || ty >= CONFIG.mapHeight) continue;
      if (hasLineOfSight(sx, sy, tx, ty)) visible.add(getIndexFromCoords(tx, ty));
    }
  }
  return visible;
}

// Itens que emitem luz (lightRadius), tanto pintados no grid quanto soltos na
// camada de objetos — servem tanto para o brilho animado quanto como fonte de visão.
function getLightSources() {
  const sources = [];
  ['ground', 'walls'].forEach(layerName => {
    state.layers[layerName].forEach((id, idx) => {
      const tile = getTileConfig(id);
      if (tile && tile.lightRadius) {
        const { x, y } = getCoordsFromIndex(idx);
        sources.push({ x, y, radius: tile.lightRadius });
      }
    });
  });
  state.objects.forEach(obj => {
    if (obj.type === 'frame') return;
    const tile = getTileConfig(obj.tileId);
    if (tile && tile.lightRadius) {
      sources.push({
        x: Math.floor((obj.x + obj.w / 2) / CONFIG.tileSize),
        y: Math.floor((obj.y + obj.h / 2) / CONFIG.tileSize),
        radius: tile.lightRadius
      });
    }
  });
  return sources;
}

// Fichas com o atributo Visão definido (hoje só o template Personagem tem esse
// atributo, mas qualquer template que ganhar 'Visao' passa a enxergar também).
function getCharacterVisionSources() {
  const sources = [];
  state.objects.forEach(obj => {
    if (obj.type !== 'frame' || obj.attributes['Visao'] === undefined) return;
    const radius = parseInt(obj.attributes['Visao'], 10);
    if (!radius || radius <= 0) return;
    sources.push({
      x: Math.floor((obj.x + obj.w / 2) / CONFIG.tileSize),
      y: Math.floor((obj.y + obj.h / 2) / CONFIG.tileSize),
      radius
    });
  });
  return sources;
}

// Visão vinda só dos Personagens, sem fontes de luz — usada tanto pra decidir quais
// fontes de luz estão "acesas" (função abaixo) quanto como base do fog-of-war.
function computeCharacterVisibility() {
  const visible = new Set();
  getCharacterVisionSources().forEach(({ x, y, radius }) => {
    computeVisionFromSource(x, y, radius).forEach(idx => visible.add(idx));
  });
  return visible;
}

// Uma fonte de luz só ilumina se algum Personagem já enxerga a própria célula dela —
// uma Tocha numa sala fechada (porta fechada, sem janela) fica apagada até alguém
// conseguir ver até ela (abrir a porta, olhar por uma janela, entrar na sala).
function getActiveLightSources(charVisible) {
  return getLightSources().filter(({ x, y }) => charVisible.has(getIndexFromCoords(x, y)));
}

// ================= IDENTIFICAÇÃO DE SALAS =================
// Uma "sala" é uma área conectada (só 4 direções, sem diagonal) de células vazias
// da camada walls — qualquer tile não-vazio (parede, porta aberta ou fechada,
// janela, vidro) é sempre um limite, nunca faz parte do interior. É um flood-fill,
// a mesma técnica já usada no balde de pintura (floodFill, mais abaixo).
//
// Detecção automática em vez de exigir que o usuário marque a sala manualmente:
// mapas aqui são pequenos (até 64x48 = 3072 células), então recalcular isso do zero
// a cada frame do Modo Visualização é barato — não precisa de cache/invalidação.
//
// Salas maiores que ROOM_MAX_SIZE são descartadas (sinal de que "vazou" numa área
// externa não fechada, ex: um buraco na parede) — as células dela simplesmente não
// entram em nenhuma sala, e a visão delas continua só por raio+linha de visão, como
// era antes dessa função existir. Isso evita que um mapa mal fechado acabe revelando
// o mapa inteiro de uma vez só por causa de uma parede faltando.
const ROOM_MAX_SIZE = 400;

function computeRooms() {
  const total = CONFIG.mapWidth * CONFIG.mapHeight;
  const visited = new Uint8Array(total);
  const rooms = [];

  for (let start = 0; start < total; start++) {
    if (visited[start] || state.layers.walls[start] !== 0) continue;

    // BFS do componente conectado inteiro, sempre marcando tudo como visitado —
    // mesmo que a sala acabe descartada por estourar o tamanho máximo — pra uma
    // área externa gigante não ser escaneada de novo a partir de cada célula dela.
    const cells = [start];
    visited[start] = 1;
    for (let i = 0; i < cells.length; i++) {
      const { x, y } = getCoordsFromIndex(cells[i]);
      [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].forEach(([nx, ny]) => {
        const nIdx = getIndexFromCoords(nx, ny);
        if (nIdx === -1 || visited[nIdx] || state.layers.walls[nIdx] !== 0) return;
        visited[nIdx] = 1;
        cells.push(nIdx);
      });
    }

    if (cells.length <= ROOM_MAX_SIZE) rooms.push(cells);
  }

  return rooms;
}

// Progresso do fade (1 = escuro, 0 = revelada) por sala ocupada agora por algum
// Personagem — ver renderFogOfWar. Diferente da revelação por "espiada" de fora
// (removida): só dispara quando o personagem está DENTRO da sala, e clareia aos
// poucos em vez de aparecer de uma vez.
const ROOM_FADE_MS = 500;
const roomRevealStartTimes = new Map(); // chave: célula inicial do flood-fill da sala

function computeRoomFadeAlpha(rooms) {
  const charCells = new Set();
  getCharacterVisionSources().forEach(({ x, y }) => charCells.add(getIndexFromCoords(x, y)));

  const now = Date.now();
  const occupiedKeys = new Set();
  const alphaByIdx = new Map();

  rooms.forEach(cells => {
    if (!cells.some(idx => charCells.has(idx))) return;
    const key = cells[0]; // início do BFS = identidade estável da sala (paredes fixas)
    occupiedKeys.add(key);
    if (!roomRevealStartTimes.has(key)) roomRevealStartTimes.set(key, now);
    const progress = Math.min(1, (now - roomRevealStartTimes.get(key)) / ROOM_FADE_MS);
    cells.forEach(idx => alphaByIdx.set(idx, 1 - progress));
  });

  // Saiu da sala: esquece o horário — entrar de novo depois refaz o fade do zero,
  // igual ao resto da névoa, que não guarda memória de "já vi essa sala antes".
  [...roomRevealStartTimes.keys()].forEach(key => {
    if (!occupiedKeys.has(key)) roomRevealStartTimes.delete(key);
  });

  return alphaByIdx;
}

// Conjunto de índices (camada walls/ground) atualmente visíveis no Modo Visualização:
// união da visão de cada Personagem + cada fonte de luz ativa, célula a célula (raio
// + linha de visão, que já respeita janela/vidro e porta aberta) — sem revelar uma
// sala inteira só por espiar 1 célula dela de fora.
function computeVisibleFog(charVisible) {
  for (const idx of [...state.openDoors]) {
    if (state.layers.walls[idx] !== 23) state.openDoors.delete(idx);
  }

  const visible = new Set(charVisible);
  getActiveLightSources(charVisible).forEach(({ x, y, radius }) => {
    computeVisionFromSource(x, y, radius).forEach(idx => visible.add(idx));
  });
  return visible;
}

// ================= GERAÇÃO PROCEDURAL DE DUNGEON =================
function hashSeed(value) {
  let h = 0;
  const s = String(value);
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rectsOverlap(a, b, margin = 0) {
  return !(
    a.x + a.w + margin <= b.x ||
    b.x + b.w + margin <= a.x ||
    a.y + a.h + margin <= b.y ||
    b.y + b.h + margin <= a.y
  );
}

function generateDungeon(options) {
  if (!Room.canEditLayers()) return;
  const { roomCount, seed, floorRoomTileId, floorCorridorTileId } = options;
  const minSize = Math.min(options.minSize, options.maxSize);
  const maxSize = Math.max(options.minSize, options.maxSize);

  const rng = seed ? mulberry32(hashSeed(seed)) : Math.random;
  const randInt = (min, max) => Math.floor(rng() * (max - min + 1)) + min;

  saveHistory();
  state.layers.ground = new Array(CONFIG.mapWidth * CONFIG.mapHeight).fill(0);
  state.layers.walls = new Array(CONFIG.mapWidth * CONFIG.mapHeight).fill(0);
  state.openDoors.clear();

  // Posiciona salas por rejection sampling, com 1 tile de margem da borda do
  // mapa (para o wall-pass sempre ter uma célula vazia disponível ao redor)
  const rooms = [];
  const maxAttempts = roomCount * 20;
  for (let attempts = 0; rooms.length < roomCount && attempts < maxAttempts; attempts++) {
    const w = randInt(minSize, maxSize);
    const h = randInt(minSize, maxSize);
    const maxX = CONFIG.mapWidth - w - 1;
    const maxY = CONFIG.mapHeight - h - 1;
    if (maxX < 1 || maxY < 1) continue;
    const candidate = { x: randInt(1, maxX), y: randInt(1, maxY), w, h };
    if (!rooms.some(r => rectsOverlap(candidate, r, 1))) rooms.push(candidate);
  }

  if (rooms.length < roomCount) {
    toast(`Foi possível posicionar ${rooms.length} de ${roomCount} salas.`, 'warning');
  }

  const setFloor = (x, y, tileId) => {
    const idx = getIndexFromCoords(x, y);
    if (idx !== -1) state.layers.ground[idx] = tileId;
  };

  rooms.forEach(room => {
    for (let y = room.y; y < room.y + room.h; y++) {
      for (let x = room.x; x < room.x + room.w; x++) {
        setFloor(x, y, floorRoomTileId);
      }
    }
  });

  const roomCenter = room => ({
    x: Math.floor(room.x + room.w / 2),
    y: Math.floor(room.y + room.h / 2)
  });

  // Conecta cada sala à mais próxima já posicionada (greedy, não é MST ótima,
  // mas dá conectividade orgânica sem precisar de Delaunay/grafo completo)
  rooms.forEach((room, i) => {
    if (i === 0) return;
    let nearest = rooms[0];
    let nearestDist = Infinity;
    const to = roomCenter(room);
    for (let j = 0; j < i; j++) {
      const c2 = roomCenter(rooms[j]);
      const dist = Math.abs(to.x - c2.x) + Math.abs(to.y - c2.y);
      if (dist < nearestDist) { nearestDist = dist; nearest = rooms[j]; }
    }

    const from = roomCenter(nearest);
    const path = [];
    let cx = from.x, cy = from.y;
    while (cx !== to.x) { path.push({ x: cx, y: cy }); cx += cx < to.x ? 1 : -1; }
    while (cy !== to.y) { path.push({ x: cx, y: cy }); cy += cy < to.y ? 1 : -1; }
    path.push({ x: cx, y: cy });

    path.forEach(({ x, y }) => setFloor(x, y, floorCorridorTileId));

    // Marca Porta nos pontos onde o corredor cruza a borda de cada sala
    // (o caminho começa/termina no CENTRO das salas, não na entrada)
    const insideRect = (cell, rect) =>
      cell.x >= rect.x && cell.x < rect.x + rect.w && cell.y >= rect.y && cell.y < rect.y + rect.h;

    let exitIdx = 0;
    while (exitIdx + 1 < path.length && insideRect(path[exitIdx + 1], nearest)) exitIdx++;

    let entryIdx = path.length - 1;
    while (entryIdx - 1 >= 0 && insideRect(path[entryIdx - 1], room)) entryIdx--;

    [path[exitIdx], path[entryIdx]].forEach(({ x, y }) => {
      const idx = getIndexFromCoords(x, y);
      if (idx !== -1) state.layers.walls[idx] = 23;
    });
  });

  // Wall-pass: qualquer vizinho ortogonal vazio de uma célula de piso vira Parede
  const neighbors = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let y = 0; y < CONFIG.mapHeight; y++) {
    for (let x = 0; x < CONFIG.mapWidth; x++) {
      if (state.layers.ground[getIndexFromCoords(x, y)] === 0) continue;
      neighbors.forEach(([dx, dy]) => {
        const nIdx = getIndexFromCoords(x + dx, y + dy);
        if (nIdx !== -1 && state.layers.ground[nIdx] === 0) {
          state.layers.walls[nIdx] = 20;
        }
      });
    }
  }

  render();
  Room.syncLayers();
  Room.syncDoorsReset();
}

// ================= SIDEBAR REDIMENSIONÁVEL =================
// side 'left'  -> sidebar esquerda, alça na borda direita (arrastar p/ direita cresce).
// side 'right' -> sidebar direita, alça na borda esquerda (arrastar p/ esquerda cresce).
// A largura em si nunca é setada inline (sidebar.style.width) — só a variável CSS —
// pra não competir em especificidade com a largura fixa do modo compacto
// (.sidebar-right.compact, que tem 2 classes e por isso já vence a var sozinha).
function makeSidebarResizable(sidebar, { side, varName, minVar, maxVar, minDefault, maxDefault, storageKey }) {
  if (!sidebar) return;
  const handle = document.createElement('div');
  handle.className = 'sidebar-resize-handle' + (side === 'right' ? ' sidebar-resize-handle-left' : '');
  sidebar.appendChild(handle);

  const dir = side === 'left' ? 1 : -1;
  let isResizing = false, startX, startWidth;

  const clampWidth = (w) => Math.min(Math.max(w,
    parseInt(getComputedStyle(document.documentElement).getPropertyValue(minVar)) || minDefault),
    parseInt(getComputedStyle(document.documentElement).getPropertyValue(maxVar)) || maxDefault);

  const onMouseMove = (e) => {
    if (!isResizing) return;
    const newWidth = clampWidth(startWidth + dir * (e.clientX - startX));
    document.documentElement.style.setProperty(varName, newWidth + 'px');
  };

  const onMouseUp = () => {
    if (!isResizing) return;
    isResizing = false;
    handle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    localStorage.setItem(storageKey, getComputedStyle(document.documentElement).getPropertyValue(varName).trim());
  };

  handle.addEventListener('mousedown', (e) => {
    if (sidebar.classList.contains('compact') || sidebar.classList.contains('collapsed')) return; // largura fixa no modo compacto/recolhido
    isResizing = true;
    handle.classList.add('dragging');
    startX = e.clientX;
    startWidth = sidebar.offsetWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
  });

  const saved = localStorage.getItem(storageKey);
  if (saved) document.documentElement.style.setProperty(varName, saved);
}

function initSidebarResize() {
  makeSidebarResizable(document.getElementById('leftSidebar'), {
    side: 'left',
    varName: '--sidebar-width',
    minVar: '--sidebar-min',
    maxVar: '--sidebar-max',
    minDefault: 200,
    maxDefault: 450,
    storageKey: 'rpgEditor_sidebarWidth'
  });
  makeSidebarResizable(document.getElementById('rightSidebar'), {
    side: 'right',
    varName: '--sidebar-right-width',
    minVar: '--sidebar-right-min',
    maxVar: '--sidebar-right-max',
    minDefault: 160,
    maxDefault: 400,
    storageKey: 'rpgEditor_rightSidebarWidth'
  });
  makeSidebarResizable(document.getElementById('chatSidebar'), {
    side: 'left',
    varName: '--chat-sidebar-width',
    minVar: '--chat-sidebar-min',
    maxVar: '--chat-sidebar-max',
    minDefault: 220,
    maxDefault: 420,
    storageKey: 'rpgEditor_chatSidebarWidth'
  });
}

// ================= PAINÉIS EXPANSÍVEIS (ABAS DA SIDEBAR) =================
function initExpandablePanels() {
  let collapsedPanels = [];
  try {
    collapsedPanels = JSON.parse(localStorage.getItem('rpgEditor_collapsedPanels')) || [];
  } catch { collapsedPanels = []; }

  document.querySelectorAll('.panel[data-panel]').forEach(panel => {
    const panelId = panel.dataset.panel;
    const header = panel.querySelector(':scope > .panel-header');
    if (!header) return;
    // Sidebar do chat só tem esse painel dentro — quando ele recolhe, a
    // própria sidebar encolhe pra uma tira estreita (ver CSS .chat-sidebar.collapsed).
    const ownerSidebar = panel.closest('.chat-sidebar');

    if (collapsedPanels.includes(panelId)) {
      panel.classList.add('collapsed');
      if (ownerSidebar) ownerSidebar.classList.add('collapsed');
    }

    header.addEventListener('click', () => {
      panel.classList.toggle('collapsed');
      if (ownerSidebar) ownerSidebar.classList.toggle('collapsed', panel.classList.contains('collapsed'));
      const stored = new Set(JSON.parse(localStorage.getItem('rpgEditor_collapsedPanels') || '[]'));
      if (panel.classList.contains('collapsed')) stored.add(panelId);
      else stored.delete(panelId);
      localStorage.setItem('rpgEditor_collapsedPanels', JSON.stringify([...stored]));
    });
  });
}

// ================= MODO COMPACTO (SIDEBAR DIREITA) =================
// Alterna os botões de Ferramentas/Camadas entre rótulo completo e só ícone+tecla.
function initCompactToolsToggle() {
  const sidebar = document.getElementById('rightSidebar');
  const btn = document.getElementById('toggleCompactToolsBtn');
  const icon = document.getElementById('compactToggleIcon');
  if (!sidebar || !btn) return;

  // › (aponta pro lado que a sidebar vai encolher, empurrando a borda pra direita)
  // quando expandida; ‹ (aponta pro lado que ela vai crescer, puxando a borda pra
  // esquerda, de volta sobre o canvas) quando já está compacta.
  const applyState = (compact) => {
    sidebar.classList.toggle('compact', compact);
    btn.classList.toggle('active', compact);
    if (icon) icon.textContent = compact ? '‹' : '›';
    btn.title = compact ? 'Expandir ferramentas' : 'Compactar ferramentas (só ícones)';
  };

  applyState(localStorage.getItem('rpgEditor_compactTools') === '1');

  btn.addEventListener('click', () => {
    const compact = !sidebar.classList.contains('compact');
    applyState(compact);
    localStorage.setItem('rpgEditor_compactTools', compact ? '1' : '0');
  });
}

// ================= LAYOUT MOBILE (HAMBÚRGUER + SIDEBARS EM OVERLAY) =================
// Abaixo de MOBILE_BREAKPOINT, as 3 sidebars somadas não cabem na tela (era o que
// causava o mapa ficar inacessível no layout empilhado antigo) — então elas ficam
// ocultas por padrão e só aparecem como overlay em tela cheia, uma de cada vez,
// acionadas pela barra de ícones; a toolbar do cabeçalho vira um dropdown por trás
// do botão ☰. Ver CSS "RESPONSIVO (MOBILE)" em style.css.
function initMobileLayout() {
  const MOBILE_BREAKPOINT = 900;
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const toolbar = document.querySelector('.toolbar');
  const menuBtn = document.getElementById('mobileMenuToggle');
  const toggleBar = document.getElementById('mobileSidebarToggles');
  const asides = {
    chatSidebar: document.getElementById('chatSidebar'),
    leftSidebar: document.getElementById('leftSidebar'),
    rightSidebar: document.getElementById('rightSidebar')
  };
  if (!toolbar || !menuBtn || !toggleBar) return;

  function closeAllOverlays() {
    toolbar.classList.remove('mobile-open');
    menuBtn.classList.remove('mobile-open');
    Object.values(asides).forEach(a => a && a.classList.remove('mobile-open'));
    toggleBar.querySelectorAll('button.active').forEach(b => b.classList.remove('active'));
  }

  function applyMode(isMobile) {
    document.body.classList.toggle('mobile-layout', isMobile);
    if (!isMobile) closeAllOverlays(); // volta de mobile pra desktop não deixa nada "preso" em tela cheia
  }
  applyMode(mql.matches);
  mql.addEventListener('change', e => applyMode(e.matches));

  menuBtn.addEventListener('click', () => {
    const opening = !toolbar.classList.contains('mobile-open');
    closeAllOverlays();
    if (opening) {
      toolbar.classList.add('mobile-open');
      menuBtn.classList.add('mobile-open');
    }
  });

  toggleBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-mobile-target]');
    if (!btn) return;
    const aside = asides[btn.dataset.mobileTarget];
    if (!aside) return;
    const opening = !aside.classList.contains('mobile-open');
    closeAllOverlays();
    if (!opening) return; // já estava aberta -> o toque fechou, só isso

    // Chat recolhido (tira de 30px, ver .chat-sidebar.collapsed) precisa reabrir o
    // painel antes, senão o overlay mostraria só a tira em vez do chat inteiro.
    if (btn.dataset.mobileTarget === 'chatSidebar') {
      const panel = aside.querySelector('.panel[data-panel="chat"]');
      if (panel && panel.classList.contains('collapsed')) {
        panel.querySelector(':scope > .panel-header')?.click();
      }
    }

    aside.classList.add('mobile-open');
    btn.classList.add('active');
  });
}

// ================= TILESETS EXPANSÍVEIS =================
function initTileset() {
  const container = document.getElementById('tilesetContainer');
  container.innerHTML = '';
  
  for (const [catName, tiles] of Object.entries(CONFIG.tileCategories)) {
    const isCollapsed = state.collapsedCategories.has(catName);
    
    const section = document.createElement('div');
    section.className = 'tile-category';
    
    const header = document.createElement('div');
    header.className = `tile-category-header ${isCollapsed ? 'collapsed' : ''}`;
    header.innerHTML = `<h4>${catName}</h4><span class="arrow">▼</span>`;
    
    const content = document.createElement('div');
    content.className = `tile-category-content ${isCollapsed ? 'collapsed' : ''}`;
    
    const grid = document.createElement('div');
    grid.className = 'tileset';
    
    tiles.forEach(tile => {
      if (tile.id === 0 && catName !== '🌿 Terreno') return;
      const div = document.createElement('div');
      div.className = `tile ${tile.emoji ? 'emoji' : ''} ${tile.texture || ''}`;
      div.style.background = tile.color;
      div.dataset.id = tile.id;
      if (tile.emoji) div.textContent = tile.emoji;
      else {
        const lbl = document.createElement('span');
        lbl.textContent = tile.name;
        div.appendChild(lbl);
      }
      if (tile.id === state.currentTileId) div.classList.add('active');
      div.tabIndex = 0;
      div.setAttribute('role', 'button');
      div.setAttribute('aria-label', tile.name);
      div.addEventListener('click', () => selectTile(tile.id, div));
      div.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectTile(tile.id, div);
        }
      });
      grid.appendChild(div);
    });
    
    content.appendChild(grid);
    
    header.addEventListener('click', () => {
      if (state.collapsedCategories.has(catName)) state.collapsedCategories.delete(catName);
      else state.collapsedCategories.add(catName);
      header.classList.toggle('collapsed');
      content.classList.toggle('collapsed');
    });
    
    section.appendChild(header);
    section.appendChild(content);
    container.appendChild(section);
  }
}

function selectTile(id, el) {
  state.currentTileId = id;
  document.querySelectorAll('.tile').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ================= CONTROLES DE UI =================
function initTools() {
  document.querySelectorAll('.tool').forEach(btn => {
    btn.onclick = () => setTool(btn.dataset.tool, btn);
  });
  
  document.querySelectorAll('.layer').forEach(btn => {
    btn.onclick = (e) => {
      // Se clicou no ícone de olho, toggle visibilidade
      if (e.target.classList.contains('eye') || e.target.parentElement.classList.contains('eye')) {
        toggleLayerVisibility(btn.dataset.layer, btn);
      } else {
        // Senão, seleciona a camada
        setLayer(btn.dataset.layer, btn);
      }
    };
  });
}

function setTool(tool, btn) {
  if (tool !== 'move') state.selectedObjectIds.clear();
  state.currentTool = tool;
  document.querySelectorAll('.tool').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function setLayer(layer, btn) {
  if (layer !== 'objects') state.selectedObjectIds.clear();
  state.currentLayer = layer;
  document.querySelectorAll('.layer').forEach(b => {
    b.classList.remove('active');
    if (!state.layerVisibility[b.dataset.layer]) b.classList.add('hidden');
  });
  btn.classList.add('active');
  btn.classList.remove('hidden');
  render();
}

function toggleLayerVisibility(layer, btn) {
  state.layerVisibility[layer] = !state.layerVisibility[layer];
  btn.classList.toggle('hidden', !state.layerVisibility[layer]);
  render();
}

function initButtons() {
  const tb = document.querySelector('.toolbar');
  const viewModeBtn = document.createElement('button');
  viewModeBtn.id = 'viewModeBtn';
  viewModeBtn.innerHTML = '▶️ Visualizar';
  viewModeBtn.onclick = () => viewMode.toggle();
  tb.appendChild(viewModeBtn);
  document.getElementById('exportJsonBtn').onclick = exportMapJSON;
  document.getElementById('importJsonBtn').onclick = () => document.getElementById('importJsonInput').click();
  document.getElementById('importJsonInput').onchange = importMapJSON;
  document.getElementById('exportPngBtn').onclick = exportAsPNG;
  document.getElementById('importPngBtn').onclick = showPngImportModal;
  document.getElementById('zoomInBtn').onclick = () => zoom(1.1);
  document.getElementById('zoomOutBtn').onclick = () => zoom(0.9);
  document.getElementById('zoomResetBtn').onclick = resetZoom;
  document.getElementById('resizeMapBtn').onclick = resizeMapFromInputs;
  document.getElementById('undoBtn').onclick = undo;

  document.getElementById('metersPerTileInput').onchange = (e) => {
    const value = parseFloat(e.target.value);
    state.metersPerTile = Number.isFinite(value) && value > 0 ? value : state.metersPerTile;
    e.target.value = state.metersPerTile;
  };
}

function initCombatPanel() {
  document.getElementById('combatStartBtn').onclick = () => combatSystem.start();
  document.getElementById('combatNextBtn').onclick = () => combatSystem.nextTurn();
  document.getElementById('combatEndBtn').onclick = () => combatSystem.end();
  renderCombatPanel();
}

function initGeneratorPanel() {
  const roomFloorSelect = document.getElementById('genRoomFloorSelect');
  const corridorFloorSelect = document.getElementById('genCorridorFloorSelect');
  const terrainOptions = CONFIG.tileCategories['🌿 Terreno']
    .filter(t => t.id !== 0)
    .map(t => `<option value="${t.id}">${t.name}</option>`)
    .join('');
  roomFloorSelect.innerHTML = terrainOptions;
  corridorFloorSelect.innerHTML = terrainOptions;
  roomFloorSelect.value = 3; // Pedra
  corridorFloorSelect.value = 2; // Terra

  document.getElementById('generateDungeonBtn').onclick = async () => {
    const proceed = await confirmDialog(
      'Gerar uma dungeon substitui as camadas Chão e Paredes do mapa atual (Objetos não são alterados). Continuar?',
      { confirmLabel: 'Gerar', danger: true }
    );
    if (!proceed) return;

    generateDungeon({
      roomCount: parseInt(document.getElementById('genRoomCountInput').value, 10) || 8,
      minSize: parseInt(document.getElementById('genMinSizeInput').value, 10) || 3,
      maxSize: parseInt(document.getElementById('genMaxSizeInput').value, 10) || 7,
      seed: document.getElementById('genSeedInput').value.trim(),
      floorRoomTileId: parseInt(roomFloorSelect.value, 10),
      floorCorridorTileId: parseInt(corridorFloorSelect.value, 10)
    });
  };
}

function initShortcuts() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    
    const keyMap = {
      'b': ['brush', '.tool[data-tool="brush"]'],
      'f': ['bucket', '.tool[data-tool="bucket"]'],
      'e': ['eraser', '.tool[data-tool="eraser"]'],
      'm': ['move', '.tool[data-tool="move"]'],
      'l': ['line', '.tool[data-tool="line"]'],
      'g': ['rect', '.tool[data-tool="rect"]'],
      'r': ['ruler', '.tool[data-tool="ruler"]'],
      'a': ['aoe', '.tool[data-tool="aoe"]'],
      '1': ['ground', '.layer[data-layer="ground"]'],
      '2': ['walls', '.layer[data-layer="walls"]'],
      '3': ['objects', '.layer[data-layer="objects"]']
    };
    
    if (keyMap[e.key.toLowerCase()]) {
      const [val, selector] = keyMap[e.key.toLowerCase()];
      const btn = document.querySelector(selector);
      if (e.key === '1' || e.key === '2' || e.key === '3') setLayer(val, btn);
      else setTool(val, btn);
    }
    if (e.key.toLowerCase() === 'v') {
      e.preventDefault();
      viewMode.toggle();
    }

    if (e.key.toLowerCase() === 'n') {
      combatSystem.nextTurn();
    }

    if (e.key.toLowerCase() === 'c') {
      e.preventDefault();
      document.getElementById('combatPanel')?.classList.toggle('hidden-panel');
    }

    if (e.key === 'Escape' && state.currentTool === 'aoe') {
      state.aoeCenter = null;
      state.aoeEdge = null;
      state.isDrawingAoE = false;
      if (viewMode.active) {
        state.currentTool = 'select';
      } else {
        setTool('brush', document.querySelector('.tool[data-tool="brush"]'));
      }
      render();
    }

    if (e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); }
    if (e.ctrlKey && (e.key === '+' || e.key === '=')) { e.preventDefault(); zoom(1.1); }
    if (e.ctrlKey && e.key === '-') { e.preventDefault(); zoom(0.9); }
    if (e.key.toLowerCase() === '0' && e.ctrlKey) { e.preventDefault(); resetZoom(); }
  });
  
  canvas.addEventListener('wheel', e => {
    if (e.ctrlKey) {
      e.preventDefault();
      zoom(e.deltaY > 0 ? 0.9 : 1.1);
    }
  }, { passive: false });
}

function zoom(factor) {
  state.camera.zoom = Math.min(Math.max(state.camera.zoom * factor, 0.3), 5);
  applyCanvasZoom();
}

function resetZoom() {
  state.camera.zoom = 1;
  applyCanvasZoom();
}

// Redimensiona a caixa CSS do canvas (em vez de usar transform: scale, que só
// afeta a pintura e não o layout — o wrapper continuava reservando o espaço
// do canvas em tamanho real, deixando o mapa "flutuando" no canto ao dar
// zoom out em vez de encolher junto com o visualizador).
function applyCanvasZoom() {
  canvas.style.width = `${canvas.width * state.camera.zoom}px`;
  canvas.style.height = `${canvas.height * state.camera.zoom}px`;
}

function resizeMapFromInputs() {
  const widthInput = document.getElementById('mapWidthInput');
  const heightInput = document.getElementById('mapHeightInput');
  const newWidth = parseInt(widthInput.value, 10);
  const newHeight = parseInt(heightInput.value, 10);
  if (Number.isNaN(newWidth) || Number.isNaN(newHeight) || newWidth < 8 || newHeight < 8) {
    toast('Informe um tamanho válido (mínimo 8x8).', 'error');
    return;
  }
  if (newWidth === CONFIG.mapWidth && newHeight === CONFIG.mapHeight) return;
  resizeMap(newWidth, newHeight);
}

function resizeMap(newWidth, newHeight) {
  if (!Room.canEditLayers()) return;
  saveHistory();
  const oldWidth = CONFIG.mapWidth;
  const oldHeight = CONFIG.mapHeight;
  const oldLayers = JSON.parse(JSON.stringify(state.layers));

  CONFIG.mapWidth = newWidth;
  CONFIG.mapHeight = newHeight;
  canvas.width = CONFIG.mapWidth * CONFIG.tileSize;
  canvas.height = CONFIG.mapHeight * CONFIG.tileSize;
  applyCanvasZoom();

  state.layers.ground = new Array(CONFIG.mapWidth * CONFIG.mapHeight).fill(0);
  state.layers.walls = new Array(CONFIG.mapWidth * CONFIG.mapHeight).fill(0);
  state.openDoors.clear();

  for (let y = 0; y < Math.min(oldHeight, CONFIG.mapHeight); y++) {
    for (let x = 0; x < Math.min(oldWidth, CONFIG.mapWidth); x++) {
      const oldIndex = y * oldWidth + x;
      const newIndex = y * CONFIG.mapWidth + x;
      state.layers.ground[newIndex] = oldLayers.ground[oldIndex] || 0;
      state.layers.walls[newIndex] = oldLayers.walls[oldIndex] || 0;
    }
  }

  const objectsBefore = state.objects.map(o => ({ id: o.id, x: o.x, y: o.y }));
  state.objects.forEach(obj => {
    obj.x = Math.max(0, Math.min(obj.x, canvas.width - obj.w));
    obj.y = Math.max(0, Math.min(obj.y, canvas.height - obj.h));
  });
  combatSystem.pruneInvalid();
  updateMapSizeInputs();
  render();
  Room.syncLayers();
  Room.syncObjectsClampDiff(objectsBefore, state.objects);
  Room.syncDoorsReset();
}

function updateMapSizeInputs() {
  const widthInput = document.getElementById('mapWidthInput');
  const heightInput = document.getElementById('mapHeightInput');
  if (widthInput) widthInput.value = CONFIG.mapWidth;
  if (heightInput) heightInput.value = CONFIG.mapHeight;
}

// ================= SISTEMA DE PINCEL E BALDE (CORRIGIDO) =================
function initCanvasEvents() {
  canvas.oncontextmenu = (e) => e.preventDefault();
  // Remove listeners antigos se existirem (evita duplicação)
  canvas.removeEventListener('pointerdown', handlePointerDown);
  canvas.removeEventListener('pointermove', handlePointerMove);
  canvas.removeEventListener('pointerup', handlePointerUp);
  canvas.removeEventListener('pointercancel', handlePointerCancel);
  canvas.removeEventListener('dblclick', handleDblClick);

  // Termina um arraste de objeto em andamento e sincroniza a posição final com a
  // sala (extraído pra ser reaproveitado tanto no soltar normal quanto na limpeza
  // de segurança de pointerup/pointercancel abaixo).
  function finishDragging() {
    const draggedObj = state.draggedObjectIndex !== null ? state.objects[state.draggedObjectIndex] : null;
    state.isDragging = false;
    state.draggedObjectIndex = null;

    if (draggedObj && state.dragGroupStart && state.dragGroupStart.length > 1) {
      const moves = state.dragGroupStart
        .map(({ id }) => state.objects.find(o => o.id === id))
        .filter(Boolean)
        .map(o => ({ id: o.id, x: o.x, y: o.y }));
      Room.syncObjectsMove(moves);
    } else if (draggedObj) {
      Room.syncObjectMove(draggedObj.id, draggedObj.x, draggedObj.y);
    }
    state.dragGroupStart = null;
  }

  function handlePointerDown(e) {
    e.preventDefault();
    // Garante que mousemove/mouseup continuem chegando no canvas mesmo se o dedo/
    // cursor sair da área dele durante o arraste (essencial pra toque, já que não
    // existe um "window-level pointermove" equivalente ao antigo fallback de mouse).
    canvas.setPointerCapture(e.pointerId);
    const pos = getMousePos(e);

    // Botão direito: limpa a prévia de Área de Efeito (com a ferramenta ativa, ou se
    // já houver uma prévia desenhada, em qualquer modo)
    if (e.button === 2 && (state.currentTool === 'aoe' || state.aoeCenter)) {
      state.aoeCenter = null;
      state.aoeEdge = null;
      render();
      return;
    }

    if (e.button === 1) {
      state.camera.isPanning = true;
      state.camera.start = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
      return;
    }

    // Ferramenta de Área de Efeito: funciona tanto no editor quanto no Modo
    // Visualização (checada antes do bloco de viewMode de propósito)
    if (state.currentTool === 'aoe' && e.button === 0) {
      state.isDrawingAoE = true;
      state.aoeCenter = pos;
      state.aoeEdge = pos;
      render();
      return;
    }

    if (viewMode?.active) {
      if (e.button === 0) {
        if (viewMode.toggleDoorAt(pos.x, pos.y)) return;
        if (viewMode.selectObject(pos.x, pos.y)) {
          // Só Molduras (fichas) podem ser arrastadas em Modo Visualização — objetos
          // soltos de decoração continuam só clicáveis, sem risco de mexer no cenário.
          const obj = state.objects[viewMode.selectedObject];
          if (obj.type === 'frame' && Room.canMoveObject(obj)) {
            saveHistory();
            state.isDragging = true;
            state.draggedObjectIndex = viewMode.selectedObject;
            state.dragOffset = { x: pos.x - obj.x, y: pos.y - obj.y };
          }
        } else {
          viewMode.startPan(e.clientX, e.clientY);
        }
      }
      return;
    }

    if (state.currentLayer === 'objects' && state.currentTool === 'move') {
      const objIndex = getObjectAtPosition(pos.x, pos.y);
      if (objIndex !== -1) {
        const obj = state.objects[objIndex];
        if (!Room.canMoveObject(obj)) return;

        // Shift-click: só alterna a seleção, sem iniciar arraste.
        if (e.shiftKey) {
          if (state.selectedObjectIds.has(obj.id)) state.selectedObjectIds.delete(obj.id);
          else state.selectedObjectIds.add(obj.id);
          render();
          return;
        }

        // Clique normal fora de uma seleção existente: troca a seleção pra só este objeto.
        if (!state.selectedObjectIds.has(obj.id)) {
          state.selectedObjectIds = new Set([obj.id]);
        }

        saveHistory();
        state.isDragging = true;
        state.draggedObjectIndex = objIndex;
        state.dragOffset = { x: pos.x - obj.x, y: pos.y - obj.y };
        state.dragGroupStart = [...state.selectedObjectIds]
          .map(id => state.objects.find(o => o.id === id))
          .filter(Boolean)
          .map(o => ({ id: o.id, x: o.x, y: o.y }));
      } else {
        // Clique em área vazia: começa uma seleção em retângulo (marquee). Sem Shift,
        // zera a seleção atual primeiro.
        if (!e.shiftKey) state.selectedObjectIds.clear();
        state.isMarqueeSelecting = true;
        state.marqueeStart = pos;
        state.marqueeEnd = pos;
        render();
      }
      return;
    }

    if (state.currentTool === 'ruler') {
      state.isMeasuring = true;
      state.rulerStart = pos;
      state.rulerEnd = pos;
      render();
      return;
    }

    if (state.currentTool === 'line' || state.currentTool === 'rect') {
      if (state.currentLayer === 'objects') return; // não se aplica à camada de objetos livres
      const gridX = Math.floor(pos.x / CONFIG.tileSize);
      const gridY = Math.floor(pos.y / CONFIG.tileSize);
      saveHistory();
      state.isDrawingShape = true;
      state.shapeStart = { x: gridX, y: gridY };
      state.shapeEnd = { x: gridX, y: gridY };
      render();
      return;
    }

    state.isDrawing = true;
    saveHistory();
    paint(e);
  }

  function handlePointerMove(e) {
    if (viewMode?.active && !viewMode.isPanning && !state.isDrawingAoE && !state.isDragging) {
      const hoverPos = getMousePos(e);
      viewMode.updateHover(hoverPos.x, hoverPos.y);
    }

    if (state.camera.isPanning) {
      const dx = e.clientX - state.camera.start.x;
      const dy = e.clientY - state.camera.start.y;
      state.camera.offset.x += dx;
      state.camera.offset.y += dy;
      state.camera.start = { x: e.clientX, y: e.clientY };
      render();
      return;
    }
    if (state.isDrawingAoE) {
      state.aoeEdge = getMousePos(e);
      render();
      return;
    }
    if (viewMode?.isPanning) {
      viewMode.doPan(e.clientX, e.clientY);
      return;
    }
    if (state.isMarqueeSelecting) {
      state.marqueeEnd = getMousePos(e);
      render();
      return;
    }
    if (state.isDragging && (state.currentTool === 'move' || viewMode.active) && state.draggedObjectIndex !== null) {
      e.preventDefault();
      moveDraggedObject(e);
      return;
    }
    if (state.isMeasuring) {
      state.rulerEnd = getMousePos(e);
      render();
      return;
    }
    if (state.isDrawingShape) {
      const pos = getMousePos(e);
      state.shapeEnd = {
        x: Math.floor(pos.x / CONFIG.tileSize),
        y: Math.floor(pos.y / CONFIG.tileSize)
      };
      render();
      return;
    }
    if (!state.isDrawing) return;
    e.preventDefault();
    paint(e);
  }

  function handlePointerUp(e) {
    if (canvas.hasPointerCapture?.(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    if (state.camera.isPanning) {
      state.camera.isPanning = false;
      canvas.style.cursor = 'crosshair';
      return;
    }
    if (state.isDrawingAoE) {
      state.isDrawingAoE = false;
      return;
    }
    if (viewMode?.isPanning) {
      viewMode.endPan();
      return;
    }
    if (state.isMarqueeSelecting) {
      const rx1 = Math.min(state.marqueeStart.x, state.marqueeEnd.x);
      const ry1 = Math.min(state.marqueeStart.y, state.marqueeEnd.y);
      const rx2 = Math.max(state.marqueeStart.x, state.marqueeEnd.x);
      const ry2 = Math.max(state.marqueeStart.y, state.marqueeEnd.y);

      // Marquee minúsculo (praticamente um clique parado em área vazia): não conta
      // como seleção, só desmarca (comportamento já aplicado no mousedown).
      if (rx2 - rx1 > 3 || ry2 - ry1 > 3) {
        state.objects.forEach(obj => {
          if (!Room.canMoveObject(obj)) return;
          const intersects = obj.x < rx2 && obj.x + obj.w > rx1 && obj.y < ry2 && obj.y + obj.h > ry1;
          if (intersects) state.selectedObjectIds.add(obj.id);
        });
      }

      state.isMarqueeSelecting = false;
      state.marqueeStart = null;
      state.marqueeEnd = null;
      render();
      return;
    }
    if (state.isDragging) {
      finishDragging();
      render(); // valores (nome/HP/tooltip) voltam a aparecer assim que solta
      return;
    }
    if (state.isMeasuring) {
      state.isMeasuring = false;
      state.rulerStart = null;
      state.rulerEnd = null;
      render();
      return;
    }
    if (state.isDrawingShape) {
      applyShapeCells(getShapeCells());
      state.isDrawingShape = false;
      state.shapeStart = null;
      state.shapeEnd = null;
      render();
      return;
    }
    state.isDrawing = false;
  }

  function handleDblClick(e) {
    // Duplo clique em moldura abre editor
    const pos = getMousePos(e);
    const frame = getFrameAtPosition(pos.x, pos.y);
    if (!frame) return;

    if (Room.active && Room.role === 'player') {
      // Jogador só abre a versão restrita do editor, e só na própria Moldura com a
      // permissão de editar atributos concedida — do contrário o clique não faz nada
      // (a seleção com tooltip de um clique já cobre a visualização somente-leitura).
      if (Room.isOwner(frame) && Room.permissions.editOwnAttributes) {
        openFrameEditor(frame, { restricted: true });
      }
      return;
    }

    openFrameEditor(frame);
  }

  // Limpeza de segurança compartilhada entre o pointerup no nível de window (botão/
  // dedo solto fora do canvas) e pointercancel (toque interrompido pelo SO/navegador
  // antes de disparar pointerup — não tinha equivalente no mouse, então isDragging
  // nunca era resetado aqui antes: um arraste de objeto solto fora do canvas podia
  // ficar "preso"; corrigido incluindo o finishDragging() abaixo).
  function handlePointerSafetyCleanup() {
    if (state.isDrawing) state.isDrawing = false;
    if (state.isDrawingAoE) state.isDrawingAoE = false;
    if (state.isMarqueeSelecting) {
      state.isMarqueeSelecting = false;
      state.marqueeStart = null;
      state.marqueeEnd = null;
      render();
    }
    if (state.isMeasuring) {
      state.isMeasuring = false;
      state.rulerStart = null;
      state.rulerEnd = null;
      render();
    }
    if (state.isDrawingShape) {
      state.isDrawingShape = false;
      state.shapeStart = null;
      state.shapeEnd = null;
      render();
    }
    if (state.isDragging) {
      finishDragging();
      render();
    }
  }

  function handlePointerCancel(e) {
    if (canvas.hasPointerCapture?.(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    handlePointerSafetyCleanup();
  }

  canvas.addEventListener('pointerdown', handlePointerDown);
  canvas.addEventListener('pointermove', handlePointerMove);
  canvas.addEventListener('pointerup', handlePointerUp);
  canvas.addEventListener('pointercancel', handlePointerCancel);
  canvas.addEventListener('dblclick', handleDblClick);

  window.addEventListener('pointerup', handlePointerSafetyCleanup);
  canvas.addEventListener('pointerleave', () => {
    state.isDrawing = false;
  });
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX - state.camera.offset.x,
    y: (e.clientY - rect.top) * scaleY - state.camera.offset.y
  };
}

function paint(e) {
  if (viewMode?.active) return; // Ignora se estiver em modo visualização

  const pos = getMousePos(e);
  const gridX = Math.floor(pos.x / CONFIG.tileSize);
  const gridY = Math.floor(pos.y / CONFIG.tileSize);

  // Limites do mapa
  if (gridX < 0 || gridX >= CONFIG.mapWidth || gridY < 0 || gridY >= CONFIG.mapHeight) return;

  // === BALDE (flood fill) ===
  if (state.currentTool === 'bucket') {
    floodFill(gridX, gridY);
    state.isDrawing = false; // Pinta apenas uma vez por clique
    return;
  }

  if (state.currentLayer === 'objects') {
    const objIndex = getObjectAtPosition(pos.x, pos.y);
    if (state.currentTool === 'eraser' && objIndex !== -1) {
      if (!Room.canDeleteObject(state.objects[objIndex])) return;
      const removed = state.objects.splice(objIndex, 1)[0];
      Room.syncObjectRemove(removed.id);
      render();
    } else if (state.currentTool !== 'move') {
      if (state.currentTool !== 'eraser' && objIndex === -1) {
        if (!Room.canAddObject()) return;
        if (state.currentTileId === 1000) {
          openFrameCreationModal(pos.x, pos.y);
          return;
        }

        const newObj = {
          id: generateObjectId('obj'),
          tileId: state.currentTileId, x: pos.x, y: pos.y,
          w: CONFIG.tileSize, h: CONFIG.tileSize
        };
        state.objects.push(newObj);
        Room.syncObjectAdd(newObj);
        render();
      }
    }
    return;
  }

  // Grid-based (Ground / Walls) — pincel / borracha
  if (!Room.canEditLayers()) return;
  const index = gridY * CONFIG.mapWidth + gridX;
  const newValue = state.currentTool === 'eraser' ? 0 : state.currentTileId;

  if (state.layers[state.currentLayer][index] !== newValue) {
    state.layers[state.currentLayer][index] = newValue;
    render();
    Room.syncLayers();
  }
}

// ================= ALGORITMO FLOOD FILL (BALDE) =================
function floodFill(startX, startY) {
  if (state.currentLayer === 'objects') return; // Balde não funciona em objetos livres
  if (!Room.canEditLayers()) return;

  const targetIndex = getIndexFromCoords(startX, startY);
  if (targetIndex === -1) return;
  
  const targetId = state.layers[state.currentLayer][targetIndex];
  const replacementId = state.currentTileId;
  
  if (targetId === replacementId) return;
  
  const queue = [];
  const visited = new Set();
  
  queue.push({ x: startX, y: startY });
  visited.add(`${startX},${startY}`);
  
  while (queue.length > 0) {
    const { x, y } = queue.shift();
    const index = getIndexFromCoords(x, y);
    
    if (index === -1) continue;
    if (state.layers[state.currentLayer][index] !== targetId) continue;
    
    state.layers[state.currentLayer][index] = replacementId;
    
    // Verifica 4 direções (cima, baixo, esquerda, direita)
    const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      const key = `${nx},${ny}`;
      
      if (!visited.has(key) && 
          nx >= 0 && nx < CONFIG.mapWidth && 
          ny >= 0 && ny < CONFIG.mapHeight) {
        visited.add(key);
        queue.push({ x: nx, y: ny });
      }
    }
  }

  render();
  Room.syncLayers();
}

// ================= OBJETOS LIVRES =================
function getObjectAtPosition(x, y) {
  for (let i = state.objects.length - 1; i >= 0; i--) {
    const obj = state.objects[i];
    if (x >= obj.x && x < obj.x + obj.w &&
        y >= obj.y && y < obj.y + obj.h) {
      return i;
    }
  }
  return -1;
}

// Varre de `current` até `target` num eixo só, em passos pequenos, parando na
// última posição válida antes de esbarrar numa parede — em vez de simplesmente
// recusar a posição final de uma vez (o que deixaria o mouse "descolar" do objeto
// perto de uma parede e ele teletransportar através dela quando o mouse
// finalmente saísse do outro lado). Passo bem menor que um tile pra não pular
// uma parede fina de 1 tile de largura mesmo num arraste rápido.
const WALL_SWEEP_STEP = CONFIG.tileSize / 8;
function sweepAxisToTarget(current, target, otherAxisPos, w, h, axis) {
  if (target === current) return current;
  const dir = target > current ? 1 : -1;
  let pos = current;
  while (Math.abs(target - pos) > 0.01) {
    const step = Math.min(WALL_SWEEP_STEP, Math.abs(target - pos));
    const next = pos + dir * step;
    const blocked = axis === 'x'
      ? isBlockedAt(next, otherAxisPos, w, h)
      : isBlockedAt(otherAxisPos, next, w, h);
    if (blocked) break;
    pos = next;
  }
  return pos;
}

function moveDraggedObject(e) {
  const pos = getMousePos(e);
  const obj = state.objects[state.draggedObjectIndex];
  if (!obj) return;

  const prevX = obj.x;
  const prevY = obj.y;

  const newX = Math.max(0, Math.min(pos.x - state.dragOffset.x, canvas.width - obj.w));
  const newY = Math.max(0, Math.min(pos.y - state.dragOffset.y, canvas.height - obj.h));

  // Colisão com paredes só no Modo Visualização (jogo) — no editor o mestre continua
  // livre pra posicionar qualquer objeto em qualquer tile. Eixos varridos separado
  // pra "deslizar" ao longo de uma parede em vez de travar de vez na diagonal.
  if (viewMode.active) {
    obj.x = sweepAxisToTarget(obj.x, newX, obj.y, obj.w, obj.h, 'x');
    obj.y = sweepAxisToTarget(obj.y, newY, obj.x, obj.w, obj.h, 'y');
  } else {
    obj.x = newX;
    obj.y = newY;
  }

  // Arraste em grupo: aplica o mesmo delta do objeto primário a todos os outros
  // objetos selecionados. Os "seguidores" não fazem sweep de colisão de parede
  // (só o objeto clicado) — simplificação aceita pra v1.
  if (state.dragGroupStart && state.dragGroupStart.length > 1) {
    const dx = obj.x - prevX;
    const dy = obj.y - prevY;
    if (dx !== 0 || dy !== 0) {
      state.dragGroupStart.forEach(({ id }) => {
        if (id === obj.id) return;
        const follower = state.objects.find(o => o.id === id);
        if (!follower) return;
        follower.x = Math.max(0, Math.min(follower.x + dx, canvas.width - follower.w));
        follower.y = Math.max(0, Math.min(follower.y + dy, canvas.height - follower.h));
      });
    }
  }

  render();
}

function getNearestObjectIndex(x, y) {
  let nearest = -1;
  let minDist = Infinity;
  
  state.objects.forEach((obj, i) => {
    const dist = getDistanceToObject(obj, x, y);
    if (dist < minDist) {
      minDist = dist;
      nearest = i;
    }
  });
  
  return nearest;
}

function getDistanceToObject(obj, x, y) {
  const centerX = obj.x + obj.w / 2;
  const centerY = obj.y + obj.h / 2;
  return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
}

// ================= ANIMAÇÃO DO MODO VISUALIZAÇÃO =================
// render() normalmente só roda a partir de eventos de mouse; sem isso, o pulso/brilho
// baseado em Date.now() ficaria parado até o próximo movimento do mouse. Throttled a
// ~12 quadros/s: suficiente para uma animação suave e bem mais barato que 60fps,
// já que cada quadro recalcula a névoa (linha de visão) do zero.
let viewModeAnimationHandle = null;
let lastViewModeAnimTime = 0;
function tickViewModeAnimation(ts) {
  if (!viewMode.active) { viewModeAnimationHandle = null; lastViewModeAnimTime = 0; return; }
  if (!lastViewModeAnimTime || ts - lastViewModeAnimTime > 80) {
    lastViewModeAnimTime = ts;
    render();
  }
  viewModeAnimationHandle = requestAnimationFrame(tickViewModeAnimation);
}
function startViewModeAnimation() {
  if (viewModeAnimationHandle) return;
  viewModeAnimationHandle = requestAnimationFrame(tickViewModeAnimation);
}

// ================= RENDERIZAÇÃO =================
function render() {
  // Limpa canvas
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Aplica offset da câmera
  ctx.save();
  ctx.translate(state.camera.offset.x, state.camera.offset.y);

  // Grid (só se zoom > 0.7, e nunca no Modo Visualização)
  if (state.camera.zoom > 0.7 && !viewMode.active) {
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    for (let x = 0; x <= CONFIG.mapWidth; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CONFIG.tileSize, 0);
      ctx.lineTo(x * CONFIG.tileSize, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= CONFIG.mapHeight; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CONFIG.tileSize);
      ctx.lineTo(canvas.width, y * CONFIG.tileSize);
      ctx.stroke();
    }
  }

  // Renderiza camadas na ordem correta
  if (state.layerVisibility.ground) renderGridLayer('ground');
  if (state.layerVisibility.walls) renderGridLayer('walls');
  const charVisible = viewMode.active ? computeCharacterVisibility() : null;
  if (viewMode.active) renderLightGlow(charVisible);
  if (state.layerVisibility.objects) renderObjects();
  if (viewMode.active) renderFogOfWar(charVisible);

  if (state.isDrawingShape) renderShapePreview();
  if (state.isMarqueeSelecting) renderMarqueeSelection();
  if (state.isMeasuring) renderRuler();
  if (state.rangeOverlay) renderMovementRange(state.rangeOverlay);
  if (state.aoeCenter && state.aoeEdge) renderAoEOverlay();

  // Imagem de referência (modo traço)
  if (state.referenceImage) {
    ctx.globalAlpha = 0.4;
    const img = state.referenceImage;
    const sc = Math.min(canvas.width / img.width, canvas.height / img.height, 1);
    const ox = (canvas.width - img.width * sc) / 2;
    const oy = (canvas.height - img.height * sc) / 2;
    ctx.drawImage(img, ox, oy, img.width * sc, img.height * sc);
    ctx.globalAlpha = 1.0;
  }

  // Restaura offset
  ctx.restore();

  // === Modo visualização: desenha info do objeto selecionado ===
  // (some enquanto o próprio objeto selecionado está sendo arrastado)
  const selectedBeingDragged = state.isDragging && state.draggedObjectIndex === viewMode.selectedObject;
  if (viewMode.active && viewMode.selectedObject !== null && !selectedBeingDragged) {
    renderSelectionInfo();
  }
}

function renderSelectionInfo() {
  const info = viewMode.getSelectedInfo();
  if (!info) return;

  const obj = state.objects[viewMode.selectedObject];

  // Borda pulsante no objeto selecionado
  const pulse = 0.5 + 0.3 * Math.sin(Date.now() / 300);
  ctx.strokeStyle = `rgba(0, 200, 255, ${pulse})`;
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(obj.x + state.camera.offset.x - 2, obj.y + state.camera.offset.y - 2, obj.w + 4, obj.h + 4);
  ctx.setLineDash([]);

  // Tooltip com informações
  const tooltipX = Math.min(obj.x + obj.w + 15 + state.camera.offset.x, canvas.width - 220);
  const tooltipY = Math.max(obj.y + state.camera.offset.y - 10, 10);
  const tw = 200;

  // Calcula altura
  let th = 50;
  if (info.attributes) th += Object.keys(info.attributes).length * 20;
  if (info.customAttributes.length > 0) th += info.customAttributes.length * 20;
  if (info.type === 'Objeto') th = 60;

  // Fundo do tooltip
  ctx.fillStyle = 'rgba(20, 20, 30, 0.92)';
  ctx.strokeStyle = 'rgba(100, 200, 255, 0.5)';
  ctx.lineWidth = 2;
  roundRect(ctx, tooltipX + state.camera.offset.x, tooltipY, tw, th, 8);

  // Texto
  ctx.fillStyle = '#e0e0e0';
  ctx.font = 'bold 14px system-ui';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  const titleX = tooltipX + state.camera.offset.x + 10;
  ctx.fillText(`${info.emoji} ${info.name}`, titleX, tooltipY + 8);

  ctx.font = '11px system-ui';
  ctx.fillStyle = '#88aacc';
  ctx.fillText(`Tipo: ${info.type}`, tooltipX + state.camera.offset.x + 10, tooltipY + 28);

  ctx.fillStyle = '#779';
  ctx.fillText(`Posição: ${info.position}`, tooltipX + state.camera.offset.x + 10, tooltipY + 44);

  // Atributos de moldura
  if (info.attributes) {
    let iy = tooltipY + 64;
    ctx.font = 'bold 11px system-ui';
    ctx.fillStyle = '#aaccdd';
    ctx.fillText('─ Atributos ─', tooltipX + state.camera.offset.x + 10, iy);
    iy += 16;

    for (const [key, value] of Object.entries(info.attributes)) {
      ctx.font = '11px system-ui';
      ctx.fillStyle = value ? '#ccddaa' : '#667';
      ctx.fillText(`${key}: ${value || '(vazio)'}`, tooltipX + state.camera.offset.x + 10, iy);
      iy += 18;
    }

    for (const attr of info.customAttributes) {
      ctx.font = '11px system-ui';
      ctx.fillStyle = attr.value ? '#ddccaa' : '#667';
      ctx.fillText(`${attr.name}: ${attr.value || '(vazio)'}`, tooltipX + state.camera.offset.x + 10, iy);
      iy += 18;
    }
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function renderShapePreview() {
  const cells = getShapeCells();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  cells.forEach(({ x, y }) => {
    if (x < 0 || x >= CONFIG.mapWidth || y < 0 || y >= CONFIG.mapHeight) return;
    ctx.fillRect(x * CONFIG.tileSize, y * CONFIG.tileSize, CONFIG.tileSize, CONFIG.tileSize);
  });
}

// Overlay de alcance de movimento (distância de Chebyshev, sem considerar paredes)
function renderMovementRange(frame) {
  const range = parseInt(frame.attributes['Deslocamento']) || 0;
  if (range <= 0) return;
  const col = Math.floor((frame.x + frame.w / 2) / CONFIG.tileSize);
  const row = Math.floor((frame.y + frame.h / 2) / CONFIG.tileSize);

  ctx.fillStyle = 'rgba(60, 140, 220, 0.35)';
  for (let dy = -range; dy <= range; dy++) {
    for (let dx = -range; dx <= range; dx++) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) > range) continue;
      const cx = col + dx;
      const cy = row + dy;
      if (cx < 0 || cy < 0 || cx >= CONFIG.mapWidth || cy >= CONFIG.mapHeight) continue;
      ctx.fillRect(cx * CONFIG.tileSize, cy * CONFIG.tileSize, CONFIG.tileSize, CONFIG.tileSize);
    }
  }
}

// Sombra do Modo Visualização: esconde completamente toda célula de CHÃO fora da
// visão calculada (linha de visão dos Personagens + itens luminosos acesos). A
// camada de paredes (parede, porta, janela, vidro) fica sempre visível — só o
// interior é escondido, não a "casca" do prédio. Salas ocupadas por um Personagem
// clareiam com fade (computeRoomFadeAlpha) em vez de aparecer de uma vez.
function renderFogOfWar(charVisible) {
  const visible = computeVisibleFog(charVisible);
  const fadeAlpha = computeRoomFadeAlpha(computeRooms());

  for (let y = 0; y < CONFIG.mapHeight; y++) {
    for (let x = 0; x < CONFIG.mapWidth; x++) {
      const idx = getIndexFromCoords(x, y);
      if (state.layers.walls[idx] !== 0) continue; // parede sempre visível
      if (visible.has(idx)) continue;

      const alpha = fadeAlpha.has(idx) ? fadeAlpha.get(idx) : 1;
      if (alpha <= 0) continue;
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fillRect(x * CONFIG.tileSize, y * CONFIG.tileSize, CONFIG.tileSize, CONFIG.tileSize);
    }
  }
}

// Brilho animado ao redor de itens luminosos (Tocha, Fogueira, Lava) — só das
// fontes atualmente "acesas" (algum Personagem enxerga a célula da fonte).
function renderLightGlow(charVisible) {
  const sources = getActiveLightSources(charVisible);
  if (sources.length === 0) return;

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const t = Date.now();
  sources.forEach(({ x, y, radius }, i) => {
    const cx = x * CONFIG.tileSize + CONFIG.tileSize / 2;
    const cy = y * CONFIG.tileSize + CONFIG.tileSize / 2;
    const flicker = 0.85 + 0.15 * Math.sin(t / 150 + i * 1.7);
    const px = radius * CONFIG.tileSize * flicker;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, px);
    grad.addColorStop(0, 'rgba(255, 180, 80, 0.35)');
    grad.addColorStop(1, 'rgba(255, 180, 80, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, px, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

// Prévia de Área de Efeito (clique e arraste, círculo persistente até ser limpo)
function renderAoEOverlay() {
  const { x: cx, y: cy } = state.aoeCenter;
  const dx = state.aoeEdge.x - cx;
  const dy = state.aoeEdge.y - cy;
  const pixelRadius = Math.hypot(dx, dy);
  if (pixelRadius < 2) return;

  const tiles = pixelRadius / CONFIG.tileSize;
  const meters = tiles * state.metersPerTile;

  ctx.save();
  ctx.fillStyle = 'rgba(200, 60, 220, 0.25)';
  ctx.strokeStyle = 'rgba(220, 100, 255, 0.9)';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 5]);
  ctx.beginPath();
  ctx.arc(cx, cy, pixelRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = 'rgba(220, 100, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fill();

  const label = `${meters.toFixed(1)} m (${tiles.toFixed(1)} un.)`;
  ctx.font = 'bold 13px system-ui';
  const tw = ctx.measureText(label).width;
  const labelY = cy - pixelRadius - 16;
  ctx.strokeStyle = 'rgba(220, 100, 255, 0.6)';
  ctx.lineWidth = 1;
  ctx.fillStyle = 'rgba(20, 20, 20, 0.9)';
  roundRect(ctx, cx - tw / 2 - 8, labelY - 12, tw + 16, 24, 6);

  ctx.fillStyle = '#e8b8ff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, cx, labelY);
  ctx.restore();
}

function renderCombatPanel() {
  const listEl = document.getElementById('combatList');
  const roundLabel = document.getElementById('combatRoundLabel');
  if (!listEl || !roundLabel) return;

  roundLabel.textContent = combatSystem.active
    ? `⚔️ Combate ativo — Rodada ${combatSystem.round}`
    : 'Fora de combate';

  if (combatSystem.order.length === 0) {
    listEl.innerHTML = '<small class="hint-text">Adicione Molduras à iniciativa pelo editor de ficha (duplo clique numa Moldura).</small>';
    return;
  }

  listEl.innerHTML = combatSystem.order.map((entry, idx) => {
    const frame = combatSystem.getFrameByEntry(entry);
    if (!frame) return '';
    const template = frameSystem.getTemplateDef(frame.template);
    const name = frame.attributes['Nome'] || template.name;
    const hp = frame.attributes['HP'];
    const hpMax = frame.attributes['HPMax'];
    const isActiveTurn = combatSystem.active && idx === combatSystem.currentIndex;
    return `
      <div class="combat-entry${isActiveTurn ? ' active-turn' : ''}">
        <span class="combat-entry-init">${entry.initiative}</span>
        <span class="combat-entry-name">${template.icon} ${name}</span>
        ${hp !== undefined ? `<span class="combat-entry-hp">${hp}/${hpMax}</span>` : ''}
      </div>`;
  }).join('');
}

function renderRuler() {
  if (!state.rulerStart || !state.rulerEnd) return;
  const { x: x0, y: y0 } = state.rulerStart;
  const { x: x1, y: y1 } = state.rulerEnd;
  const pixelDist = Math.hypot(x1 - x0, y1 - y0);
  const tiles = pixelDist / CONFIG.tileSize;
  const meters = tiles * state.metersPerTile;

  ctx.save();
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#ffd700';
  ctx.beginPath(); ctx.arc(x0, y0, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x1, y1, 4, 0, Math.PI * 2); ctx.fill();

  const midX = (x0 + x1) / 2;
  const midY = (y0 + y1) / 2;
  const label = `${meters.toFixed(1)} m (${tiles.toFixed(1)} un.)`;

  ctx.font = 'bold 13px system-ui';
  const tw = ctx.measureText(label).width;
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
  ctx.lineWidth = 1;
  ctx.fillStyle = 'rgba(20, 20, 20, 0.9)';
  roundRect(ctx, midX - tw / 2 - 8, midY - 12, tw + 16, 24, 6);

  ctx.fillStyle = '#ffd700';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, midX, midY);
  ctx.restore();
}

function renderGridLayer(layerName) {
  state.layers[layerName].forEach((id, index) => {
    if (id === 0 && layerName !== 'ground') return;
    
    const tile = getTileConfig(id);
    if (!tile) return;
    
    const coords = getCoordsFromIndex(index);
    const x = coords.x * CONFIG.tileSize;
    const y = coords.y * CONFIG.tileSize;

    const isDoor = layerName === 'walls' && id === 23;
    const isOpenDoor = isDoor && state.openDoors.has(index);

    // Porta aberta: desenha esmaecida (passável)
    if (isOpenDoor) {
      ctx.save();
      ctx.globalAlpha = 0.35;
    }

    // Desenha textura/cor
    if (tile.texture) {
      drawTexture(ctx, x, y, tile.texture, tile.color);
    } else if (tile.color) {
      ctx.fillStyle = tile.color;
      ctx.fillRect(x, y, CONFIG.tileSize, CONFIG.tileSize);
    }

    // Emoji
    if (tile.emoji) {
      ctx.font = `${CONFIG.tileSize - 8}px system-ui`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tile.emoji, x + CONFIG.tileSize/2, y + CONFIG.tileSize/2 + 2);
    }

    if (isOpenDoor) ctx.restore();

    // Indicador de porta: verde quando aberta (passável), âmbar quando fechada
    // no Modo Visualização (convida o mestre a clicar para abrir)
    if (isOpenDoor) {
      ctx.strokeStyle = 'rgba(80, 220, 120, 0.9)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 2, y + 2, CONFIG.tileSize - 4, CONFIG.tileSize - 4);
    } else if (isDoor && viewMode.active) {
      ctx.strokeStyle = 'rgba(255, 200, 80, 0.7)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 2, y + 2, CONFIG.tileSize - 4, CONFIG.tileSize - 4);
    }

    // Highlight se for camada atual
    if (layerName === state.currentLayer && id !== 0) {
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 1, y + 1, CONFIG.tileSize - 2, CONFIG.tileSize - 2);
    }
  });
}

// Destaque dinâmico ao passar o mouse sobre um item/ficha no Modo Visualização
// (não desenha se o item já for o selecionado, que tem seu próprio contorno pulsante)
function drawHoverGlow(x, y, w, h, index) {
  if (!viewMode.active || viewMode.hoveredObject !== index || viewMode.selectedObject === index) return;
  ctx.save();
  ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
  ctx.shadowBlur = 14;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 2, y - 2, w + 4, h + 4);
  ctx.restore();
}

function renderObjects() {
  state.objects.forEach((obj, index) => {
    const tile = getTileConfig(obj.tileId);
    if (!tile) return;

    // Moldura: renderização especial
    if (obj.type === 'frame') {
      renderFrameOnCanvas(obj, index);
      return;
    }

    // Desenha objeto normal
    if (tile.texture) {
      drawTexture(ctx, obj.x, obj.y, tile.texture, tile.color);
    } else if (tile.color) {
      ctx.fillStyle = tile.color;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    }

    // Emoji
    if (tile.emoji) {
      ctx.font = `${obj.h - 8}px system-ui`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tile.emoji, obj.x + obj.w/2, obj.y + obj.h/2 + 2);
    }

    // Borda de seleção se for camada atual
    if (state.currentLayer === 'objects') {
      ctx.strokeStyle = 'rgba(255,215,0,0.6)';
      ctx.lineWidth = 2;
      ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
    }

    // Contorno tracejado para objetos selecionados pela ferramenta Mover (multi-seleção)
    if (state.selectedObjectIds.has(obj.id)) {
      ctx.strokeStyle = 'rgba(0, 200, 255, 0.8)';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(obj.x - 3, obj.y - 3, obj.w + 6, obj.h + 6);
      ctx.setLineDash([]);
    }

    drawHoverGlow(obj.x, obj.y, obj.w, obj.h, index);
  });
}

// Retângulo de seleção em arraste (ferramenta Mover, clique em área vazia)
function renderMarqueeSelection() {
  const { marqueeStart: s, marqueeEnd: eEnd } = state;
  const x = Math.min(s.x, eEnd.x);
  const y = Math.min(s.y, eEnd.y);
  const w = Math.abs(eEnd.x - s.x);
  const h = Math.abs(eEnd.y - s.y);
  ctx.fillStyle = 'rgba(0, 200, 255, 0.15)';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.8)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.strokeRect(x, y, w, h);
  ctx.setLineDash([]);
}

function hpBarColor(pct) {
  return pct > 60 ? '#4a9a4a' : pct > 30 ? '#d4a017' : '#c41e3a';
}

// Lista unificada de barras de uma Moldura: a de HP (embutida no template, quando
// existe) seguida das barras customizadas do usuário. `color: null` significa "usar
// hpBarColor(pct)" (cor dinâmica por % de vida); uma cor customizada é sempre fixa.
function getFrameBars(frame) {
  const bars = [];
  if (frame.attributes && frame.attributes['HP'] !== undefined) {
    const hp = parseInt(frame.attributes['HP']) || 0;
    const hpMax = parseInt(frame.attributes['HPMax']) || hp || 1;
    bars.push({ label: 'HP', value: hp, max: hpMax, color: null });
  }
  (frame.customBars || []).forEach(b => {
    const val = parseInt(b.value) || 0;
    const max = parseInt(b.max) || val || 1;
    bars.push({ label: b.label, value: val, max, color: b.color || null });
  });
  return bars;
}

function barColorFor(bar, pct) {
  return bar.color || hpBarColor(pct);
}

// Desenha uma barra genérica (trilho + preenchimento) no canvas — usada por
// renderFrameOnCanvas/renderMinimizedFrame/renderFrameOnExport pra não duplicar a
// mesma lógica de fillRect 3 vezes.
function drawBarOnCanvas(c, x, y, w, h, pct, color) {
  c.fillStyle = 'rgba(0,0,0,0.5)';
  c.fillRect(x, y, w, h);
  c.fillStyle = color;
  c.fillRect(x, y, w * (Math.max(0, Math.min(100, pct)) / 100), h);
}

// Tamanho fixo do token quando a Moldura está minimizada (só imagem + vida)
const FRAME_MINIMIZED_SIZE = 56;

// Limites do tamanho editável da Moldura expandida (ver applyFrameResize)
const FRAME_MIN_SIZE = 60;
const FRAME_MAX_SIZE = 400;

// Alterna entre o cartão completo e o token minimizado, mantendo o centro fixo
// (não deixa o token "pular" de posição ao minimizar/expandir)
function toggleFrameMinimized(frame) {
  if (!Room.isOwner(frame)) return;
  saveHistory();
  const cx = frame.x + frame.w / 2;
  const cy = frame.y + frame.h / 2;

  if (frame.minimized) {
    frame.w = frame._expandedW || 140;
    frame.h = frame._expandedH || 180;
  } else {
    frame._expandedW = frame.w;
    frame._expandedH = frame.h;
    frame.w = FRAME_MINIMIZED_SIZE;
    frame.h = FRAME_MINIMIZED_SIZE;
  }
  frame.x = cx - frame.w / 2;
  frame.y = cy - frame.h / 2;
  frame.minimized = !frame.minimized;
  Room.syncObjectUpdate(frame.id, { minimized: frame.minimized, x: frame.x, y: frame.y, w: frame.w, h: frame.h });
  render();
}

// Contorno de seleção pulsante, anel de turno ativo e destaque ao passar o mouse —
// compartilhado entre o cartão completo e o token minimizado
function renderFrameSelectionOverlays(frame, index, isSelected) {
  if (isSelected || state.selectedObjectIds.has(frame.id)) {
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.8)';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(frame.x - 3, frame.y - 3, frame.w + 6, frame.h + 6);
    ctx.setLineDash([]);
  }

  if (combatSystem.active && combatSystem.getActiveFrame() === frame) {
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.strokeRect(frame.x - 5, frame.y - 5, frame.w + 10, frame.h + 10);
  }

  drawHoverGlow(frame.x, frame.y, frame.w, frame.h, index);
}

// Token minimizado: só a imagem/ícone e a barra de vida (sem nome/atributos)
function renderMinimizedFrame(frame, template, hasHp, index, isSelected, isBeingDragged) {
  const hpH = hasHp ? 7 : 0;
  const portraitH = frame.h - hpH;

  ctx.fillStyle = 'rgba(25, 25, 35, 0.95)';
  ctx.strokeStyle = template.color || '#8b5a2b';
  ctx.lineWidth = isSelected ? 3 : 2;
  roundRect(ctx, frame.x, frame.y, frame.w, portraitH, 8);

  if (frame.imageSrc) {
    if (!frame._cachedImage || frame._cachedImage.src !== frame.imageSrc) {
      const img = new Image();
      img.src = frame.imageSrc;
      img.onload = () => {
        frame._cachedImage = img;
        render();
      };
      img.onerror = () => { frame._cachedImage = null; };
    }

    if (frame._cachedImage && frame._cachedImage.complete) {
      ctx.save();
      roundRect(ctx, frame.x + 2, frame.y + 2, frame.w - 4, portraitH - 4, 6);
      ctx.clip();
      ctx.drawImage(frame._cachedImage, frame.x + 2, frame.y + 2, frame.w - 4, portraitH - 4);
      ctx.restore();
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(frame.x + 2, frame.y + 2, frame.w - 4, portraitH - 4);
    }
  } else {
    ctx.fillStyle = template.color || '#8b5a2b';
    roundRect(ctx, frame.x + 4, frame.y + 4, frame.w - 8, portraitH - 8, 6);
    ctx.fillStyle = '#fff';
    ctx.font = `${Math.floor(portraitH * 0.5)}px system-ui`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(template.icon, frame.x + frame.w / 2, frame.y + portraitH / 2 + 1);
  }

  if (hasHp && !isBeingDragged) {
    const hp = parseInt(frame.attributes['HP']) || 0;
    const hpMax = parseInt(frame.attributes['HPMax']) || hp || 1;
    const pct = Math.max(0, Math.min(100, (hp / hpMax) * 100));
    drawBarOnCanvas(ctx, frame.x, frame.y + portraitH, frame.w, hpH, pct, hpBarColor(pct));
  }

  renderFrameSelectionOverlays(frame, index, isSelected);
}

function renderFrameOnCanvas(frame, index) {
  const template = frameSystem.getTemplateDef(frame.template);
  const isSelected = viewMode.active && viewMode.selectedObject === index;
  const hasHp = frame.attributes['HP'] !== undefined;
  const isBeingDragged = state.isDragging && state.draggedObjectIndex === index;

  if (frame.minimized) {
    renderMinimizedFrame(frame, template, hasHp, index, isSelected, isBeingDragged);
    return;
  }

  // Fundo do card
  ctx.fillStyle = 'rgba(25, 25, 35, 0.95)';
  ctx.strokeStyle = template.color || '#8b5a2b';
  ctx.lineWidth = isSelected ? 3 : 2;
  roundRect(ctx, frame.x, frame.y, frame.w, frame.h, 10);

  // Cabeçalho com nome (some durante o arraste — só o retrato fica visível)
  if (!isBeingDragged) {
    ctx.fillStyle = template.color || '#8b5a2b';
    ctx.fillRect(frame.x, frame.y, frame.w, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const headerText = `${template.icon} ${frame.attributes['Nome'] || template.name}`;
    ctx.fillText(headerText, frame.x + frame.w / 2, frame.y + 14);
  }

  // Barra(s): HP embutido + barras customizadas, empilhadas (não durante o arraste)
  const bars = getFrameBars(frame);
  const barX = frame.x + 8;
  const barY0 = frame.y + 29;
  const barW = frame.w - 16;
  const barH = 6;
  const barGap = 2;
  if (bars.length > 0 && !isBeingDragged) {
    bars.forEach((bar, i) => {
      const barY = barY0 + i * (barH + barGap);
      const pct = Math.max(0, Math.min(100, (bar.value / bar.max) * 100));
      drawBarOnCanvas(ctx, barX, barY, barW, barH, pct, barColorFor(bar, pct));
    });
  }

  // Área do ícone/imagem
  const iconAreaSize = Math.min(frame.w - 24, 76);
  const iconX = frame.x + (frame.w - iconAreaSize) / 2;
  const barsTotalH = bars.length > 0 ? bars.length * barH + (bars.length - 1) * barGap : 0;
  const iconY = bars.length > 0 ? barY0 + barsTotalH + 5 : frame.y + 34;
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  roundRect(ctx, iconX, iconY, iconAreaSize, iconAreaSize, 10);

  if (frame.imageSrc) {
    if (!frame._cachedImage || frame._cachedImage.src !== frame.imageSrc) {
      const img = new Image();
      img.src = frame.imageSrc;
      img.onload = () => {
        frame._cachedImage = img;
        render();
      };
      img.onerror = () => { frame._cachedImage = null; };
    }

    if (frame._cachedImage && frame._cachedImage.complete) {
      ctx.drawImage(frame._cachedImage, iconX + 4, iconY + 4, iconAreaSize - 8, iconAreaSize - 8);
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(iconX + 4, iconY + 4, iconAreaSize - 8, iconAreaSize - 8);
    }
  } else {
    ctx.fillStyle = template.color || '#8b5a2b';
    roundRect(ctx, iconX + 10, iconY + 10, iconAreaSize - 20, iconAreaSize - 20, 8);
    ctx.fillStyle = '#fff';
    ctx.font = '24px system-ui';
    ctx.fillText(template.icon, frame.x + frame.w / 2, iconY + iconAreaSize / 2 + 2);
  }

  // Valores principais abaixo do ícone (também some durante o arraste)
  if (!isBeingDragged) {
    const lines = [];
    const primaryKeys = ['Classe', 'Tipo', 'Raridade', 'Nivel', 'Dano', 'Defesa', 'Peso', 'Conteudo', 'Missao', 'Funcao', 'Trancado'];
    for (const key of primaryKeys) {
      if (frame.attributes[key]) {
        const label = template.attributes.find(a => a.key === key)?.label || key;
        lines.push(`${label}: ${frame.attributes[key]}`);
      }
      if (lines.length >= 3) break;
    }

    if (lines.length === 0) {
      for (const [key, value] of Object.entries(frame.attributes)) {
        if (key === 'Nome' || !value) continue;
        const label = template.attributes.find(a => a.key === key)?.label || key;
        lines.push(`${label}: ${value}`);
        if (lines.length >= 3) break;
      }
    }

    ctx.fillStyle = '#ddd';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    let valueY = iconY + iconAreaSize + 10;
    const valueX = frame.x + 12;

    lines.forEach(line => {
      ctx.fillText(line, valueX, valueY);
      valueY += 14;
    });

    if (frame.customAttributes && frame.customAttributes.length > 0) {
      ctx.fillStyle = '#99a';
      ctx.font = '9px system-ui';
      frame.customAttributes.slice(0, 2).forEach(attr => {
        ctx.fillText(`${attr.name}: ${attr.value || '-'}`, valueX, valueY);
        valueY += 13;
      });
    }
  }

  renderFrameSelectionOverlays(frame, index, isSelected);
}

function drawTexture(c, x, y, tex, col) {
  const ts = CONFIG.tileSize;

  // --- GRAMA ---
  if (tex === 'texture-grass') {
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    // Pequenas manchas de grama
    c.fillStyle = 'rgba(80, 160, 80, 0.6)';
    for (let i = 0; i < 5; i++) {
      const gx = x + ((i * 7 + 3) % ts);
      const gy = y + ((i * 11 + 5) % ts);
      c.fillRect(gx, gy, 2, 3);
    }
    // Destaque
    c.fillStyle = 'rgba(120, 200, 100, 0.35)';
    c.fillRect(x + 6, y + 8, 3, 2);
    c.fillRect(x + 20, y + 18, 2, 3);
    c.fillRect(x + 12, y + 24, 3, 2);
  }
  // --- TERRA (melhorada) ---
  else if (tex === 'texture-dirt') {
    // Base com variação de cor
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    // Camada mais escura
    c.fillStyle = 'rgba(60, 30, 10, 0.3)';
    c.fillRect(x + 2, y + 2, ts - 4, ts - 4);
    // Grumos de terra
    c.fillStyle = 'rgba(120, 75, 35, 0.5)';
    const grit = [[5,4,6,2],[16,8,5,3],[3,18,7,2],[20,22,4,3],[10,14,6,2],[24,4,3,3]];
    grit.forEach(([gx,gy,gw,gh]) => c.fillRect(x+gx, y+gy, gw, gh));
    // Pedrinhas
    c.fillStyle = 'rgba(140, 120, 90, 0.4)';
    c.fillRect(x + 8, y + 10, 2, 2);
    c.fillRect(x + 22, y + 16, 2, 2);
    c.fillRect(x + 14, y + 26, 2, 1);
  }
  // --- PEDRA / PAREDES (melhorada) ---
  else if (tex === 'texture-stone') {
    // Base
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    // Padrão de tijolos/pedra
    c.fillStyle = 'rgba(0, 0, 0, 0.2)';
    // Fileiras horizontais
    c.fillRect(x, y + 10, ts, 2);
    c.fillRect(x, y + 22, ts, 2);
    // Fileiras verticais alternadas
    c.fillRect(x + 8, y, 2, 10);
    c.fillRect(x + 20, y + 12, 2, 10);
    c.fillRect(x + 12, y + 24, 2, 8);
    // Highlights
    c.fillStyle = 'rgba(255, 255, 255, 0.08)';
    c.fillRect(x + 2, y + 2, ts - 4, 1);
    c.fillRect(x + 2, y + 2, 1, ts - 4);
    // Sombra inferior/direita
    c.fillStyle = 'rgba(0, 0, 0, 0.15)';
    c.fillRect(x + 2, y + ts - 3, ts - 2, 1);
    c.fillRect(x + ts - 3, y + 2, 1, ts - 2);
  }
  // --- MADEIRA (melhorada) ---
  else if (tex === 'texture-wood') {
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    // Veios da madeira
    const grainColors = ['rgba(80, 40, 15, 0.4)', 'rgba(100, 55, 25, 0.3)', 'rgba(60, 30, 10, 0.35)'];
    grainColors.forEach((gc, i) => {
      c.strokeStyle = gc;
      c.lineWidth = 1;
      c.beginPath();
      const baseY = y + 6 + i * 10;
      c.moveTo(x, baseY);
      c.bezierCurveTo(x + 8, baseY - 2, x + 20, baseY + 2, x + ts, baseY);
      c.stroke();
    });
    // Nós da madeira
    c.fillStyle = 'rgba(50, 25, 5, 0.4)';
    c.beginPath();
    c.arc(x + 24, y + 14, 3, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = 'rgba(80, 50, 20, 0.3)';
    c.beginPath();
    c.arc(x + 24, y + 14, 5, 0, Math.PI * 2);
    c.stroke();
  }
  // --- METAL ---
  else if (tex === 'texture-metal') {
    // Gradiente metálico
    const grad = c.createLinearGradient(x, y, x, y + ts);
    grad.addColorStop(0, 'rgba(200, 200, 210, 0.4)');
    grad.addColorStop(0.5, 'rgba(150, 150, 165, 0.2)');
    grad.addColorStop(1, 'rgba(100, 100, 115, 0.3)');
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    c.fillStyle = grad;
    c.fillRect(x, y, ts, ts);
    // Rebittes
    c.fillStyle = 'rgba(220, 220, 230, 0.6)';
    c.beginPath(); c.arc(x + 5, y + 5, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(x + 27, y + 5, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(x + 5, y + 27, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(x + 27, y + 27, 2, 0, Math.PI * 2); c.fill();
  }
  // --- ÁGUA (melhorada) ---
  else if (tex === 'texture-water') {
    // Base com gradiente
    const grad = c.createLinearGradient(x, y, x + ts, y + ts);
    grad.addColorStop(0, '#3a8098');
    grad.addColorStop(1, '#5ab0c8');
    c.fillStyle = grad;
    c.fillRect(x, y, ts, ts);
    // Ondas
    c.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(x, y + 10);
    c.bezierCurveTo(x + 8, y + 6, x + 16, y + 14, x + ts, y + 10);
    c.stroke();
    c.beginPath();
    c.moveTo(x, y + 20);
    c.bezierCurveTo(x + 6, y + 17, x + 18, y + 23, x + ts, y + 20);
    c.stroke();
    c.beginPath();
    c.moveTo(x, y + 28);
    c.bezierCurveTo(x + 10, y + 26, x + 22, y + 30, x + ts, y + 28);
    c.stroke();
    // Brilhos
    c.fillStyle = 'rgba(255, 255, 255, 0.2)';
    c.beginPath(); c.arc(x + 8, y + 14, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(x + 22, y + 6, 1.5, 0, Math.PI * 2); c.fill();
  }
  // --- LAVA (melhorada) ---
  else if (tex === 'texture-lava') {
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    // Bolhas de lava
    const bubbles = [[10,8,4],[22,16,3],[6,24,3],[18,26,2],[28,6,2]];
    bubbles.forEach(([bx,by,br]) => {
      c.fillStyle = 'rgba(255, 140, 30, 0.5)';
      c.beginPath(); c.arc(x + bx, y + by, br, 0, Math.PI * 2); c.fill();
      c.fillStyle = 'rgba(255, 200, 50, 0.3)';
      c.beginPath(); c.arc(x + bx, y + by, br - 1, 0, Math.PI * 2); c.fill();
    });
    // Rachaduras brilhantes
    c.strokeStyle = 'rgba(255, 100, 0, 0.4)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(x + 4, y + 16);
    c.lineTo(x + 14, y + 12);
    c.lineTo(x + 26, y + 18);
    c.stroke();
  }
  // --- AREIA ---
  else if (tex === 'texture-sand') {
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    c.fillStyle = 'rgba(180, 150, 100, 0.4)';
    for (let i = 0; i < 12; i++) {
      c.fillRect(x + (i * 7 + 3) % ts, y + (i * 11 + 2) % ts, 1, 1);
    }
    c.fillStyle = 'rgba(255, 240, 200, 0.3)';
    c.beginPath(); c.arc(x + 16, y + 10, 1.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(x + 8, y + 22, 1, 0, Math.PI * 2); c.fill();
  }
  // --- ASFALTO ---
  else if (tex === 'texture-asphalt') {
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    for (let i = 0; i < 10; i++) {
      const sx = x + (i * 9 + 4) % ts;
      const sy = y + (i * 13 + 6) % ts;
      c.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.2)';
      c.fillRect(sx, sy, 1, 1);
    }
    c.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(x + 4, y + 6);
    c.lineTo(x + 16, y + 18);
    c.lineTo(x + 26, y + 24);
    c.stroke();
  }
  // --- CONCRETO ---
  else if (tex === 'texture-concrete') {
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    c.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(x, y + ts / 2);
    c.lineTo(x + ts, y + ts / 2);
    c.moveTo(x + ts / 2, y);
    c.lineTo(x + ts / 2, y + ts);
    c.stroke();
    c.fillStyle = 'rgba(0, 0, 0, 0.12)';
    const speckles = [[6, 4], [22, 9], [10, 20], [26, 25]];
    speckles.forEach(([sx, sy]) => c.fillRect(x + sx, y + sy, 1, 1));
  }
  // --- VIDRO ---
  else if (tex === 'texture-glass') {
    const grad = c.createLinearGradient(x, y, x + ts, y + ts);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
    grad.addColorStop(0.45, col);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
    c.fillStyle = grad;
    c.fillRect(x, y, ts, ts);
    c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(x + 4, y + 2);
    c.lineTo(x + 14, y + 12);
    c.stroke();
    c.beginPath();
    c.moveTo(x + 18, y + 6);
    c.lineTo(x + 28, y + 16);
    c.stroke();
  }
  // --- ESCADA ---
  else if (tex === 'texture-stairs') {
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    // Degraus em diagonal (claro/escuro alternado sugerindo profundidade)
    const steps = 5;
    for (let i = 0; i < steps; i++) {
      const sy = y + (i * ts) / steps;
      const sh = ts / steps;
      c.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.18)';
      c.fillRect(x, sy, ts, sh);
      c.fillStyle = 'rgba(0, 0, 0, 0.35)';
      c.fillRect(x, sy + sh - 2, ts, 2);
    }
  }
  // --- TAPETE ---
  else if (tex === 'texture-rug') {
    c.fillStyle = col;
    c.fillRect(x, y, ts, ts);
    // Borda decorativa interna
    c.strokeStyle = 'rgba(255, 220, 150, 0.55)';
    c.lineWidth = 2;
    c.strokeRect(x + 4, y + 4, ts - 8, ts - 8);
    c.strokeStyle = 'rgba(255, 220, 150, 0.3)';
    c.lineWidth = 1;
    c.strokeRect(x + 8, y + 8, ts - 16, ts - 16);
    // Padrão central
    c.fillStyle = 'rgba(255, 220, 150, 0.25)';
    c.beginPath();
    c.arc(x + ts / 2, y + ts / 2, 4, 0, Math.PI * 2);
    c.fill();
  }
}

// ================= TOAST & CONFIRMAÇÃO =================
function toast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(el);

  setTimeout(() => {
    el.classList.add('toast-out');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, duration);
}

function confirmDialog(message, { danger = false, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar' } = {}) {
  return new Promise((resolve) => {
    document.querySelector('.confirm-modal')?.remove();

    const modal = document.createElement('div');
    modal.className = 'confirm-modal';
    modal.innerHTML = `
      <div class="confirm-modal-content">
        <p>${message}</p>
        <div class="frame-editor-actions">
          <button class="${danger ? 'btn-danger' : 'btn-primary'}" data-action="confirm">${confirmLabel}</button>
          <button class="btn-secondary" data-action="cancel">${cancelLabel}</button>
        </div>
      </div>
    `;

    const finish = (result) => {
      modal.removeEventListener('click', handleOverlayClick);
      document.removeEventListener('keydown', handleKeyDown);
      modal.remove();
      resolve(result);
    };

    const handleOverlayClick = (e) => {
      if (e.target === modal) finish(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') finish(false);
    };

    modal.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleKeyDown);
    modal.querySelector('[data-action="confirm"]').addEventListener('click', () => finish(true));
    modal.querySelector('[data-action="cancel"]').addEventListener('click', () => finish(false));

    document.body.appendChild(modal);
  });
}

// ================= HISTÓRICO (UNDO) =================
function saveHistory() {
  state.history.push({
    layers: JSON.parse(JSON.stringify(state.layers)),
    objects: JSON.parse(JSON.stringify(state.objects))
  });
  if (state.history.length > 50) state.history.shift();
}

function undo() {
  if (state.history.length === 0) return;
  if (!Room.canEditLayers()) return;
  const objectsBefore = state.objects;
  const prev = state.history.pop();
  state.layers = prev.layers;
  state.objects = prev.objects;
  state.rangeOverlay = null;
  combatSystem.pruneInvalid();
  render();
  Room.syncLayers();
  Room.syncObjectsFullDiff(objectsBefore, state.objects);
}

// ================= EXPORT/IMPORT =================
function exportMapJSON() {
  const data = {
    width: CONFIG.mapWidth,
    height: CONFIG.mapHeight,
    tileSize: CONFIG.tileSize,
    layers: state.layers,
    objects: state.objects,
    layerVisibility: state.layerVisibility,
    created: new Date().toISOString(),
    version: '2.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mapa_rpg_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function importMapJSON(e) {
  if (Room.active) {
    toast('Saia da sala pra importar um mapa novo.', 'warning');
    e.target.value = '';
    return;
  }

  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (ev) => {
    try {
      const data = JSON.parse(ev.target.result);

      if (!data.layers || !data.width) throw new Error('Formato inválido');

      if (data.width !== CONFIG.mapWidth || data.height !== CONFIG.mapHeight) {
        const shouldContinue = await confirmDialog(`Mapa é ${data.width}x${data.height}. Redimensionar?`, { confirmLabel: 'Redimensionar' });
        if (!shouldContinue) return;
      }

      saveHistory();
      state.layers = data.layers;
      state.objects = data.objects || [];
      // Mapas exportados antes do sistema de salas não têm id nos objetos — preenche
      // pra manter o invariante "todo objeto tem id estável", usado nas ações de sala.
      state.objects.forEach(obj => {
        if (!obj.id) obj.id = generateObjectId(obj.type === 'frame' ? 'frame' : 'obj');
      });
      if (data.layerVisibility) state.layerVisibility = data.layerVisibility;
      state.openDoors.clear();

      // Atualiza UI de visibilidade
      document.querySelectorAll('.layer').forEach(btn => {
        const layer = btn.dataset.layer;
        if (!state.layerVisibility[layer]) btn.classList.add('hidden');
      });

      render();
      toast('Mapa carregado com sucesso!', 'success');
    } catch (err) {
      toast('Erro: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function exportAsPNG() {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height;
  const exportCtx = exportCanvas.getContext('2d');
  
  // Renderiza limpo (sem grid/destaques)
  exportCtx.fillStyle = '#1a1a1a';
  exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  
  // Grid layers
  ['ground', 'walls'].forEach(layer => {
    if (!state.layerVisibility[layer]) return;
    state.layers[layer].forEach((id, i) => {
      if (id === 0 && layer !== 'ground') return;
      const tile = getTileConfig(id);
      if (!tile) return;
      const x = (i % CONFIG.mapWidth) * CONFIG.tileSize;
      const y = Math.floor(i / CONFIG.mapWidth) * CONFIG.tileSize;
      if (tile.texture) drawTexture(exportCtx, x, y, tile.texture, tile.color);
      else if (tile.color) { exportCtx.fillStyle = tile.color; exportCtx.fillRect(x, y, CONFIG.tileSize, CONFIG.tileSize); }
      if (tile.emoji) {
        exportCtx.font = `${CONFIG.tileSize - 8}px system-ui`;
        exportCtx.textAlign = 'center';
        exportCtx.textBaseline = 'middle';
        exportCtx.fillText(tile.emoji, x + CONFIG.tileSize/2, y + CONFIG.tileSize/2 + 2);
      }
    });
  });
  
  // Objects
  if (state.layerVisibility.objects) {
    state.objects.forEach(obj => {
      if (obj.type === 'frame') {
        renderFrameOnExport(exportCtx, obj);
        return;
      }
      const tile = getTileConfig(obj.tileId);
      if (!tile) return;
      if (tile.texture) drawTexture(exportCtx, obj.x, obj.y, tile.texture, tile.color);
      else if (tile.color) { exportCtx.fillStyle = tile.color; exportCtx.fillRect(obj.x, obj.y, obj.w, obj.h); }
      if (tile.emoji) {
        exportCtx.font = `${obj.h - 8}px system-ui`;
        exportCtx.textAlign = 'center';
        exportCtx.textBaseline = 'middle';
        exportCtx.fillText(tile.emoji, obj.x + obj.w/2, obj.y + obj.h/2 + 2);
      }
    });
  }
  
  // Download
  exportCanvas.toBlob((blob) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `mapa_rpg_${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, 'image/png');
}

function renderFrameOnExport(exportCtx, frame) {
  const template = frameSystem.getTemplateDef(frame.template);

  if (frame.minimized) {
    const hasHp = frame.attributes['HP'] !== undefined;
    const hpH = hasHp ? 7 : 0;
    const portraitH = frame.h - hpH;

    exportCtx.fillStyle = 'rgba(25, 25, 35, 0.95)';
    exportCtx.strokeStyle = template.color || '#8b5a2b';
    exportCtx.lineWidth = 2;
    roundRect(exportCtx, frame.x, frame.y, frame.w, portraitH, 8);

    if (frame._cachedImage && frame._cachedImage.complete) {
      exportCtx.save();
      roundRect(exportCtx, frame.x + 2, frame.y + 2, frame.w - 4, portraitH - 4, 6);
      exportCtx.clip();
      exportCtx.drawImage(frame._cachedImage, frame.x + 2, frame.y + 2, frame.w - 4, portraitH - 4);
      exportCtx.restore();
    } else if (frame.imageSrc) {
      exportCtx.fillStyle = 'rgba(255,255,255,0.15)';
      exportCtx.fillRect(frame.x + 2, frame.y + 2, frame.w - 4, portraitH - 4);
    } else {
      exportCtx.fillStyle = template.color || '#8b5a2b';
      roundRect(exportCtx, frame.x + 4, frame.y + 4, frame.w - 8, portraitH - 8, 6);
      exportCtx.fillStyle = '#fff';
      exportCtx.font = `${Math.floor(portraitH * 0.5)}px system-ui`;
      exportCtx.textAlign = 'center';
      exportCtx.textBaseline = 'middle';
      exportCtx.fillText(template.icon, frame.x + frame.w / 2, frame.y + portraitH / 2 + 1);
    }

    if (hasHp) {
      const hp = parseInt(frame.attributes['HP']) || 0;
      const hpMax = parseInt(frame.attributes['HPMax']) || hp || 1;
      const pct = Math.max(0, Math.min(100, (hp / hpMax) * 100));
      drawBarOnCanvas(exportCtx, frame.x, frame.y + portraitH, frame.w, hpH, pct, hpBarColor(pct));
    }
    return;
  }

  exportCtx.fillStyle = 'rgba(25, 25, 35, 0.95)';
  exportCtx.strokeStyle = template.color || '#8b5a2b';
  exportCtx.lineWidth = 2;
  roundRect(exportCtx, frame.x, frame.y, frame.w, frame.h, 10);

  exportCtx.fillStyle = template.color || '#8b5a2b';
  exportCtx.fillRect(frame.x, frame.y, frame.w, 28);
  exportCtx.fillStyle = '#fff';
  exportCtx.font = 'bold 12px system-ui';
  exportCtx.textAlign = 'center';
  exportCtx.textBaseline = 'middle';
  exportCtx.fillText(`${template.icon} ${frame.attributes['Nome'] || template.name}`, frame.x + frame.w / 2, frame.y + 14);

  const bars = getFrameBars(frame);
  const barX = frame.x + 8;
  const barY0 = frame.y + 29;
  const barW = frame.w - 16;
  const barH = 6;
  const barGap = 2;
  bars.forEach((bar, i) => {
    const barY = barY0 + i * (barH + barGap);
    const pct = Math.max(0, Math.min(100, (bar.value / bar.max) * 100));
    drawBarOnCanvas(exportCtx, barX, barY, barW, barH, pct, barColorFor(bar, pct));
  });

  const iconAreaSize = Math.min(frame.w - 24, 76);
  const iconX = frame.x + (frame.w - iconAreaSize) / 2;
  const barsTotalH = bars.length > 0 ? bars.length * barH + (bars.length - 1) * barGap : 0;
  const iconY = bars.length > 0 ? barY0 + barsTotalH + 5 : frame.y + 34;
  exportCtx.fillStyle = 'rgba(255,255,255,0.05)';
  roundRect(exportCtx, iconX, iconY, iconAreaSize, iconAreaSize, 10);

  if (frame._cachedImage && frame._cachedImage.complete) {
    exportCtx.drawImage(frame._cachedImage, iconX + 4, iconY + 4, iconAreaSize - 8, iconAreaSize - 8);
  } else if (frame.imageSrc) {
    exportCtx.fillStyle = 'rgba(255,255,255,0.15)';
    exportCtx.fillRect(iconX + 4, iconY + 4, iconAreaSize - 8, iconAreaSize - 8);
  } else {
    exportCtx.fillStyle = template.color || '#8b5a2b';
    roundRect(exportCtx, iconX + 10, iconY + 10, iconAreaSize - 20, iconAreaSize - 20, 8);
    exportCtx.fillStyle = '#fff';
    exportCtx.font = '24px system-ui';
    exportCtx.fillText(template.icon, frame.x + frame.w / 2, iconY + iconAreaSize / 2 + 2);
  }

  const lines = [];
  const primaryKeys = ['Classe', 'Tipo', 'Raridade', 'Nivel', 'Dano', 'Defesa', 'Peso', 'Conteudo', 'Missao', 'Funcao', 'Trancado'];
  for (const key of primaryKeys) {
    if (frame.attributes[key]) {
      const label = template.attributes.find(a => a.key === key)?.label || key;
      lines.push(`${label}: ${frame.attributes[key]}`);
    }
    if (lines.length >= 3) break;
  }

  if (lines.length === 0) {
    for (const [key, value] of Object.entries(frame.attributes)) {
      if (key === 'Nome' || !value) continue;
      const label = template.attributes.find(a => a.key === key)?.label || key;
      lines.push(`${label}: ${value}`);
      if (lines.length >= 3) break;
    }
  }

  exportCtx.fillStyle = '#ddd';
  exportCtx.font = '10px system-ui';
  exportCtx.textAlign = 'left';
  exportCtx.textBaseline = 'top';
  let valueY = iconY + iconAreaSize + 10;
  const valueX = frame.x + 12;
  lines.forEach(line => {
    exportCtx.fillText(line, valueX, valueY);
    valueY += 14;
  });
}

function showPngImportModal() {
  document.querySelector('.import-overlay')?.remove();
  
  const overlay = document.querySelector('.import-overlay');
  overlay.classList.remove('hidden');
  overlay.innerHTML = `
    <h3>📷 Importar PNG como Referência</h3>
    <p>A imagem será exibida com transparência para você traçar por cima.</p>
    <input type="file" id="pngImportInput" accept="image/png,image/jpeg">
    <div class="btn-group">
      <button id="startPngImport">Carregar Imagem</button>
      <button class="secondary" id="cancelPngImport">Cancelar</button>
      <button class="secondary" id="clearPngImport" style="display:none;">Remover Imagem</button>
    </div>
  `;
  
  document.getElementById('cancelPngImport').onclick = () => overlay.classList.add('hidden');
  
  const clearBtn = document.getElementById('clearPngImport');
  if (state.referenceImage) {
    clearBtn.style.display = 'inline-block';
  }
  clearBtn.onclick = () => {
    state.referenceImage = null;
    render();
    overlay.classList.add('hidden');
  };
  
  document.getElementById('startPngImport').onclick = () => {
    document.getElementById('pngImportInput').click();
  };
  
  document.getElementById('pngImportInput').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        state.referenceImage = img;
        render();
        overlay.classList.add('hidden');
        toast('Imagem carregada! Use como guia para desenhar.', 'success');
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };
}
// ================= SISTEMA DE MOLDURA/FRAME =================
// Resistente a colisão entre sessões/abas diferentes (importante em salas multiplayer,
// onde ids são gerados por clientes distintos) — não usa um contador em memória, que
// reiniciaria a cada reload e colidiria entre clientes.
function generateObjectId(prefix) {
  return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}
function generateFrameId() {
  return generateObjectId('frame');
}

const frameSystem = {
  templates: [
    {
      name: 'Personagem',
      icon: '⚔️',
      color: '#4a9a4a',
      attributes: [
        { key: 'Nome', label: 'Nome', type: 'text' },
        { key: 'Classe', label: 'Classe', type: 'text' },
        { key: 'Nivel', label: 'Nível', type: 'number', default: 1 },
        { key: 'HP', label: '❤️ HP', type: 'number', default: 100, max: true },
        { key: 'AC', label: '🛡️ AC', type: 'number', default: 10 },
        { key: 'Deslocamento', label: '👟 Deslocamento (quadrados)', type: 'number', default: 6 },
        { key: 'Visao', label: '👁️ Visão (quadrados)', type: 'number', default: 8 }
      ]
    },
    {
      name: 'Inimigo',
      icon: '💀',
      color: '#c41e3a',
      attributes: [
        { key: 'Nome', label: 'Nome', type: 'text' },
        { key: 'Tipo', label: 'Tipo', type: 'text' },
        { key: 'Nivel', label: 'Nível', type: 'number', default: 1 },
        { key: 'HP', label: '❤️ HP', type: 'number', default: 50, max: true },
        { key: 'AC', label: '🛡️ AC', type: 'number', default: 10 },
        { key: 'Dano', label: '⚔️ Dano', type: 'text' },
        { key: 'Deslocamento', label: '👟 Deslocamento (quadrados)', type: 'number', default: 6 }
      ]
    },
    {
      name: 'NPC',
      icon: '🧑',
      color: '#5a9aca',
      attributes: [
        { key: 'Nome', label: 'Nome', type: 'text' },
        { key: 'Funcao', label: 'Função', type: 'text' },
        { key: 'Faction', label: 'Facção', type: 'text' },
        { key: 'HP', label: '❤️ HP', type: 'number', default: 30, max: true },
        { key: 'Missao', label: '📜 Missão', type: 'text' },
        { key: 'Deslocamento', label: '👟 Deslocamento (quadrados)', type: 'number', default: 6 }
      ]
    },
    {
      name: 'Item',
      icon: '📦',
      color: '#d4a017',
      attributes: [
        { key: 'Nome', label: 'Nome', type: 'text' },
        { key: 'Raridade', label: 'Raridade', type: 'select', options: ['Comum', 'Incomum', 'Raro', 'Épico', 'Lendário'] },
        { key: 'Dano', label: '⚔️ Dano', type: 'text' },
        { key: 'Defesa', label: '🛡️ Defesa', type: 'number', default: 0 },
        { key: 'Peso', label: '⚖️ Peso', type: 'number', default: 1 }
      ]
    },
    {
      name: 'Baú/Tesouro',
      icon: '🪙',
      color: '#b8860b',
      attributes: [
        { key: 'Nome', label: 'Nome', type: 'text' },
        { key: 'Conteudo', label: 'Conteúdo', type: 'text' },
        { key: 'Trancado', label: '🔒 Trancado', type: 'select', options: ['Não', 'Sim (DC 10)', 'Sim (DC 15)', 'Sim (DC 20)', 'Mágico'] },
        { key: 'Armadilha', label: '⚠️ Armadilha', type: 'text' }
      ]
    },
    {
      name: 'Veículo',
      icon: '🚗',
      color: '#3a5a8a',
      attributes: [
        { key: 'Nome', label: 'Nome', type: 'text' },
        { key: 'Tipo', label: 'Tipo', type: 'select', options: ['Carro', 'Moto', 'Caminhão', 'Van'] },
        { key: 'Velocidade', label: '💨 Velocidade', type: 'number', default: 0 },
        { key: 'Combustivel', label: '⛽ Combustível', type: 'number', default: 100, max: true }
      ]
    }
  ],

  createFrame(x, y, templateName = 'Personagem', initialAttributes = {}, imageSrc = null, customAttributes = [], customBars = [], w = 140, h = 180) {
    const template = this.templates.find(t => t.name === templateName) || this.templates[0];
    const frame = {
      id: generateFrameId(),
      type: 'frame',
      tileId: 1000,
      x: x,
      y: y,
      w: w,
      h: h,
      template: templateName,
      attributes: {},
      customAttributes: customAttributes || [],
      customBars: customBars || [],
      imageSrc: imageSrc || null,
      _cachedImage: null
    };

    this.initializeFrameAttributes(frame, initialAttributes);
    state.objects.push(frame);
    Room.syncObjectAdd(frame);
    return frame;
  },

  initializeFrameAttributes(frame, initialAttributes = {}) {
    const template = this.getTemplateDef(frame.template);
    template.attributes.forEach(attr => {
      if (initialAttributes.hasOwnProperty(attr.key)) {
        frame.attributes[attr.key] = String(initialAttributes[attr.key] ?? '');
      } else {
        frame.attributes[attr.key] = attr.default !== undefined ? String(attr.default) : '';
      }

      if (attr.max) {
        const maxKey = attr.key + 'Max';
        if (initialAttributes.hasOwnProperty(maxKey)) {
          frame.attributes[maxKey] = String(initialAttributes[maxKey] ?? frame.attributes[attr.key]);
        } else {
          frame.attributes[maxKey] = frame.attributes[attr.key];
        }
      }
    });
  },

  getFrameAtPosition(x, y) {
    for (let obj of state.objects) {
      if (obj.type === 'frame' &&
          x >= obj.x && x < obj.x + obj.w &&
          y >= obj.y && y < obj.y + obj.h) {
        return obj;
      }
    }
    return null;
  },

  getTemplateDef(name) {
    return this.templates.find(t => t.name === name) || this.templates[0];
  },

  addCustomAttribute(frame, name, value) {
    frame.customAttributes.push({ name, value });
  },

  // Barras customizadas (tipo "barra de vida", mas com nome/cor livres) — estrutura
  // paralela a customAttributes, não reaproveitada, pra não precisar de checagem de
  // tipo em todo lugar que já itera customAttributes assumindo o formato {name,value}.
  addCustomBar(frame, label, value, max, color) {
    if (!frame.customBars) frame.customBars = [];
    const v = Number(value) || 0;
    frame.customBars.push({
      id: generateObjectId('bar'),
      label: label || 'Barra',
      value: v,
      max: Number(max) || v || 1,
      color: color || null
    });
    // No-op automático em Room.syncObjectUpdate quando frame.id ainda não existe
    // (rascunho de criação) — só sincroniza de fato pra molduras já no mapa.
    Room.syncObjectUpdate(frame.id, { customBars: frame.customBars });
  },

  updateCustomBar(frame, barId, fields) {
    const bar = (frame.customBars || []).find(b => b.id === barId);
    if (!bar) return;
    Object.assign(bar, fields);
    Room.syncObjectUpdate(frame.id, { customBars: frame.customBars });
  },

  removeCustomBar(frame, barId) {
    frame.customBars = (frame.customBars || []).filter(b => b.id !== barId);
    Room.syncObjectUpdate(frame.id, { customBars: frame.customBars });
  },

  updateAttribute(frame, attrName, value) {
    if (!Room.canEditAttributes(frame)) return;
    if (frame.attributes.hasOwnProperty(attrName)) {
      frame.attributes[attrName] = value;
    } else {
      const customAttr = frame.customAttributes.find(a => a.name === attrName);
      if (customAttr) customAttr.value = value;
    }
    Room.syncObjectUpdate(frame.id, { attributes: { ...frame.attributes } });
  },

  deleteFrame(frame) {
    if (!Room.canDeleteObject(frame)) return;
    const index = state.objects.indexOf(frame);
    if (index !== -1) {
      state.objects.splice(index, 1);
      combatSystem.removeCombatant(frame);
      if (state.rangeOverlay === frame) state.rangeOverlay = null;
      Room.syncObjectRemove(frame.id);
      render();
    }
  }
};

function getFrameAtPosition(x, y) {
  return frameSystem.getFrameAtPosition(x, y);
}

// ================= SISTEMA DE COMBATE/INICIATIVA =================
const combatSystem = {
  active: false,
  round: 1,
  order: [], // [{ frameId, initiative }], ordenado por iniciativa desc
  currentIndex: 0,

  isEligible(frame) {
    return frame.attributes && frame.attributes['HP'] !== undefined;
  },

  isInCombat(frame) {
    return this.order.some(entry => entry.frameId === frame.id);
  },

  getInitiative(frame) {
    const entry = this.order.find(e => e.frameId === frame.id);
    return entry ? entry.initiative : null;
  },

  setInitiative(frame, initiative) {
    if (!frame.id) frame.id = generateFrameId();
    const value = Number(initiative) || 0;
    const entry = this.order.find(e => e.frameId === frame.id);
    if (entry) entry.initiative = value;
    else this.order.push({ frameId: frame.id, initiative: value });
    this.sortOrder();
    render();
    renderCombatPanel();
  },

  removeCombatant(frame) {
    this.order = this.order.filter(entry => entry.frameId !== frame.id);
    if (this.currentIndex >= this.order.length) this.currentIndex = 0;
    render();
    renderCombatPanel();
  },

  sortOrder() {
    this.order.sort((a, b) => b.initiative - a.initiative);
  },

  getFrameByEntry(entry) {
    return state.objects.find(o => o.type === 'frame' && o.id === entry.frameId) || null;
  },

  // Remove combatentes cujo frame não existe mais em state.objects
  // (necessário após undo()/resizeMap(), que substituem state.objects)
  pruneInvalid() {
    this.order = this.order.filter(entry => this.getFrameByEntry(entry) !== null);
    if (this.currentIndex >= this.order.length) this.currentIndex = 0;
    renderCombatPanel();
  },

  start() {
    if (this.order.length === 0) return;
    this.active = true;
    this.round = 1;
    this.currentIndex = 0;
    render();
    renderCombatPanel();
  },

  end() {
    this.active = false;
    render();
    renderCombatPanel();
  },

  nextTurn() {
    if (!this.active || this.order.length === 0) return;
    this.currentIndex++;
    if (this.currentIndex >= this.order.length) {
      this.currentIndex = 0;
      this.round++;
    }
    render();
    renderCombatPanel();
  },

  previousTurn() {
    if (!this.active || this.order.length === 0) return;
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.order.length - 1;
      this.round = Math.max(1, this.round - 1);
    }
    render();
    renderCombatPanel();
  },

  getActiveFrame() {
    if (!this.active || this.order.length === 0) return null;
    return this.getFrameByEntry(this.order[this.currentIndex]);
  }
};

function adjustFrameHP(frame, delta) {
  if (frame.attributes['HP'] === undefined) return;
  if (!Room.canEditAttributes(frame)) return;
  saveHistory();
  const max = parseInt(frame.attributes['HPMax']) || parseInt(frame.attributes['HP']) || 0;
  const current = parseInt(frame.attributes['HP']) || 0;
  frame.attributes['HP'] = String(Math.max(0, Math.min(max, current + delta)));
  Room.syncObjectUpdate(frame.id, { attributes: { ...frame.attributes } });
  render();
  renderCombatPanel();
}

function openFrameEditor(frame, options = {}) {
  document.querySelector('.frame-editor-modal')?.remove();

  const isCreation = options.creation === true;
  // Editor restrito: Jogador editando a própria Moldura (permissão concedida pelo
  // Mestre) — só o essencial de "editar meu token" fica disponível, nada de
  // template/imagem/combate/exclusão.
  const restricted = options.restricted === true;
  const template = frameSystem.getTemplateDef(frame.template);
  const modal = document.createElement('div');
  modal.className = 'frame-editor-modal';
  if (isCreation) modal.dataset.creation = 'true';
  if (restricted) modal.dataset.restricted = 'true';
  if (options.position) modal.framePosition = options.position;
  modal.currentFrame = frame;

  modal.innerHTML = `
    <div class="frame-editor-content">
      <div class="frame-editor-header">
        <h3>${template.icon || '🖼️'} ${isCreation ? 'Criar' : 'Editar'} ${frame.template}</h3>
        <button class="close-btn" data-close="true">✕</button>
      </div>

      <div class="frame-editor-body">
        <div class="frame-preview" style="border-color: ${template.color || '#8b5a2b'}">
          ${renderFramePreview(frame)}
        </div>

        <div class="frame-attributes-form">
          <h4>📋 ${isCreation ? 'Configurar' : 'Atributos'}</h4>

          ${!restricted ? `
          <div class="attr-input-group">
            <label>Template</label>
            <select id="frameTemplateSelect" style="width:100%;padding:8px 12px;background:#2a2a2a;border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:0.95rem;">
              ${frameSystem.templates.map(t => `<option value="${t.name}" ${t.name === frame.template ? 'selected' : ''}>${t.icon} ${t.name}</option>`).join('')}
            </select>
          </div>

          <div class="attr-input-group">
            <label>Imagem da Moldura</label>
            <input type="file" id="frameImageInput" accept="image/*">
            <div class="frame-image-preview-container">
              ${frame.imageSrc ? `<img src="${frame.imageSrc}" id="frameImagePreview" class="frame-image-preview">` : `<div class="frame-image-placeholder">Sem imagem</div>`}
              ${frame.imageSrc ? `<button type="button" id="frameRemoveImage" class="btn-remove" style="margin-top:10px;">Remover imagem</button>` : ''}
            </div>
          </div>

          <div class="attr-input-group">
            <label>Tamanho da Moldura (px)</label>
            ${(!isCreation && frame.minimized) ? `
              <small class="hint-text">Expanda a moldura no mapa para redimensionar.</small>
            ` : `
              <div class="hp-input-row">
                <input type="number" id="frameWidthInput" min="${FRAME_MIN_SIZE}" max="${FRAME_MAX_SIZE}" step="4" value="${frame.w}" style="width:90px;">
                <span style="color:#888; margin: 0 4px;">×</span>
                <input type="number" id="frameHeightInput" min="${FRAME_MIN_SIZE}" max="${FRAME_MAX_SIZE}" step="4" value="${frame.h}" style="width:90px;">
              </div>
            `}
          </div>
          ` : ''}

          ${!isCreation ? `
            <div class="attr-input-group">
              <button type="button" id="frameToggleMinimizeBtn" class="btn-secondary" style="width:100%;padding:10px;border:none;border-radius:6px;cursor:pointer;">
                ${frame.minimized ? '🔼 Expandir no Mapa' : '🔽 Minimizar no Mapa (mostra só imagem + vida)'}
              </button>
            </div>
          ` : ''}

          ${template.attributes.map(attrDef => {
            const value = frame.attributes[attrDef.key] ?? '';
            const maxVal = attrDef.max ? (frame.attributes[attrDef.key + 'Max'] ?? value) : null;
            return renderAttrInput(attrDef, value, maxVal);
          }).join('')}

          ${!isCreation && combatSystem.isEligible(frame) ? `
            <h4 style="margin-top:15px;">⚔️ Combate</h4>
            <div class="hp-quick-adjust">
              <button type="button" data-hp-delta="-5">-5</button>
              <button type="button" data-hp-delta="-1">-1</button>
              <button type="button" data-hp-delta="1">+1</button>
              <button type="button" data-hp-delta="5">+5</button>
              <span class="hint-text" style="margin-left:auto;">Ajuste rápido de HP</span>
            </div>
            ${!restricted ? `
              <div class="attr-input-group">
                <label>Iniciativa</label>
                <div class="hp-input-row">
                  <input type="number" id="frameInitiativeInput" value="${combatSystem.getInitiative(frame) ?? ''}" placeholder="ex: 15" style="width:80px;">
                  <button type="button" id="frameSetInitiativeBtn" class="btn-add" style="width:auto;padding:8px 12px;">${combatSystem.isInCombat(frame) ? '🔄 Atualizar' : '➕ Adicionar à Iniciativa'}</button>
                  ${combatSystem.isInCombat(frame) ? `<button type="button" id="frameRemoveInitiativeBtn" class="btn-remove">Remover</button>` : ''}
                </div>
              </div>
              ${frame.attributes['Deslocamento'] !== undefined ? `
                <button type="button" id="frameToggleRangeBtn" class="btn-secondary" style="width:100%;padding:10px;border:none;border-radius:6px;cursor:pointer;margin-top:6px;">
                  📏 ${state.rangeOverlay === frame ? 'Ocultar Alcance de Movimento' : 'Mostrar Alcance de Movimento'}
                </button>
              ` : ''}
            ` : ''}
          ` : ''}

          ${!restricted && frame.customAttributes.length > 0 ? `
            <h4 style="margin-top:15px;">🔧 Atributos Customizados</h4>
            ${frame.customAttributes.map((attr, idx) => `
              <div class="attr-input-group custom">
                <label>${attr.name}</label>
                <div class="attr-input-actions">
                  <input type="text"
                         data-custom="${idx}"
                         value="${attr.value}"
                         onchange="updateFrameCustomAttribute(${idx}, this.value)">
                  <button onclick="removeCustomAttribute(${idx})" class="btn-remove" title="Remover">🗑️</button>
                </div>
              </div>
            `).join('')}
          ` : ''}

          ${!restricted ? `
            <div class="add-attr-section">
              <h4 style="margin-bottom:8px;">+ Novo Atributo</h4>
              <input type="text" id="newAttrName" placeholder="Nome (ex: Força)">
              <input type="text" id="newAttrValue" placeholder="Valor (ex: 18)">
              <button onclick="addCustomAttribute()" class="btn-add">+ Adicionar</button>
            </div>
          ` : ''}

          ${!restricted && (frame.customBars || []).length > 0 ? `
            <h4 style="margin-top:15px;">📊 Barras</h4>
            ${frame.customBars.map(bar => {
              const pct = Math.max(0, Math.min(100, (bar.value / (bar.max || 1)) * 100));
              const barColor = bar.color || hpBarColor(pct);
              return `
              <div class="attr-input-group custom">
                <div class="attr-input-actions">
                  <input type="text" value="${bar.label}" style="flex:1;"
                         onchange="updateFrameCustomBar('${bar.id}', 'label', this.value); refreshFrameEditor()">
                  <button onclick="removeCustomBar('${bar.id}')" class="btn-remove" title="Remover">🗑️</button>
                </div>
                <div class="hp-input-row">
                  <input type="number" value="${bar.value}" style="width:70px;"
                         onchange="updateFrameCustomBar('${bar.id}', 'value', this.value); refreshFrameEditor()">
                  <span style="color:#888; margin: 0 4px;">/</span>
                  <input type="number" value="${bar.max}" style="width:70px;"
                         onchange="updateFrameCustomBar('${bar.id}', 'max', this.value); refreshFrameEditor()">
                  <input type="color" value="${bar.color || '#4a9a4a'}" style="width:36px;height:32px;padding:0;border:none;background:none;"
                         onchange="updateFrameCustomBar('${bar.id}', 'color', this.value); refreshFrameEditor()">
                  <div class="hp-bar-mini" style="flex:1;height:14px;background:#1a1a1a;border-radius:4px;overflow:hidden;margin-left:8px;">
                    <div style="width:${pct}%;height:100%;background:${barColor};border-radius:4px;transition:width 0.3s;"></div>
                  </div>
                </div>
              </div>`;
            }).join('')}
          ` : ''}

          ${!restricted ? `
            <div class="add-attr-section">
              <h4 style="margin-bottom:8px;">+ Nova Barra</h4>
              <input type="text" id="newBarLabel" placeholder="Nome (ex: Sanidade)">
              <input type="number" id="newBarValue" placeholder="Valor (ex: 10)">
              <input type="number" id="newBarMax" placeholder="Máximo (ex: 10)">
              <input type="color" id="newBarColor" value="#4a9a4a" style="width:100%;height:36px;padding:0;border:1px solid var(--border);border-radius:6px;background:#2a2a2a;">
              <button onclick="addCustomBar()" class="btn-add">+ Adicionar Barra</button>
            </div>
          ` : ''}
        </div>

        <div class="frame-editor-actions">
          ${isCreation ? `
            <button id="frameCreateBtn" class="btn-primary">✓ Criar</button>
            <button data-close="true" class="btn-secondary">Cancelar</button>
          ` : restricted ? `
            <button data-close="true" class="btn-primary">✓ Fechar</button>
          ` : `
            <button onclick="deleteCurrentFrame()" class="btn-danger">🗑️ Excluir</button>
            <button data-close="true" class="btn-primary">✓ Fechar</button>
          `}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  makeDraggable(modal.querySelector('.frame-editor-content'));

  const closeModal = () => {
    modal.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleKeyDown);
    modal.remove();
  };

  const handleOverlayClick = (e) => {
    if (e.target === modal) closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  modal.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleKeyDown);
  modal.querySelectorAll('[data-close="true"]').forEach(btn => btn.addEventListener('click', closeModal));

  const imageInput = modal.querySelector('#frameImageInput');
  if (imageInput) {
    imageInput.addEventListener('change', e => loadFrameImageFromInput(modal, e));
  }

  const removeImageButton = modal.querySelector('#frameRemoveImage');
  if (removeImageButton) {
    removeImageButton.addEventListener('click', () => {
      modal.currentFrame.imageSrc = null;
      modal.currentFrame._cachedImage = null;
      refreshFrameEditor();
    });
  }

  const templateSelect = modal.querySelector('#frameTemplateSelect');
  if (templateSelect) {
    templateSelect.addEventListener('change', (e) => {
      if (modal.dataset.creation === 'true') {
        modal.currentFrame.template = e.target.value;
        frameSystem.initializeFrameAttributes(modal.currentFrame, modal.currentFrame.attributes);
        refreshFrameEditor();
        return;
      }

      // Modo edição: troca o template preservando atributos/posição, sem duplicar o objeto no mapa
      const oldFrame = modal.currentFrame;
      const newFrame = {
        id: oldFrame.id,
        type: 'frame',
        tileId: 1000,
        x: oldFrame.x,
        y: oldFrame.y,
        w: oldFrame.w,
        h: oldFrame.h,
        template: e.target.value,
        attributes: {},
        customAttributes: [...oldFrame.customAttributes],
        customBars: [...(oldFrame.customBars || [])],
        imageSrc: oldFrame.imageSrc,
        _cachedImage: oldFrame._cachedImage
      };
      frameSystem.initializeFrameAttributes(newFrame);
      for (const [key, val] of Object.entries(oldFrame.attributes)) {
        if (newFrame.attributes.hasOwnProperty(key)) newFrame.attributes[key] = val;
      }

      const idx = state.objects.indexOf(oldFrame);
      if (idx !== -1) state.objects[idx] = newFrame;

      modal.currentFrame = newFrame;
      render();
      refreshFrameEditor();
    });
  }

  modal.querySelectorAll('.frame-attributes-form input, .frame-attributes-form select')
    .forEach(el => {
      el.addEventListener('input', () => refreshFramePreviewFromForm());
      el.addEventListener('change', () => refreshFramePreviewFromForm());
    });

  const createBtn = modal.querySelector('#frameCreateBtn');
  if (createBtn) {
    createBtn.addEventListener('click', createNewFrameFromModal);
  }

  modal.querySelectorAll('[data-hp-delta]').forEach(btn => {
    btn.addEventListener('click', () => {
      adjustFrameHP(modal.currentFrame, parseInt(btn.dataset.hpDelta, 10));
      refreshFrameEditor();
    });
  });

  const setInitiativeBtn = modal.querySelector('#frameSetInitiativeBtn');
  if (setInitiativeBtn) {
    setInitiativeBtn.addEventListener('click', () => {
      const input = modal.querySelector('#frameInitiativeInput');
      combatSystem.setInitiative(modal.currentFrame, parseInt(input.value, 10) || 0);
      refreshFrameEditor();
    });
  }

  const removeInitiativeBtn = modal.querySelector('#frameRemoveInitiativeBtn');
  if (removeInitiativeBtn) {
    removeInitiativeBtn.addEventListener('click', () => {
      combatSystem.removeCombatant(modal.currentFrame);
      refreshFrameEditor();
    });
  }

  const toggleRangeBtn = modal.querySelector('#frameToggleRangeBtn');
  if (toggleRangeBtn) {
    toggleRangeBtn.addEventListener('click', () => {
      state.rangeOverlay = state.rangeOverlay === modal.currentFrame ? null : modal.currentFrame;
      render();
      refreshFrameEditor();
    });
  }

  const toggleMinimizeBtn = modal.querySelector('#frameToggleMinimizeBtn');
  if (toggleMinimizeBtn) {
    toggleMinimizeBtn.addEventListener('click', () => {
      toggleFrameMinimized(modal.currentFrame);
      refreshFrameEditor();
    });
  }

  const widthInput = modal.querySelector('#frameWidthInput');
  const heightInput = modal.querySelector('#frameHeightInput');
  if (widthInput && heightInput) {
    widthInput.addEventListener('change', applyFrameResize);
    heightInput.addEventListener('change', applyFrameResize);
  }
}

// Aplica o novo tamanho (largura/altura) definido nos inputs do editor. Em modo
// criação a moldura ainda não existe no mapa (só grava w/h no rascunho, sem
// histórico/sync); em modo edição recentraliza a moldura (mesma convenção de
// toggleFrameMinimized) e propaga via undo + Room.
function applyFrameResize() {
  const modal = document.querySelector('.frame-editor-modal');
  if (!modal || !modal.currentFrame) return;
  const wEl = modal.querySelector('#frameWidthInput');
  const hEl = modal.querySelector('#frameHeightInput');
  if (!wEl || !hEl) return;

  const frame = modal.currentFrame;
  const w = Math.max(FRAME_MIN_SIZE, Math.min(FRAME_MAX_SIZE, parseInt(wEl.value, 10) || frame.w));
  const h = Math.max(FRAME_MIN_SIZE, Math.min(FRAME_MAX_SIZE, parseInt(hEl.value, 10) || frame.h));
  wEl.value = w;
  hEl.value = h;
  if (w === frame.w && h === frame.h) return;

  if (modal.dataset.creation === 'true') {
    frame.w = w;
    frame.h = h;
    return;
  }

  saveHistory();
  const cx = frame.x + frame.w / 2;
  const cy = frame.y + frame.h / 2;
  frame.w = w;
  frame.h = h;
  frame.x = cx - w / 2;
  frame.y = cy - h / 2;
  Room.syncObjectUpdate(frame.id, { w, h, x: frame.x, y: frame.y });
  render();
}

function openFrameCreationModal(x, y) {
  const frame = {
    type: 'frame',
    tileId: 1000,
    x,
    y,
    w: 140,
    h: 180,
    template: 'Personagem',
    attributes: {},
    customAttributes: [],
    customBars: [],
    imageSrc: null,
    _cachedImage: null
  };
  frameSystem.initializeFrameAttributes(frame);
  openFrameEditor(frame, { creation: true, position: { x, y } });
}

function createNewFrameFromModal() {
  const modal = document.querySelector('.frame-editor-modal');
  if (!modal || !modal.currentFrame || !modal.framePosition) return;
  if (!Room.canAddObject()) return;

  const frame = modal.currentFrame;
  modal.querySelectorAll('[data-attr]').forEach(el => {
    const attrKey = el.getAttribute('data-attr');
    frame.attributes[attrKey] = el.value;
  });

  saveHistory();
  const newFrame = frameSystem.createFrame(
    modal.framePosition.x,
    modal.framePosition.y,
    frame.template,
    frame.attributes,
    frame.imageSrc,
    [...frame.customAttributes],
    [...(frame.customBars || [])],
    frame.w,
    frame.h
  );

  if (frame._cachedImage) {
    newFrame._cachedImage = frame._cachedImage;
  }

  modal.remove();
  render();
  openFrameEditor(newFrame);
}

function loadFrameImageFromInput(modal, event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      if (modal && modal.currentFrame) {
        modal.currentFrame.imageSrc = ev.target.result;
        modal.currentFrame._cachedImage = img;
        refreshFrameEditor();
      }
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

// Renderiza um campo de atributo baseado na definição
function renderAttrInput(attrDef, value, maxVal) {
  if (attrDef.type === 'select') {
    const options = (attrDef.options || []).map(opt =>
      `<option value="${opt}" ${opt === value ? 'selected' : ''}>${opt}</option>`
    ).join('');
    return `
      <div class="attr-input-group">
        <label>${attrDef.label}</label>
        <select data-attr="${attrDef.key}" onchange="updateFrameAttribute('${attrDef.key}', this.value)"
                style="width:100%;padding:8px 12px;background:#2a2a2a;border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:0.95rem;">
          ${options}
        </select>
      </div>`;
  }

  if (attrDef.type === 'number') {
    if (maxVal !== null) {
      // Campo com valor/max (ex: HP, ou qualquer atributo de template com max:true)
      const hpVal = parseInt(value) || 0;
      const hpMax = parseInt(maxVal) || 1;
      const pct = Math.max(0, Math.min(100, (hpVal / hpMax) * 100));
      const barColor = hpBarColor(pct);
      return `
        <div class="attr-input-group">
          <label>${attrDef.label}</label>
          <div class="hp-input-row">
            <input type="number" data-attr="${attrDef.key}" value="${hpVal}"
                   onchange="updateFrameAttribute('${attrDef.key}', this.value); refreshFramePreviewFromForm()"
                   style="width:70px;">
            <span style="color:#888; margin: 0 4px;">/</span>
            <input type="number" data-attr="${attrDef.key}Max" value="${hpMax}"
                   onchange="updateFrameAttribute('${attrDef.key}Max', this.value); refreshFramePreviewFromForm()"
                   style="width:70px;">
            <div class="hp-bar-mini" style="flex:1;height:14px;background:#1a1a1a;border-radius:4px;overflow:hidden;margin-left:8px;">
              <div style="width:${pct}%;height:100%;background:${barColor};border-radius:4px;transition:width 0.3s;"></div>
            </div>
          </div>
        </div>`;
    }
    return `
      <div class="attr-input-group">
        <label>${attrDef.label}</label>
        <input type="number" data-attr="${attrDef.key}" value="${value}"
               onchange="updateFrameAttribute('${attrDef.key}', this.value); refreshFramePreviewFromForm()"
               style="width:100px;">
      </div>`;
  }

  // text
  return `
    <div class="attr-input-group">
      <label>${attrDef.label}</label>
      <input type="text" data-attr="${attrDef.key}" value="${value}"
             onchange="updateFrameAttribute('${attrDef.key}', this.value); refreshFramePreviewFromForm()">
    </div>`;
}

// Preview dentro do editor
function renderFramePreview(frame) {
  const template = frameSystem.getTemplateDef(frame.template);
  const nome = frame.attributes['Nome'] || frame.template;
  let html = `<div style="text-align:center;margin-bottom:10px;">`;
  html += `<div style="font-size:1.3rem;font-weight:bold;color:${template.color}">${template.icon} ${nome}</div>`;
  html += `</div>`;

  if (frame.imageSrc) {
    html += `<div style="display:flex;justify-content:center;margin-bottom:12px;">
      <img src="${frame.imageSrc}" alt="Preview" style="max-width:120px;max-height:120px;border-radius:12px;border:1px solid rgba(255,255,255,0.12);" />
    </div>`;
  }

  // Barras: HP embutido + barras customizadas do usuário
  getFrameBars(frame).forEach(bar => {
    const pct = Math.max(0, Math.min(100, (bar.value / bar.max) * 100));
    html += barHTML(bar.label, bar.value, bar.max, pct, barColorFor(bar, pct));
  });

  // Demais atributos
  html += '<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;">';
  for (const [key, val] of Object.entries(frame.attributes)) {
    if (key === 'HP' || key === 'HPMax' || key === 'Mana' || key === 'ManaMax') continue;
    if (key === 'Nome') continue;
    const label = template.attributes.find(a => a.key === key)?.label || key;
    html += `<div style="background:rgba(0,0,0,0.3);padding:4px 8px;border-radius:4px;font-size:0.8rem;">${label}: <strong>${val || '-'}</strong></div>`;
  }
  html += '</div>';

  // Custom attrs
  for (const attr of (frame.customAttributes || [])) {
    html += `<div style="margin-top:4px;font-size:0.8rem;color:#aaa;">🔧 ${attr.name}: ${attr.value || '-'}</div>`;
  }

  return html;
}

function barHTML(label, current, max, pct, color) {
  return `
    <div style="margin:6px 0;">
      <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#aaa;margin-bottom:2px;">
        <span>${label}</span><span>${current} / ${max}</span>
      </div>
      <div style="height:12px;background:#1a1a1a;border-radius:6px;overflow:hidden;">
        <div style="width:${pct}%;height:100%;background:${color};transition:width 0.3s;"></div>
      </div>
    </div>`;
}

// Funções globais para o editor
window.updateFrameAttribute = function(attrName, value) {
  const modal = document.querySelector('.frame-editor-modal');
  if (modal && modal.currentFrame) {
    frameSystem.updateAttribute(modal.currentFrame, attrName, value);
  }
};

window.updateFrameCustomAttribute = function(idx, value) {
  const modal = document.querySelector('.frame-editor-modal');
  if (modal && modal.currentFrame) {
    modal.currentFrame.customAttributes[idx].value = value;
  }
};

window.addCustomAttribute = function() {
  const modal = document.querySelector('.frame-editor-modal');
  if (!modal || !modal.currentFrame) return;

  const nameInput = document.getElementById('newAttrName');
  const valueInput = document.getElementById('newAttrValue');

  if (nameInput.value.trim()) {
    frameSystem.addCustomAttribute(modal.currentFrame, nameInput.value.trim(), valueInput.value);
    nameInput.value = '';
    valueInput.value = '';
    refreshFrameEditor();
  }
};

window.removeCustomAttribute = function(idx) {
  const modal = document.querySelector('.frame-editor-modal');
  if (modal && modal.currentFrame) {
    modal.currentFrame.customAttributes.splice(idx, 1);
    refreshFrameEditor();
  }
};

window.addCustomBar = function() {
  const modal = document.querySelector('.frame-editor-modal');
  if (!modal || !modal.currentFrame) return;

  const labelInput = document.getElementById('newBarLabel');
  const valueInput = document.getElementById('newBarValue');
  const maxInput = document.getElementById('newBarMax');
  const colorInput = document.getElementById('newBarColor');

  if (labelInput.value.trim()) {
    frameSystem.addCustomBar(modal.currentFrame, labelInput.value.trim(), valueInput.value, maxInput.value, colorInput.value);
    labelInput.value = '';
    valueInput.value = '';
    maxInput.value = '';
    refreshFrameEditor();
  }
};

window.updateFrameCustomBar = function(barId, field, value) {
  const modal = document.querySelector('.frame-editor-modal');
  if (!modal || !modal.currentFrame) return;
  const parsed = (field === 'value' || field === 'max') ? (Number(value) || 0) : value;
  frameSystem.updateCustomBar(modal.currentFrame, barId, { [field]: parsed });
};

window.removeCustomBar = function(barId) {
  const modal = document.querySelector('.frame-editor-modal');
  if (modal && modal.currentFrame) {
    frameSystem.removeCustomBar(modal.currentFrame, barId);
    refreshFrameEditor();
  }
};

window.deleteCurrentFrame = async function() {
  const modal = document.querySelector('.frame-editor-modal');
  if (modal && modal.currentFrame) {
    const shouldDelete = await confirmDialog('Deseja excluir esta moldura? Essa ação não pode ser desfeita.', { danger: true, confirmLabel: 'Excluir' });
    if (shouldDelete) {
      frameSystem.deleteFrame(modal.currentFrame);
      modal.remove();
    }
  }
};

function refreshFrameEditor() {
  const modal = document.querySelector('.frame-editor-modal');
  if (modal && modal.currentFrame) {
    const frame = modal.currentFrame;
    const options = {
      creation: modal.dataset.creation === 'true',
      restricted: modal.dataset.restricted === 'true',
      position: modal.framePosition ? { ...modal.framePosition } : undefined
    };
    modal.remove();
    openFrameEditor(frame, options);
  }
}

function refreshFramePreviewFromForm() {
  const modal = document.querySelector('.frame-editor-modal');
  if (!modal || !modal.currentFrame) return;

  // Coleta valores dos inputs
  const frame = modal.currentFrame;
  modal.querySelectorAll('[data-attr]').forEach(el => {
    const attrKey = el.getAttribute('data-attr');
    if (el.tagName === 'SELECT') {
      frame.attributes[attrKey] = el.value;
    } else {
      frame.attributes[attrKey] = el.value;
    }
  });

  // Atualiza preview
  const previewDiv = modal.querySelector('.frame-preview');
  if (previewDiv) {
    previewDiv.innerHTML = renderFramePreview(frame);
  }
}

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = element.querySelector('.frame-editor-header');

  if (header) {
    header.onpointerdown = dragPointerDown;
  }

  function dragPointerDown(e) {
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('select')) return;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onpointerup = closeDragElement;
    document.onpointermove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onpointerup = null;
    document.onpointermove = null;
  }
}
// ================= INICIALIZAÇÃO =================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎮 RPG Map Editor v2.0 carregado!');
  console.log('✨ Pincel + Balde + Objetos Livres + Visibilidade');
  
  initSidebarResize();
  initExpandablePanels();
  initCompactToolsToggle();
  initMobileLayout();
  initTileset();
  initTools();
  initButtons();
  initCombatPanel();
  initGeneratorPanel();
  initShortcuts();
  initCanvasEvents();
  
  render();
});