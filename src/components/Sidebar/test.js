import { renderSidebar } from './index.js';

export function testSidebar(){
  const div=document.createElement('div');
  renderSidebar({container:div});
  if(!div.querySelector('.sidebar')) throw new Error('sidebar not rendered');
}
