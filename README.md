# 🗺️ Editor de Mapa RPG

Editor de mapas 2D para mesas de RPG, direto no navegador. Desenhe cenários **medievais** (castelos, masmorras, vilarejos) ou **modernos** (ruas, prédios, ambientes urbanos) camada por camada, com pincel, balde, objetos livres e fichas de personagens/itens — tudo em Canvas, sem instalação necessária.

## ✨ Funcionalidades

- **Ferramentas**: Pincel, Balde (preenchimento por área), Borracha, Mover, Linha (traça uma linha reta de tiles), Retângulo (contorno retangular de tiles) e Régua (mede distância em metros).
- **3 camadas independentes**: Chão e Paredes (grid) + Objetos (posicionamento livre, arrastáveis).
- **Tileset por categorias**, expansíveis/recolhíveis: Terreno, Estruturas, Objetos, Itens RPG e **🏙️ Era Moderna** (asfalto, concreto, vidro, poste, carro, banco, lixeira, computador, pistola, maleta, cone de trânsito).
- **Sistema de Molduras (fichas)**: cards de Personagem, Inimigo, NPC, Item, Baú/Tesouro e Veículo, com atributos próprios (HP/Mana com barra, raridade, dano, etc.), atributos customizados e imagem própria.
- **Sistema de Combate**: barra de HP visível direto no token do mapa, painel de iniciativa/turnos (Personagem/Inimigo/NPC) com destaque visual do combatente ativo, ajuste rápido de HP (entra no undo) e overlay de alcance de movimento em quadrados.
- **Gerador de Dungeon**: geração procedural de salas + corredores (com seed opcional para reproduzir o mesmo layout), substituindo as camadas Chão/Paredes com um clique.
- **Modo Visualização (▶️)**: "modo mestre" para navegar pelo mapa e clicar em objetos/fichas, vendo um tooltip com os atributos, sem risco de editar por engano.
- Redimensionamento de mapa, zoom (botões, `Ctrl+scroll`, `Ctrl +/-`), pan e undo (histórico de 50 passos).
- Exportar/importar mapa em **JSON** e exportar em **PNG**.
- Importar uma imagem **PNG/JPG como referência** semitransparente, para traçar o mapa por cima.
- Sidebar redimensionável (arraste a borda), com largura salva no navegador.
- Notificações via toast e diálogos de confirmação próprios da interface (nada de `alert`/`confirm` do navegador).

## 🚀 Como Rodar

**Opção 1 — Direto no navegador (recomendado):**
Abra o arquivo `index.html` duas vezes clicando nele. O editor roda 100% no lado do cliente; exportar/importar mapas (JSON/PNG) funciona sem nenhum servidor.

**Opção 2 — Servidor PHP local:**
```
php -S localhost:8080
```
Use esta opção se quiser testar os endpoints de persistência em `PHP/`.

**Opção 3 — Docker:**
```
docker compose up -d --build
```
Acesse `http://localhost:8080`.

> ⚠️ `PHP/save.php` e `PHP/load.php` implementam uma API opcional de persistência em servidor (salvar/carregar mapas por nome, gravando em `data/`), mas **ainda não estão conectados à interface** — hoje não existe um botão "Salvar no servidor". Use exportar/importar JSON para persistir seus mapas.

**Opção 4 — Deploy no Render (para jogar remotamente):**

