import { renderRegisterForm } from './index.js';

export function testRegisterForm(){
  const div = document.createElement('div');
  renderRegisterForm({container:div});
  if(!div.querySelector('.register-form')) throw new Error('register form not rendered');
}
