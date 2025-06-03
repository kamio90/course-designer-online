import { renderHelpBox } from './index.js';

export function testHelpBox(){
  const div=document.createElement('div');
  div.id='main-content';
  document.body.appendChild(div);
  renderHelpBox();
  if(!document.getElementById('helpbox')) throw new Error('helpbox not rendered');
  document.getElementById('helpbox').remove();
  div.remove();
}
