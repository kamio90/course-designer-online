import { renderCourseEditor } from './index.js';
export function testCourseEditor(){
  const div=document.createElement('div');
  renderCourseEditor({container:div});
  if(!div.querySelector('.ce-toolbox')) throw new Error('toolbox missing');
  if(!div.querySelector('canvas')) throw new Error('canvas missing');
}
