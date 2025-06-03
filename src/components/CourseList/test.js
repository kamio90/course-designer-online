import { renderCourseList } from './index.js';

export function testCourseList(){
  const div=document.createElement('div');
  renderCourseList({container:div});
  if(!div.querySelector('.course-list')) throw new Error('course list not rendered');
  if(!div.querySelector('.fab')) throw new Error('new course button missing');
}
