import { renderNewProjectForm } from './index.js';

export function testNewProjectForm(){
  const div=document.createElement('div');
  div.id='main-content';
  document.body.appendChild(div);
  renderNewProjectForm({onSubmit:()=>{}});
  if(!div.querySelector('.new-parkur-form')) throw new Error('form not rendered');
  div.remove();
}
