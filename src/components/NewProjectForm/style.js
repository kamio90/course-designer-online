let injected;
export function injectStyles(){
  if(injected) return;
  const style=document.createElement('style');
  style.textContent=`
    .new-parkur-form{background:var(--surface);box-shadow:var(--shadow);border-radius:var(--border-radius);padding:30px 36px 22px 36px;width:100%;max-width:410px;margin:0 auto;display:flex;flex-direction:column;gap:22px;animation:fadeIn .3s;}
    .new-parkur-form h2{margin-top:0;margin-bottom:8px;font-size:1.65rem;font-weight:700;color:var(--primary-dark);}
    .new-parkur-form label{display:flex;flex-direction:column;align-items:flex-start;font-size:1.07rem;font-weight:500;color:#232b37;gap:4px;}
    .new-parkur-form input,.new-parkur-form select{margin-top:2px;font-size:1.05rem;padding:7px 11px;border:1px solid #b8c3d3;border-radius:8px;width:100%;background:#f4f7fb;transition:border-color .2s;}
    .new-parkur-form input:focus,.new-parkur-form select:focus{outline:none;border-color:#1565c0;}
    .new-parkur-form button[type="submit"]{margin-top:14px;padding:12px 0;border-radius:100px;background:var(--primary);color:#fff;border:none;font-size:1.12rem;font-weight:600;cursor:pointer;transition:background .2s;}
    .new-parkur-form button[type="submit"]:hover{background:var(--primary-dark);}
  `;
  document.head.appendChild(style);
  injected=true;
}
