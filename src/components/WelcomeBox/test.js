import { renderWelcomeBox } from './index.js';

export function testWelcomeBox(){
  const div=document.createElement('div');
  div.id='main-content';
  document.body.appendChild(div);
  renderWelcomeBox();
  if(!div.querySelector('.welcome-box')) throw new Error('welcome box not rendered');
  div.remove();
}
