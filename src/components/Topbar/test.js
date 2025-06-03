import { renderTopbar } from './index.js';

export function testTopbar(){
  const div = document.createElement('div');
  renderTopbar({container:div});
  if(!div.querySelector('.topbar')) throw new Error('topbar not rendered');
}
