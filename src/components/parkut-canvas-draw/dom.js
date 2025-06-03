export function renderParkurDOM(state) {
    const root = document.getElementById('main-content');
    root.innerHTML = `
      <div class="pcd-root">
        <div class="pcd-toolbar">
          <label>
            <span>Skala:</span>
            <select id="scale-select" class="mat-input">
              <option value="2">2px / 1m</option>
              <option value="5">5px / 1m</option>
              <option value="10">10px / 1m</option>
              <option value="20" selected>20px / 1m</option>
              <option value="30">30px / 1m</option>
              <option value="40">40px / 1m</option>
            </select>
          </label>
          <label>
            <span>Szerokość [m]:</span>
            <input type="number" id="width-m-input" min="10" value="${state.width / state.pxPerMeter}" class="mat-input">
          </label>
          <label>
            <span>Wysokość [m]:</span>
            <input type="number" id="height-m-input" min="10" value="${state.height / state.pxPerMeter}" class="mat-input">
          </label>
          <button id="resize-canvas-btn" class="mat-btn mat-primary">Dopasuj</button>
          <button id="zoom-in-btn" class="mat-btn">+</button>
          <button id="zoom-out-btn" class="mat-btn">-</button>
          <button id="clear-all-btn" class="mat-btn mat-danger" title="Wyczyść wszystko">🗑️ Wyczyść</button>
          <button id="center-canvas-btn" class="mat-btn" title="Wyśrodkuj"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#1565c0" stroke-width="2"/><path d="M12 7v10M7 12h10" stroke="#1565c0" stroke-width="2" stroke-linecap="round"/></svg></button>
          <button id="show-help-btn" class="mat-btn" title="Pomoc"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#1565c0" stroke-width="2"/><text x="12" y="17" text-anchor="middle" fill="#1565c0" font-size="14" font-family="Inter" font-weight="bold">?</text></svg></button>
        </div>
        <div class="pcd-main">
          <div class="pcd-canvas-wrap">
            <canvas id="draw-canvas" width="${state.width}" height="${state.height}" class="pcd-canvas"></canvas>
            <div class="pcd-canvas-actions">
              <button id="save-shape-btn" class="mat-btn mat-primary">Zapisz parkur</button>
              <button id="export-shape-btn" class="mat-btn mat-outline">Eksportuj JSON</button>
            </div>
            <div id="canvas-hints" class="pcd-hints"></div>
          </div>
          <aside id="stats-panel" class="pcd-stats-panel">
              <button id="toggle-stats" class="mat-btn mat-mini" title="Ukryj statystyki">&lt;</button>
              <h3>Statystyki</h3>
              <div><b>Powierzchnia całkowita:</b> <span id="stat-area">–</span> m²</div>
              <div><b>Długość obwodu:</b> <span id="stat-len">–</span> m</div>
              <div><b>Liczba wierzchołków:</b> <span id="stat-pts">–</span></div>
              <div><b>Liczba krawędzi:</b> <span id="stat-edges">–</span></div>
              <div><b>Zajęty obszar:</b> <span id="stat-occ">–</span> m²</div>
          </aside>
        </div>
      </div>
    `;

    return {
        root,
        canvas: document.getElementById('draw-canvas'),
        toolbar: document.querySelector('.pcd-toolbar'),
        saveBtn: document.getElementById('save-shape-btn'),
        exportBtn: document.getElementById('export-shape-btn'),
        helpBtn: document.getElementById('show-help-btn'),
        centerBtn: document.getElementById('center-canvas-btn'),
        clearBtn: document.getElementById('clear-all-btn'),
        statsPanel: document.getElementById('stats-panel'),
        statsArea: document.getElementById('stat-area'),
        statsLen: document.getElementById('stat-len'),
        statsPts: document.getElementById('stat-pts'),
        statsEdges: document.getElementById('stat-edges'),
        statsOcc: document.getElementById('stat-occ'),
        hints: document.getElementById('canvas-hints'),
        scaleSelect: document.getElementById('scale-select'),
        widthInput: document.getElementById('width-m-input'),
        heightInput: document.getElementById('height-m-input'),
        resizeBtn: document.getElementById('resize-canvas-btn'),
        zoomInBtn: document.getElementById('zoom-in-btn'),
        zoomOutBtn: document.getElementById('zoom-out-btn'),
        toggleStatsBtn: document.getElementById('toggle-stats'),
    };
}
