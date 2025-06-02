import {CanvasGrid} from './CanvasGrid.js';
import {ZoneToolbar} from './ZoneToolbar.js';
import {goBack} from '../router.js';

export function renderParkurBuilder(config) {
    const root = document.getElementById('main-content');
    root.innerHTML = `
      <div class="builder-layout">
        <aside id="zone-toolbar"></aside>
        <div class="canvas-wrap">
          <button type="button" id="back-btn" style="margin-bottom:10px;position:absolute;z-index:10;">&larr; Wróć</button>
          <canvas id="parkur-canvas"></canvas>
        </div>
      </div>
    `;
    document.getElementById('back-btn').onclick = () => goBack();
    CanvasGrid.init(config);
    ZoneToolbar.init();
}
