let injected;
export function injectStyles(){
  if(injected) return;
  const s=document.createElement('style');
  s.textContent=`
    .cae-root{display:flex;flex-direction:column;height:100%;gap:12px;}
    .cae-top{flex:0 0 auto;}
    .cae-main{display:flex;flex:1;gap:12px;overflow:hidden;}
    .cae-sidebar{width:220px;flex:0 0 auto;}
    .cae-canvas{flex:1;display:flex;justify-content:center;align-items:center;}
    .cae-stats{width:220px;flex:0 0 auto;}
    @media(max-width:800px){
      .cae-main{flex-direction:column;}
      .cae-sidebar,.cae-stats{width:100%;}
    }
  `;
  document.head.appendChild(s);
  injected=true;
}
