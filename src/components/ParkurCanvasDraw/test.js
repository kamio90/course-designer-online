import { renderParkurCanvasDraw } from './index.js';

export function testParkurCanvasDraw(){
  renderParkurCanvasDraw({width:100,height:100,pxPerMeter:10,points:[]});
  if(!document.querySelector('.pcd-root')) throw new Error('canvas not rendered');
  document.getElementById('main-content').innerHTML='';
}
