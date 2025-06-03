import { renderStatsPanel } from './index.js';

export function testStatsPanel(){
  const div=document.createElement('div');
  renderStatsPanel({container:div});
  if(!div.querySelector('.stats-panel')) throw new Error('stats panel not rendered');
}
