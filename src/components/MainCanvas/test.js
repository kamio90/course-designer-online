import { renderMainCanvas } from './index.js';

export function testMainCanvas(){
  const div=document.createElement('div');
  const canvas=renderMainCanvas({container:div,width:100,height:100});
  if(!(canvas instanceof HTMLCanvasElement)) throw new Error('canvas not created');
}
