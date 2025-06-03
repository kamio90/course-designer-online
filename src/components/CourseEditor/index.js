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
import { renderStatsPanel, updateStats } from '../StatsPanel/index.js';
import { renderHelpBox } from '../HelpBox/index.js';
import { injectStyles } from './style.js';

export function renderCourseEditor({
  container = document.getElementById('main-content'),
  width = 800,
  height = 600,
  pxPerMeter = 20,
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

  let api;
  renderTopbar({
    container: container.querySelector('.ce-top'),
    scale: pxPerMeter,
    onScaleChange: val => api.setPxPerMeter(val),
    onHelp: onHelp || (()=>renderHelpBox()),
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

  api = renderMainCanvas({
    container: container.querySelector('.ce-canvas'),
    width,
    height,
    pxPerMeter,
    onChange: stats => updateStats(container.querySelector('.ce-stats'), stats)
  });

  renderStatsPanel({
    container: container.querySelector('.ce-stats')
  });
}
