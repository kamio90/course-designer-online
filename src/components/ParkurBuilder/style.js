let injected;
export function injectStyles(){
  if(injected) return;
  const style=document.createElement('style');
  style.textContent=`
    .builder-layout{display:flex;width:100%;height:100%;min-height:540px;}
    @media(max-width:640px){.builder-layout{flex-direction:column;}}
  `;
  document.head.appendChild(style);
  injected=true;
}
