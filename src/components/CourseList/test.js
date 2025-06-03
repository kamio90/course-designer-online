import { renderCourseList } from './index.js';

export function testCourseList(){
  const div=document.createElement('div');
  let clicked=false;
  renderCourseList({container:div,onNew:()=>{clicked=true;}});
  if(!div.querySelector('.course-list')) throw new Error('course list not rendered');
  const btn=div.querySelector('.fab');
  if(!btn) throw new Error('new course button missing');
  btn.dispatchEvent(new div.ownerDocument.defaultView.Event('click',{bubbles:true}));
  if(!clicked) throw new Error('new course button not firing');
}
