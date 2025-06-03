let injected;
export function injectStyles(){
  if(injected) return;
  const s=document.createElement('style');
  s.textContent=`
    .ce-root{display:flex;flex-direction:column;height:100%;gap:12px;}
    .ce-top{flex:0 0 auto;}
    .ce-main{display:flex;flex:1;gap:12px;overflow:hidden;}
    .ce-toolbox{width:220px;flex:0 0 auto;}
    .ce-canvas{flex:1;display:flex;justify-content:center;align-items:center;}
    .ce-stats{width:220px;flex:0 0 auto;}
    @media(max-width:800px){
      .ce-main{flex-direction:column;}
      .ce-toolbox,.ce-stats{width:100%;}
    }
  `;
  document.head.appendChild(s);
  injected=true;
}
