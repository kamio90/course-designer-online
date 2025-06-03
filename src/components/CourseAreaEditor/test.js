import { renderCourseAreaEditor } from './index.js';
export function testCourseAreaEditor(){
  const div=document.createElement('div');
  renderCourseAreaEditor({container:div});
  if(!div.querySelector('.cae-top')) throw new Error('topbar missing');
  if(!div.querySelector('canvas')) throw new Error('canvas missing');
}
