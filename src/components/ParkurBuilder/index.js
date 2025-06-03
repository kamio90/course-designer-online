import { CanvasGrid } from '../CanvasGrid/index.js';
import { ZoneToolbar } from '../ZoneToolbar/index.js';
import { attachBackButtonHandler, BackButton } from '../BackButton/index.js';
import { injectStyles } from './style.js';

export function renderParkurBuilder(config) {
  const root = document.getElementById('main-content');
  injectStyles();
  root.innerHTML = `
    <div class="builder-layout">
      <aside id="zone-toolbar"></aside>
      <div class="canvas-wrap">
        ${BackButton()}
        <canvas id="parkur-canvas"></canvas>
      </div>
    </div>`;
  attachBackButtonHandler(root);
  CanvasGrid.init(config);
  ZoneToolbar.init();
}
