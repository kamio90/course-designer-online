/**
 * CourseAreaEditor view component
 * Composes Topbar, Sidebar, MainCanvas and StatsPanel.
 */
import { renderTopbar } from '../Topbar/index.js';
import { renderSidebar } from '../Sidebar/index.js';
import { renderMainCanvas } from '../MainCanvas/index.js';
import { renderStatsPanel, updateStats } from '../StatsPanel/index.js';
import { injectStyles } from './style.js';

export function renderCourseAreaEditor({
  container = document.getElementById('main-content'),
  width = 800,
  height = 600
} = {}) {
  if(!container) throw new Error('container required');
  injectStyles();
  container.innerHTML=`
    <div class="cae-root">
      <div class="cae-top"></div>
      <div class="cae-main">
        <div class="cae-sidebar"></div>
        <div class="cae-canvas"></div>
        <div class="cae-stats"></div>
      </div>
    </div>`;

  const api=renderMainCanvas({
    container: container.querySelector('.cae-canvas'),
    width,
    height,
    onChange: stats => updateStats(container.querySelector('.cae-stats'), stats)
  });

  const sidebarApi=renderSidebar({
    container: container.querySelector('.cae-sidebar'),
    onAccept: ()=>{ api.acceptArea(); sidebarApi.setMode('static'); sidebarApi.setAcceptEnabled(false); },
    onBack: ()=>{ api.editArea(); sidebarApi.setMode('area'); },
    onAddStatic: type => api.setObjectType(type)
  });

  renderTopbar({
    container: container.querySelector('.cae-top'),
    onZoomIn: ()=>api.zoomIn(),
    onZoomOut: ()=>api.zoomOut(),
    onCenter: ()=>api.center(),
    onClear: ()=>{ api.clear(); sidebarApi.setAcceptEnabled(false); sidebarApi.setMode('area'); },
    onUndo: ()=>api.undo(),
    onRedo: ()=>api.redo()
  });

  renderStatsPanel({ container: container.querySelector('.cae-stats') });

  api.onChange(() => {
    sidebarApi.setAcceptEnabled(api.getMode()==='area' && api.isClosed());
  });

  sidebarApi.setAcceptEnabled(false);
}
