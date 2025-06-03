import { renderUserBar } from './index.js';
import { dispatch, actions } from '../../store.js';

export function testUserBar(){
  const div=document.createElement('div');
  dispatch(actions.setUser({username:'Test'}, 't'));
  renderUserBar({container:div});
  if(!div.querySelector('.user-bar')) throw new Error('user bar not rendered');
}
