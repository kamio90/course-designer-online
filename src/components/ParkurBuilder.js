import {CanvasGrid} from './CanvasGrid.js';
import {ZoneToolbar} from './ZoneToolbar.js';
import {attachBackButtonHandler, BackButton} from './BackButton.js';

export function renderParkurBuilder(config) {
    const root = document.getElementById('main-content');
    root.innerHTML = `
      <div class="builder-layout">
        <aside id="zone-toolbar"></aside>
        <div class="canvas-wrap" style="position:relative;">
          ${BackButton()}
          <canvas id="parkur-canvas"></canvas>
        </div>
      </div>
    `;
    attachBackButtonHandler(root);
    CanvasGrid.init(config);
    ZoneToolbar.init();
}
