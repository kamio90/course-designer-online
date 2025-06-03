let injected;
export function injectStyles(){
  if(injected) return;
  const style=document.createElement('style');
  style.textContent=`
    #helpbox{position:absolute;top:-420px;left:50%;transform:translateX(-50%);z-index:99;width:420px;max-width:99vw;background:#fff;box-shadow:0 8px 48px #1565c058;border-radius:18px;border:1.5px solid #e8e8e8;opacity:0;transition:top .38s cubic-bezier(.47,1.36,.45,1),opacity .18s;}
    #helpbox.show{top:38px;opacity:1;}
    .helpbox-content{padding:28px 30px 18px 30px;}
    .helpbox-title{display:flex;align-items:center;gap:12px;font-size:1.18rem;font-weight:700;color:#1565c0;margin-bottom:12px;}
    #helpbox-close-btn{margin-left:auto;border:none;background:none;color:#003c8f;font-size:2.2rem;font-weight:bold;border-radius:8px;cursor:pointer;transition:background .14s;padding:0 6px;}
    #helpbox-close-btn:hover{background:#e3edfa;}
    .helpbox-body ul{margin:7px 0 16px 22px;padding-left:0;font-size:.98rem;}
    .helpbox-body li{margin-bottom:3px;}
  `;
  document.head.appendChild(style);
  injected=true;
}
