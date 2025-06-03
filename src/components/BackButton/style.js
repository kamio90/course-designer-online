let injected;
export function injectStyles(){
  if(injected) return;
  const style = document.createElement('style');
  style.textContent = `
    .back-btn{display:inline-flex;align-items:center;gap:.5em;background:#f4f7fb;color:#1565c0;border:none;font-size:1.07rem;font-weight:600;padding:9px 20px 9px 14px;border-radius:100px;box-shadow:0 1px 5px rgba(21,101,192,0.1);cursor:pointer;transition:background .18s,box-shadow .16s,color .18s;outline:none;user-select:none;overflow:hidden;margin:0 0 12px 0;}
    .back-btn svg{flex-shrink:0;margin-right:4px;transition:transform .22s cubic-bezier(.51,1.28,.38,1.17);}
    .back-btn:hover,.back-btn:focus{background:#e0e7f8;color:#003c8f;box-shadow:0 4px 18px rgba(21,101,192,0.13);}
    .back-btn:active svg{transform:translateX(-4px) scale(.97);}
  `;
  document.head.appendChild(style);
  injected = true;
}
