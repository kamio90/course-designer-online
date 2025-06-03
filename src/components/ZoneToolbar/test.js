import { ZoneToolbar } from './index.js';

export function testZoneToolbar(){
  const aside=document.createElement('aside');
  aside.id='zone-toolbar';
  document.body.appendChild(aside);
  ZoneToolbar.init();
  if(!aside.querySelector('.zone-toolbar')) throw new Error('toolbar not rendered');
  aside.remove();
}