O sistema de Salas Multiplayer (Mestre/Jogador, ver `JS/room.js`) sincroniza por HTTP — cada Jogador precisa conseguir alcançar o servidor pela internet, então `localhost` só funciona se todos estiverem na mesma máquina/rede. Para jogar com pessoas em redes diferentes, publique o projeto no [Render](https://render.com/):

1. Suba este projeto (a pasta `Gerador de mapas/`, com o `dockerfile` na raiz) para um repositório no GitHub/GitLab.
2. No Render, crie um **Blueprint** apontando para esse repositório — o `render.yaml` já presente no projeto configura o serviço automaticamente (ambiente Docker, `dockerfilePath: ./dockerfile`, plano Free).
   - Se preferir criar o Web Service manualmente (sem Blueprint), configure à mão: Environment = `Docker`, Dockerfile Path = `./dockerfile`, Docker Build Context = `.`.
3. Acesse a URL pública gerada pelo Render — ela substitui o `http://localhost:8080` para todo mundo, Mestre e Jogadores.

> ⚠️ O `render.yaml` está configurado para o **plano Free**, que não tem disco persistente nem fica sempre ativo. Na prática isso significa: tudo em `data/` (mapas salvos via `PHP/save.php` e salas em `data/rooms/`) é perdido a cada redeploy ou reinício do serviço, e a primeira requisição depois de um tempo ocioso pode demorar bem mais (o serviço "acorda"). Para uma sala persistir entre sessões e responder rápido o tempo todo, migre para um plano pago com disco persistente montado em `/var/www/html/data` — mesma imagem Docker, sem mudanças de código.

## 🕹️ Atalhos de Teclado

| Tecla | Ação |
|---|---|
| `B` | Ferramenta Pincel |
| `F` | Ferramenta Balde |
| `E` | Ferramenta Borracha |
| `M` | Ferramenta Mover |
| `L` | Ferramenta Linha |
| `G` | Ferramenta Retângulo |
| `R` | Ferramenta Régua |
| `1` / `2` / `3` | Camada Chão / Paredes / Objetos |
| `V` | Alternar Modo Visualização |
| `N` | Próximo Turno (com combate ativo) |
| `C` | Mostrar/ocultar painel de Combate |
| `Ctrl + Z` | Desfazer |
| `Ctrl` + roda do mouse | Zoom |
| `Ctrl` `+` / `Ctrl` `-` | Zoom in / out |
| `Ctrl` `0` | Resetar zoom |
| Duplo clique numa Moldura | Abrir editor da ficha |

## 🧱 Estrutura do Projeto

```
index.html          Estrutura da página (toolbar, sidebar, canvas)
CSS/style.css        Tema visual, texturas dos tiles, componentes (modais, toasts)
JS/app.js            Toda a lógica do editor (estado, ferramentas, render, export/import)
PHP/save.php         Endpoint opcional para salvar mapas no servidor (não conectado à UI)
PHP/load.php         Endpoint opcional para carregar mapas do servidor (não conectado à UI)
dockerfile           Imagem PHP + Apache servindo o projeto
docker-compose.yml   Sobe o serviço web na porta 8080, com volume persistente para data/
data/                Criado em runtime pelo backend PHP para guardar os mapas salvos
```

## 📚 Sistema de Camadas

O editor trabalha com 3 camadas independentes:

1. **Ground (Chão)** — Base do mapa (texturas de terreno).
   - Baseada em grid (posições fixas).
   - Sempre visível como fundo.

2. **Walls (Paredes)** — Estruturas e obstáculos.
   - Baseada em grid.
   - Pode ser ocultada/mostrada.

3. **Objects (Objetos)** — Itens, decoração e fichas (Molduras).
   - **Posicionamento livre** (não preso ao grid).
   - Coordenadas X/Y em pixels.
   - Arrastáveis com o mouse.
   - Pode ser ocultada/mostrada.

## 📏 Régua e Ferramentas de Forma

Essas ferramentas trabalham direto nas camadas de grid (Chão/Paredes) — não se aplicam à camada de Objetos.

- **Linha (`L`)**: clique e arraste sobre o grid para traçar uma linha reta do tile selecionado, célula a célula (ótimo para estradas, rios, muros).
- **Retângulo (`G`)**: clique e arraste para desenhar o **contorno** de um retângulo com o tile selecionado (ótimo para o perímetro de salas/construções). O interior não é preenchido.
- **Régua (`R`)**: clique e arraste para medir a distância entre dois pontos do mapa. A medida aparece em tempo real sobre o traço e some ao soltar o mouse — nada é desenhado no mapa. Cada bloco do grid vale a quantidade de metros definida no campo **"Metros por bloco"** (painel Ferramentas), então a régua converte automaticamente distância em blocos para metros.

Todas as três mostram uma prévia em tempo real enquanto você arrasta, e Linha/Retângulo entram no histórico de desfazer (`Ctrl+Z`) como uma única ação.

## 🖼️ Sistema de Molduras (Fichas)

Ao selecionar o tile "Moldura" e clicar na camada Objetos, abre-se um editor para criar uma ficha. Templates disponíveis:

| Template | Ícone | Atributos |
|---|---|---|
| Personagem | ⚔️ | Nome, Classe, Nível, HP (com máximo), Mana (com máximo), AC, Deslocamento |
| Inimigo | 💀 | Nome, Tipo, Nível, HP, AC, Dano, Deslocamento |
| NPC | 🧑 | Nome, Função, Facção, HP, Missão, Deslocamento |
| Item | 📦 | Nome, Raridade, Dano, Defesa, Peso |
| Baú/Tesouro | 🪙 | Nome, Conteúdo, Trancado (DC), Armadilha |
| Veículo | 🚗 | Nome, Tipo, Velocidade, Combustível (com máximo) |

Cada ficha ainda permite anexar uma **imagem própria** e **atributos customizados** (nome/valor livres). Em modo de edição é possível trocar o template a qualquer momento, preservando os atributos que coincidirem entre os templates. No **Modo Visualização**, clicar numa ficha no mapa mostra um tooltip com todos os seus atributos.

## ⚔️ Sistema de Combate

Qualquer Moldura cujo template tenha o atributo **HP** (Personagem, Inimigo, NPC) pode participar do combate:

- **Barra de HP no token**: desenhada direto no card do mapa, colorida por faixa (verde >60%, amarelo >30%, vermelho abaixo disso) — a mesma lógica usada no editor de ficha.
- **Iniciativa/turnos**: no editor da Moldura (duplo clique no token), informe um valor de iniciativa e clique em "Adicionar à Iniciativa". O painel lateral **⚔️ Combate** lista os participantes ordenados por iniciativa; "▶️ Iniciar" começa o combate, "⏭️ Próximo Turno" avança (e incrementa a rodada ao completar a volta), "⏹️ Encerrar" finaliza. O combatente do turno ativo ganha um contorno dourado no mapa.
- **Ajuste rápido de HP**: botões `-5/-1/+1/+5` no editor da Moldura aplicam dano/cura e entram no histórico de desfazer (`Ctrl+Z`).
- **Alcance de movimento**: Molduras de combate têm o atributo **Deslocamento** (em quadrados). O botão "Mostrar Alcance de Movimento" no editor desenha um overlay azul nas células dentro desse alcance (distância de Chebyshev, sem considerar paredes como obstáculo).
- Apagar uma Moldura remove ela automaticamente da iniciativa. O estado de combate (iniciativa/turno/rodada) é **efêmero**: não é salvo no JSON exportado e é reconciliado automaticamente após um `Ctrl+Z` (participantes cujo token não existir mais são removidos da lista).

## 🎲 Geração Procedural de Dungeon

O painel lateral **🎲 Gerador de Dungeon** cria uma dungeon com salas + corredores no mapa atual:

- **Nº de salas** e **tamanho mín./máx.** (em tiles) controlam quantas salas o algoritmo tenta posicionar (por rejection sampling, sem sobrepor) e o tamanho de cada uma.
- **Seed (opcional)**: em branco, cada geração é aleatória; preenchendo um texto/número, a mesma seed sempre reproduz o mesmo layout (útil pra recriar ou compartilhar uma dungeon).
- **Piso da sala** / **Piso do corredor**: qualquer tile de Terreno (por padrão Pedra nas salas, Terra nos corredores), para diferenciar visualmente sala de corredor.
- Cada sala é conectada à sala mais próxima já posicionada por um corredor em L, com uma Porta marcada em cada ponta de conexão. Depois, todas as células vazias adjacentes ao piso gerado recebem Parede automaticamente (silhueta da dungeon).
- **Substitui as camadas Chão e Paredes** do mapa atual — a camada de Objetos (Molduras, itens) **não é alterada**. A geração entra no histórico normal (`Ctrl+Z` desfaz tudo de uma vez) e pede confirmação antes de rodar.
- Se o número de salas pedido não couber no tamanho do mapa atual, um toast avisa quantas foram efetivamente posicionadas.

## 💾 Formato de Salvamento (JSON)

```json
{
  "width": 24,
  "height": 18,
  "tileSize": 32,
  "layers": {
    "ground": [0,1,2,3...],      // Array 1D indexado
    "walls": [0,20,21,0...],     // 0 = vazio
    "objects": [                  // Array de objetos livres
      {"tileId": 40, "x": 150, "y": 200, "w": 32, "h": 32},
      {"tileId": 60, "x": 320, "y": 180, "w": 32, "h": 32}
    ]
  },
  "layerVisibility": {
    "ground": true,
    "walls": true,
    "objects": true
  },
  "created": "2026-01-15T10:30:00Z",
  "version": "2.0"
}
```
