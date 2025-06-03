import { CanvasGrid } from './index.js';

export function testCanvasGrid(){
  const canvas=document.createElement('canvas');
  canvas.id='parkur-canvas';
  document.body.appendChild(canvas);
  CanvasGrid.init({mode:'rect',width:10,height:10,pxPerMeter:1});
  if(canvas.width===0) throw new Error('canvas not initialized');
  canvas.remove();
}
