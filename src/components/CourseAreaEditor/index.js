/**
 * CourseAreaEditor view component
 * Composes Topbar, Sidebar, MainCanvas and StatsPanel to edit the course area.
 * Props:
 *   container - DOM element to render into (defaults to #main-content)
 *   width, height - canvas dimensions in pixels
 *   callbacks passed to Topbar/Sidebar events
 */
import { renderTopbar } from '../Topbar/index.js';
import { renderSidebar } from '../Sidebar/index.js';
import { renderMainCanvas } from '../MainCanvas/index.js';
import { renderStatsPanel } from '../StatsPanel/index.js';
import { injectStyles } from './style.js';

export function renderCourseAreaEditor({
  container = document.getElementById('main-content'),
  width = 800,
  height = 600,
  onHelp,
  onCenter,
  onZoomIn,
  onZoomOut,
  onClear,
  onUndo,
  onRedo,
  onAcceptArea,
  onBack
} = {}) {
  if (!container) throw new Error('container required');
  injectStyles();
  container.innerHTML = `
    <div class="cae-root">
      <div class="cae-top"></div>
      <div class="cae-main">
        <div class="cae-sidebar"></div>
        <div class="cae-canvas"></div>
        <div class="cae-stats"></div>
      </div>
    </div>`;

  renderTopbar({
    container: container.querySelector('.cae-top'),
    onHelp,
    onCenter,
    onZoomIn,
    onZoomOut,
    onClear,
    onUndo,
    onRedo
  });

  renderSidebar({
    container: container.querySelector('.cae-sidebar'),
    onAccept: onAcceptArea,
    onBack
  });

  renderMainCanvas({
    container: container.querySelector('.cae-canvas'),
    width,
    height
  });

  renderStatsPanel({
    container: container.querySelector('.cae-stats')
  });
}
