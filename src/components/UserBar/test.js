import { renderUserBar } from './index.js';

export function testUserBar(){
  const div=document.createElement('div');
  renderUserBar({container:div});
  if(!div.querySelector('.user-bar')) throw new Error('user bar not rendered');
  if(!div.querySelector('.ub-avatar')) throw new Error('avatar missing');
}
