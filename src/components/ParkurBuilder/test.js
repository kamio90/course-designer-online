import { renderParkurBuilder } from './index.js';

export function testParkurBuilder(){
  const div=document.createElement('div');
  div.id='main-content';
  document.body.appendChild(div);
  renderParkurBuilder({mode:'rect',width:10,height:10,pxPerMeter:1});
  if(!div.querySelector('.builder-layout')) throw new Error('builder not rendered');
  div.remove();
}
