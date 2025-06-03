import { renderLoginForm } from './index.js';

export function testLoginForm(){
  const div = document.createElement('div');
  renderLoginForm({container:div});
  if(!div.querySelector('.login-form')) throw new Error('login form not rendered');
}
