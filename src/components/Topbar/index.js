/**
 * Topbar component
 * Renders main toolbar with controls for the editor.
 * Props: container - HTMLElement where toolbar should render
 *   onHelp, onCenter, onZoomIn, onZoomOut, onClear, onUndo, onRedo - callbacks
 */
import { t } from '../../i18n.js';
import { injectStyles } from './style.js';

export function renderTopbar({
  container,
  onHelp,
  onCenter,
  onZoomIn,
  onZoomOut,
  onClear,
  onUndo,
  onRedo
} = {}) {
  if (!container) throw new Error('container required');
  injectStyles();
  container.innerHTML = `
    <div class="topbar" role="toolbar">
      <button id="tb-help" aria-label="${t('topbar.help')}">?</button>
      <button id="tb-center" aria-label="${t('topbar.center')}">&#9673;</button>
      <button id="tb-zoom-in" aria-label="${t('topbar.zoomIn')}">+</button>
      <button id="tb-zoom-out" aria-label="${t('topbar.zoomOut')}">-</button>
      <button id="tb-clear" aria-label="${t('topbar.clear')}">&#128465;</button>
      <button id="tb-undo" aria-label="${t('topbar.undo')}">&#8630;</button>
      <button id="tb-redo" aria-label="${t('topbar.redo')}">&#8631;</button>
    </div>
  `;
  const q = id => container.querySelector(id);
  if (onHelp) q('#tb-help').onclick = onHelp;
  if (onCenter) q('#tb-center').onclick = onCenter;
  if (onZoomIn) q('#tb-zoom-in').onclick = onZoomIn;
  if (onZoomOut) q('#tb-zoom-out').onclick = onZoomOut;
  if (onClear) q('#tb-clear').onclick = onClear;
  if (onUndo) q('#tb-undo').onclick = onUndo;
  if (onRedo) q('#tb-redo').onclick = onRedo;
}
