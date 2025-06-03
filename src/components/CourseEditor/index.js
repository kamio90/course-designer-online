/**
 * CourseEditor view component
 * Composes Topbar, ObstacleToolbox, MainCanvas and StatsPanel.
 * Props:
 *   container - element to render into (defaults to #main-content)
 *   width, height - canvas size
 */
import { renderTopbar } from '../Topbar/index.js';
import { renderObstacleToolbox } from '../ObstacleToolbox/index.js';
import { renderMainCanvas } from '../MainCanvas/index.js';
import { renderStatsPanel } from '../StatsPanel/index.js';
import { injectStyles } from './style.js';

export function renderCourseEditor({
  container = document.getElementById('main-content'),
  width = 800,
  height = 600,
  obstacles = [],
  onHelp,
  onCenter,
  onZoomIn,
  onZoomOut,
  onClear,
  onUndo,
  onRedo,
  onSelectObstacle
} = {}){
  if(!container) throw new Error('container required');
  injectStyles();
  container.innerHTML=`
    <div class="ce-root">
      <div class="ce-top"></div>
      <div class="ce-main">
        <div class="ce-toolbox"></div>
        <div class="ce-canvas"></div>
        <div class="ce-stats"></div>
      </div>
    </div>`;

  renderTopbar({
    container: container.querySelector('.ce-top'),
    onHelp,
    onCenter,
    onZoomIn,
    onZoomOut,
    onClear,
    onUndo,
    onRedo
  });

  renderObstacleToolbox({
    container: container.querySelector('.ce-toolbox'),
    obstacles,
    onSelect: onSelectObstacle
  });

  renderMainCanvas({
    container: container.querySelector('.ce-canvas'),
    width,
    height
  });

  renderStatsPanel({
    container: container.querySelector('.ce-stats')
  });
}
