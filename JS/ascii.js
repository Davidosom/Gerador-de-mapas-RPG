/**
 * Sistema de Importação, Exportação e Moldes de Mapas em ASCII / Unicode
 * Editor de Mapa RPG
 */
const asciiSystem = {
  // Biblioteca de moldes pré-configurados
  templates: [
    {
      id: 'single-cell',
      name: 'Sala Mínima (1 espaço)',
      category: 'Salas Básicas',
      desc: 'Sala mínima 3×3 com exatamente 1 célula livre no interior e porta.',
      w: 3,
      h: 3,
      ascii: [
        '###',
        '#.#',
        '#+#'
      ].join('\n')
    },
    {
      id: 'small-room',
      name: 'Sala Pequena (3×3 interno)',
      category: 'Salas Básicas',
      desc: 'Sala quadrada compacta 5×5 com 3×3 de piso livre e entrada frontal.',
      w: 5,
      h: 5,
      ascii: [
        '#####',
        '#...#',
        '#...#',
        '#...#',
        '##+##'
      ].join('\n')
    },
    {
      id: 'medium-room-chest',
      name: 'Sala Média com Baú (5×3 interno)',
      category: 'Salas Básicas',
      desc: 'Sala retangular 7×5 com baú de tesouro ao centro.',
      w: 7,
      h: 5,
      ascii: [
        '#######',
        '#.....#',
        '#..$..#',
        '#.....#',
        '###+###'
      ].join('\n')
    },
    {
      id: 'hall-of-pillars',
      name: 'Salão Nobre com Pilares',
      category: 'Salões & Conexões',
      desc: 'Salão imponente 13×7 com pilares ornamentados espaçados e token de herói.',
      w: 13,
      h: 7,
      ascii: [
        '#############',
        '#...........#',
        '#.O...O...O.#',
        '#...........#',
        '#.O...O...O.#',
        '#.....@.....#',
        '######+######'
      ].join('\n')
    },
    {
      id: 'l-shaped-room',
      name: 'Sala em "L"',
      category: 'Salões & Conexões',
      desc: 'Aposento em formato de "L" conectando duas alas.',
      w: 9,
      h: 8,
      ascii: [
        '#########',
        '#.......#',
        '#.......#',
        '#...#####',
        '#...#',
        '#...#',
        '#...#',
        '##+##'
      ].join('\n')
    },
    {
      id: 'complete-dungeon',
      name: 'Masmorra Completa com Corredores',
      category: 'Masmorras & Cavernas',
      desc: '3 salas completas interligadas por corredores estreitos, portas, herói, monstros e baú.',
      w: 27,
      h: 12,
      ascii: [
        '#########         #########',
        '#.......#         #.......#',
        '#...@...#         #...$...#',
        '#.......#         #...M...#',
        '####+####         ####+####',
        '    #                 #    ',
        '    #    #########    #    ',
        '    #    #.......#    #    ',
        '    #####+.......+#####    ',
        '         #...E...#         ',
        '         #.......#         ',
        '         #########         '
      ].join('\n')
    },
    {
      id: 'organic-cave',
      name: 'Caverna Orgânica com Lago',
      category: 'Masmorras & Cavernas',
      desc: 'Layout natural com lago central, passagens estreitas e antecâmara.',
      w: 23,
      h: 12,
      ascii: [
        '  #######     #######  ',
        ' ##.....#######.....## ',
        '##.......#...#.......##',
        '#.........~.~.........#',
        '##.......#...#.......##',
        ' ##.....#######.....## ',
        '  #####   #   #####    ',
        '          #            ',
        '      ####+####        ',
        '      #.......#        ',
        '      #...@...#        ',
        '      #########        '
      ].join('\n')
    },
    {
      id: 'combat-arena',
      name: 'Arena de Combate',
      category: 'Salões & Conexões',
      desc: 'Arena circular com 4 colunas de cobertura e múltiplos inimigos ao redor do herói.',
      w: 15,
      h: 9,
      ascii: [
        '###############',
        '#.............#',
        '#.O.........O.#',
        '#....M...M....#',
        '#......@......#',
        '#....M...M....#',
        '#.O.........O.#',
        '#.............#',
        '#######+#######'
      ].join('\n')
    }
  ],

  // Normaliza o texto ASCII em linhas limpas
  parseLines(rawText) {
    if (!rawText) return [];
    let lines = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    
    // Remove linhas vazias do início e do fim, mantendo a estrutura interna
    while (lines.length > 0 && lines[0].trim() === '') {
      lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      lines.pop();
    }
    return lines;
  },

  // Calcula as dimensões (largura máxima e altura) de um texto ASCII
  getDimensions(asciiText) {
    const lines = this.parseLines(asciiText);
    if (lines.length === 0) return { w: 0, h: 0, lines: [] };
    const w = Math.max(...lines.map(l => l.length));
    const h = lines.length;
    return { w, h, lines };
  },

  /**
   * Importa o mapa ASCII aplicando as alterações no canvas e sincronizando estado
   */
  importAsciiToMap(asciiText, options = {}) {
    if (typeof Room !== 'undefined' && !Room.canEditLayers()) {
      toast('Apenas o Mestre pode importar mapas.', 'warning');
      return false;
    }

    const { w, h, lines } = this.getDimensions(asciiText);
    if (w === 0 || h === 0) {
      toast('Nenhum texto ASCII válido foi inserido.', 'warning');
      return false;
    }

    const floorTileId = parseInt(options.floorTileId, 10) || 3; // Pedra por padrão
    const autoResize = options.autoResize !== false;
    const clearObjects = options.clearObjects !== false;
    const spaceAsFloor = Boolean(options.spaceAsFloor);

    // Redimensiona o mapa se solicitado e as dimensões diferirem
    if (autoResize && (w !== CONFIG.mapWidth || h !== CONFIG.mapHeight)) {
      resizeMap(w, h);
    } else {
      saveHistory();
    }

    // Limpa objetos anteriores se solicitado
    if (clearObjects) {
      const removedObjects = [...state.objects];
      state.objects = [];
      state.selectedObjectIds.clear();
      state.rangeOverlay = null;
      if (typeof combatSystem !== 'undefined') combatSystem.pruneInvalid();
      if (typeof Room !== 'undefined' && Room.active) {
        removedObjects.forEach(obj => Room.syncObjectRemove(obj.id));
      }
    }

    const targetW = CONFIG.mapWidth;
    const targetH = CONFIG.mapHeight;

    // Converte os caracteres nas camadas correspondentes
    for (let y = 0; y < Math.min(h, targetH); y++) {
      const line = lines[y] || '';
      for (let x = 0; x < Math.min(w, targetW); x++) {
        const char = line[x] || ' ';
        const idx = y * targetW + x;

        let groundId = 0;
        let wallId = 0;
        let createEntity = null; // 'chest', 'hero', 'enemy'

        // Mapeamento de Chão e Terreno
        if (char === '~') {
          groundId = 7; // Água
        } else if (char === '!') {
          groundId = 8; // Lava
        } else if (char === ' ') {
          groundId = spaceAsFloor ? floorTileId : 0;
        } else {
          // Qualquer célula com conteúdo (parede, chão, porta, objeto) ganha o piso escolhido
          groundId = floorTileId;
        }

        // Mapeamento de Paredes e Estruturas
        const isWallChar = /[#█■▓\-|┌┐└┘─│├┤┬┴┼╔╗╚╝═║╠╣╦╩╬]/.test(char);
        if (isWallChar) {
          wallId = 20; // Parede
        } else if (char === '+' || char === 'D' || char === 'd') {
          wallId = 23; // Porta
        } else if (char === 'O' || char === '0') {
          wallId = 30; // Coluna/Pilar
        } else if (char === '>' || char === '<') {
          wallId = 25; // Escada
        } else if (char === '^') {
          wallId = 28; // Entulho
        }

        // Mapeamento de Objetos e Tokens livres
        if (char === '$' || char === '*') {
          createEntity = 'chest';
        } else if (char === '@') {
          createEntity = 'hero';
        } else if (char === 'M' || char === 'E' || char === 'm' || char === 'e') {
          createEntity = 'enemy';
        }

        // Aplica nas camadas
        state.layers.ground[idx] = groundId;
        state.layers.walls[idx] = wallId;

        // Criação de entidades / molduras
        if (createEntity) {
          const cx = (x + 0.5) * CONFIG.tileSize;
          const cy = (y + 0.5) * CONFIG.tileSize;

          if (createEntity === 'chest') {
            const chestObj = {
              id: generateObjectId('obj'),
              tileId: 40, // Baú
              x: x * CONFIG.tileSize,
              y: y * CONFIG.tileSize,
              w: CONFIG.tileSize,
              h: CONFIG.tileSize
            };
            state.objects.push(chestObj);
            if (typeof Room !== 'undefined' && Room.active) Room.syncObjectAdd(chestObj);
          } else if (createEntity === 'hero') {
            if (typeof frameSystem !== 'undefined') {
              const frame = frameSystem.createFrame(
                Math.round(cx - 28),
                Math.round(cy - 28),
                'Personagem',
                { Nome: 'Herói', Classe: 'Aventureiro', HP: '100', AC: '12', Deslocamento: '6', Visao: '8' },
                null, [], [], 56, 56
              );
              frame.minimized = true;
              frame._expandedW = 140;
              frame._expandedH = 180;
            }
          } else if (createEntity === 'enemy') {
            if (typeof frameSystem !== 'undefined') {
              const frame = frameSystem.createFrame(
                Math.round(cx - 28),
                Math.round(cy - 28),
                'Inimigo',
                { Nome: (char === 'M' || char === 'm') ? 'Monstro' : 'Inimigo', Tipo: 'Criatura', HP: '40', AC: '10', Dano: '1d6+2', Deslocamento: '6' },
                null, [], [], 56, 56
              );
              frame.minimized = true;
              frame._expandedW = 140;
              frame._expandedH = 180;
            }
          }
        }
      }
    }

    render();
    if (typeof Room !== 'undefined' && Room.active) {
      Room.syncLayers();
      Room.syncFullState();
    }

    toast(`Mapa ASCII importado com sucesso! (${w}×${h} blocos)`, 'success');
    return true;
  },

  /**
   * Exporta o mapa atual em formato de texto (ASCII ou Unicode)
   */
  exportMapToAscii(options = {}) {
    const format = options.format || 'classic'; // 'classic', 'unicode-blocks', 'unicode-box'
    const trim = Boolean(options.trim);

    const w = CONFIG.mapWidth;
    const h = CONFIG.mapHeight;
    const grid = [];

    // Helper pra identificar se uma célula contém parede (para conexões box-drawing)
    const isWallAt = (gx, gy) => {
      if (gx < 0 || gx >= w || gy < 0 || gy >= h) return false;
      const idx = gy * w + gx;
      const wid = state.layers.walls[idx];
      return wid !== 0 && wid !== 23 && wid !== 30 && wid !== 25; // paredes normais
    };

    // Mapeamento dos objetos por posição (gridX, gridY)
    const objectMap = new Map();
    state.objects.forEach(obj => {
      const gx = Math.floor((obj.x + obj.w / 2) / CONFIG.tileSize);
      const gy = Math.floor((obj.y + obj.h / 2) / CONFIG.tileSize);
      const key = `${gx},${gy}`;
      if (!objectMap.has(key)) {
        if (obj.type === 'frame') {
          if (obj.template === 'Personagem') objectMap.set(key, '@');
          else if (obj.template === 'Inimigo') objectMap.set(key, 'M');
          else if (obj.template === 'Baú/Tesouro') objectMap.set(key, '$');
          else objectMap.set(key, 'O');
        } else if (obj.tileId === 40) {
          objectMap.set(key, '$'); // Baú
        } else {
          objectMap.set(key, '*');
        }
      }
    });

    for (let y = 0; y < h; y++) {
      let row = [];
      for (let x = 0; x < w; x++) {
        const idx = y * w + x;
        const objChar = objectMap.get(`${x},${y}`);

        if (objChar) {
          row.push(objChar);
          continue;
        }

        const wallId = state.layers.walls[idx];
        const groundId = state.layers.ground[idx];

        if (wallId !== 0) {
          if (wallId === 23) {
            row.push(format === 'unicode-blocks' ? '▯' : '+'); // Porta
          } else if (wallId === 30) {
            row.push(format === 'unicode-box' ? '○' : 'O'); // Coluna
          } else if (wallId === 25) {
            row.push('>'); // Escada
          } else if (wallId === 28) {
            row.push('^'); // Entulho
          } else {
            // Parede
            if (format === 'unicode-blocks') {
              row.push('█');
            } else if (format === 'unicode-box') {
              const north = isWallAt(x, y - 1);
              const south = isWallAt(x, y + 1);
              const west = isWallAt(x - 1, y);
              const east = isWallAt(x + 1, y);

              if (north && south && west && east) row.push('┼');
              else if (west && east && south) row.push('┬');
              else if (west && east && north) row.push('┴');
              else if (north && south && east) row.push('├');
              else if (north && south && west) row.push('┤');
              else if (south && east) row.push('┌');
              else if (south && west) row.push('┐');
              else if (north && east) row.push('└');
              else if (north && west) row.push('┘');
              else if (north || south) row.push('│');
              else if (west || east) row.push('─');
              else row.push('■');
            } else {
              row.push('#');
            }
          }
        } else if (groundId !== 0) {
          if (groundId === 7) row.push('~'); // Água
          else if (groundId === 8) row.push('!'); // Lava
          else {
            row.push(format === 'unicode-blocks' ? '░' : '.'); // Chão
          }
        } else {
          row.push(' '); // Vazio
        }
      }
      grid.push(row);
    }

    if (!trim) {
      return grid.map(r => r.join('')).join('\n');
    }

    // Trim de linhas e colunas vazias
    let minX = w, maxX = 0, minY = h, maxY = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (grid[y][x] !== ' ') {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (minX > maxX || minY > maxY) return '';

    return grid
      .slice(minY, maxY + 1)
      .map(r => r.slice(minX, maxX + 1).join(''))
      .join('\n');
  },

  /**
   * Exibe o modal principal com abas (Importar, Exportar, Moldes)
   */
  showModal(initialTab = 'import') {
    document.querySelector('.ascii-modal')?.remove();

    const modal = document.createElement('div');
    modal.className = 'ascii-modal';

    // Opções de piso do tileset
    const terrainOptions = (CONFIG.tileCategories['🌿 Terreno'] || [])
      .filter(t => t.id !== 0)
      .map(t => `<option value="${t.id}" ${t.id === 3 ? 'selected' : ''}>${t.name}</option>`)
      .join('');

    modal.innerHTML = `
      <div class="ascii-modal-content">
        <div class="ascii-modal-header">
          <h3>🔤 Sistema de Mapas ASCII & Moldes</h3>
          <button type="button" class="close-btn" data-close="true" title="Fechar">✕</button>
        </div>

        <div class="ascii-tabs">
          <button type="button" class="ascii-tab-btn ${initialTab === 'import' ? 'active' : ''}" data-tab="import">📥 Importar</button>
          <button type="button" class="ascii-tab-btn ${initialTab === 'templates' ? 'active' : ''}" data-tab="templates">🏰 Moldes de Salas</button>
          <button type="button" class="ascii-tab-btn ${initialTab === 'export' ? 'active' : ''}" data-tab="export">📤 Exportar</button>
        </div>

        <div class="ascii-modal-body">
          <!-- ABA IMPORTAR -->
          <div class="ascii-tab-pane ${initialTab === 'import' ? 'active' : ''}" id="asciiPaneImport">
            <div class="ascii-toolbar-row">
              <label>
                ⚡ Inserir molde rápido:
                <select id="asciiQuickTemplateSelect">
                  <option value="">-- Escolha um molde para preencher --</option>
                  ${this.templates.map(t => `<option value="${t.id}">${t.name} (${t.w}×${t.h})</option>`).join('')}
                </select>
              </label>
              <button type="button" id="asciiClearTextBtn" class="btn-secondary btn-small">🧹 Limpar</button>
            </div>

            <textarea id="asciiImportInput" class="ascii-textarea" placeholder="Cole ou desenhe seu mapa em texto aqui...&#10;&#10;Exemplo:&#10;#####&#10;#...#&#10;#.@.#&#10;##+##" spellcheck="false"></textarea>

            <div class="ascii-options-bar">
              <label title="Piso atribuído aos pontos '.' do mapa">
                <span>Piso padrão:</span>
                <select id="asciiFloorSelect">${terrainOptions}</select>
              </label>
              <label title="Espaços em branco serão vazios (0) ou piso">
                <span>Espaços ' ':</span>
                <select id="asciiSpaceSelect">
                  <option value="void">Vazio (sem piso)</option>
                  <option value="floor">Preencher com piso</option>
                </select>
              </label>
              <label class="ascii-checkbox-label" title="Ajusta o tamanho do mapa caso o texto seja maior ou menor">
                <input type="checkbox" id="asciiAutoResizeCheck" checked>
                <span>Redimensionar mapa automaticamente</span>
              </label>
              <label class="ascii-checkbox-label" title="Remove os objetos existentes antes de carregar o mapa">
                <input type="checkbox" id="asciiClearObjectsCheck" checked>
                <span>Limpar objetos atuais</span>
              </label>
            </div>

            <div class="ascii-legend">
              <strong>Legenda:</strong>
              <code>#</code> Parede &nbsp;|&nbsp;
              <code>.</code> Chão &nbsp;|&nbsp;
              <code>+</code> Porta &nbsp;|&nbsp;
              <code>O</code> Coluna &nbsp;|&nbsp;
              <code>&gt;</code> Escada &nbsp;|&nbsp;
              <code>~</code> Água &nbsp;|&nbsp;
              <code>$</code> Baú &nbsp;|&nbsp;
              <code>@</code> Herói &nbsp;|&nbsp;
              <code>M</code> Inimigo
            </div>

            <div class="ascii-actions">
              <button type="button" id="asciiRunImportBtn" class="btn-primary">🚀 Importar para o Editor</button>
              <button type="button" class="btn-secondary" data-close="true">Cancelar</button>
            </div>
          </div>

          <!-- ABA MOLDES -->
          <div class="ascii-tab-pane ${initialTab === 'templates' ? 'active' : ''}" id="asciiPaneTemplates">
            <p class="ascii-templates-desc">
              Selecione um molde de sala abaixo para aplicar diretamente ao editor ou carregar no importador para personalização:
            </p>
            <div class="ascii-templates-grid">
              ${this.templates.map(t => `
                <div class="ascii-template-card" data-template-id="${t.id}">
                  <div class="ascii-template-card-header">
                    <h4>${t.name}</h4>
                    <span class="ascii-dim-badge">${t.w}×${t.h}</span>
                  </div>
                  <p class="ascii-template-desc">${t.desc}</p>
                  <pre class="ascii-template-preview">${t.ascii}</pre>
                  <div class="ascii-template-actions">
                    <button type="button" class="btn-primary btn-small" data-action="load" data-id="${t.id}">🚀 Carregar no Editor</button>
                    <button type="button" class="btn-secondary btn-small" data-action="edit" data-id="${t.id}">✏️ Editar</button>
                    <button type="button" class="btn-secondary btn-small" data-action="copy" data-id="${t.id}">📋 Copiar</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- ABA EXPORTAR -->
          <div class="ascii-tab-pane ${initialTab === 'export' ? 'active' : ''}" id="asciiPaneExport">
            <div class="ascii-options-bar">
              <label>
                <span>Estilo de Exportação:</span>
                <select id="asciiExportFormatSelect">
                  <option value="classic">ASCII Clássico (#, ., +, @, M, $)</option>
                  <option value="unicode-box">Unicode Box-Drawing (┌─┐, │, └─┘)</option>
                  <option value="unicode-blocks">Unicode Blocos (█, ░, ▯)</option>
                </select>
              </label>
              <label class="ascii-checkbox-label" title="Remove linhas e colunas vazias ao redor do mapa">
                <input type="checkbox" id="asciiExportTrimCheck">
                <span>Cortar bordas vazias (Trim)</span>
              </label>
            </div>

            <textarea id="asciiExportOutput" class="ascii-textarea" readonly spellcheck="false"></textarea>

            <div class="ascii-actions">
              <button type="button" id="asciiCopyExportBtn" class="btn-primary">📋 Copiar para Área de Transferência</button>
              <button type="button" id="asciiDownloadExportBtn" class="btn-secondary">💾 Baixar como .txt</button>
              <button type="button" class="btn-secondary" data-close="true">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Fechamento
    const closeModal = () => {
      modal.remove();
    };

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    modal.querySelectorAll('[data-close="true"]').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', handleKeyDown);
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Alternância de Abas
    const tabs = modal.querySelectorAll('.ascii-tab-btn');
    const panes = modal.querySelectorAll('.ascii-tab-pane');

    const switchTab = (tabName) => {
      tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
      panes.forEach(p => p.classList.toggle('active', p.id === `asciiPane${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`));
      if (tabName === 'export') {
        refreshExport();
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Quick template selector na aba de importação
    const quickSelect = modal.querySelector('#asciiQuickTemplateSelect');
    const importInput = modal.querySelector('#asciiImportInput');
    const clearBtn = modal.querySelector('#asciiClearTextBtn');

    quickSelect.addEventListener('change', () => {
      const tmpl = this.templates.find(t => t.id === quickSelect.value);
      if (tmpl) {
        importInput.value = tmpl.ascii;
      }
    });

    clearBtn.addEventListener('click', () => {
      importInput.value = '';
      quickSelect.value = '';
      importInput.focus();
    });

    // Botão Importar
    modal.querySelector('#asciiRunImportBtn').addEventListener('click', () => {
      const text = importInput.value;
      const floorId = modal.querySelector('#asciiFloorSelect').value;
      const spaceAsFloor = modal.querySelector('#asciiSpaceSelect').value === 'floor';
      const autoResize = modal.querySelector('#asciiAutoResizeCheck').checked;
      const clearObjects = modal.querySelector('#asciiClearObjectsCheck').checked;

      const ok = this.importAsciiToMap(text, {
        floorTileId: floorId,
        spaceAsFloor,
        autoResize,
        clearObjects
      });

      if (ok) closeModal();
    });

    // Ações dos Cards de Moldes
    modal.querySelector('#asciiPaneTemplates').addEventListener('click', async (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      const tmpl = this.templates.find(t => t.id === id);
      if (!tmpl) return;

      if (action === 'load') {
        const floorId = modal.querySelector('#asciiFloorSelect')?.value || 3;
        const ok = this.importAsciiToMap(tmpl.ascii, {
          floorTileId: floorId,
          autoResize: true,
          clearObjects: true
        });
        if (ok) closeModal();
      } else if (action === 'edit') {
        importInput.value = tmpl.ascii;
        quickSelect.value = tmpl.id;
        switchTab('import');
      } else if (action === 'copy') {
        try {
          await navigator.clipboard.writeText(tmpl.ascii);
          toast(`Molde "${tmpl.name}" copiado com sucesso!`, 'success');
        } catch (err) {
          toast('Não foi possível copiar para a área de transferência.', 'error');
        }
      }
    });

    // Gerador / Atualizador de Exportação
    const exportOutput = modal.querySelector('#asciiExportOutput');
    const formatSelect = modal.querySelector('#asciiExportFormatSelect');
    const trimCheck = modal.querySelector('#asciiExportTrimCheck');

    const refreshExport = () => {
      const text = this.exportMapToAscii({
        format: formatSelect.value,
        trim: trimCheck.checked
      });
      exportOutput.value = text;
    };

    formatSelect.addEventListener('change', refreshExport);
    trimCheck.addEventListener('change', refreshExport);

    modal.querySelector('#asciiCopyExportBtn').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(exportOutput.value);
        toast('Mapa ASCII copiado para a área de transferência!', 'success');
      } catch (err) {
        toast('Não foi possível copiar para a área de transferência.', 'error');
      }
    });

    modal.querySelector('#asciiDownloadExportBtn').addEventListener('click', () => {
      const content = exportOutput.value;
      if (!content) {
        toast('Mapa vazio.', 'warning');
        return;
      }
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mapa_rpg_${CONFIG.mapWidth}x${CONFIG.mapHeight}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast('Download do arquivo .txt iniciado!', 'success');
    });

    if (initialTab === 'export') {
      refreshExport();
    }
  }
};

