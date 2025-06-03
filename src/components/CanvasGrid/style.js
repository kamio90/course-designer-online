let injected;
export function injectStyles(){
  if(injected) return;
  const style=document.createElement('style');
  style.textContent=`
    #parkur-canvas{background:#e3ecfa;border:2px solid #1565c0;border-radius:16px;box-shadow:0 4px 32px rgba(33,33,33,0.09);margin:20px 0;display:block;}
    .canvas-wrap{flex:1;display:flex;align-items:center;justify-content:center;position:relative;}
  `;
  document.head.appendChild(style);
  injected=true;
}
