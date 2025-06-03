let injected;
export function injectStyles(){
  if(injected) return;
  const style=document.createElement('style');
  style.textContent=`
    .pcd-root{display:flex;flex-direction:column;align-items:stretch;height:100%;background:#f8fafc;min-height:0;min-width:0;}
    .pcd-toolbar{display:flex;align-items:center;gap:20px;background:#fff;padding:14px 30px 14px 36px;box-shadow:0 4px 18px rgba(33,33,33,0.05);border-bottom:1.5px solid #e8e8e8;position:relative;z-index:6;}
    .pcd-toolbar label{display:flex;align-items:center;gap:7px;color:#1565c0;font-weight:600;font-size:1.07rem;}
    .pcd-main{display:flex;flex:1;min-height:0;min-width:0;height:100%;width:100%;}
    .pcd-canvas-wrap{display:flex;flex-direction:column;align-items:center;flex:1;justify-content:center;padding:28px 0 0 0;min-width:0;min-height:0;position:relative;}
    .pcd-canvas{background:#e3ecfa;border:2px solid #1565c0;border-radius:16px;box-shadow:0 4px 32px rgba(33,33,33,0.09);margin:0 0 16px 0;display:block;transition:box-shadow .18s;}
    .pcd-canvas-actions{display:flex;gap:18px;margin-bottom:16px;}
    .pcd-hints{margin-top:12px;color:#606973;font-size:1.01rem;text-align:center;max-width:660px;font-weight:500;}
    @media(max-width:900px){.pcd-main{flex-direction:column;}}
  `;
  document.head.appendChild(style);
  injected=true;
}
