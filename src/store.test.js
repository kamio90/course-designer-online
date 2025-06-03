import { dispatch, getState, actions, resetStore } from './store.js';

export function testStore(){
  resetStore();
  dispatch(actions.setUser({name:'a'}, 't')); 
  if(!getState().user) throw new Error('setUser failed');
  dispatch(actions.logout());
  if(getState().user) throw new Error('logout failed');
}
