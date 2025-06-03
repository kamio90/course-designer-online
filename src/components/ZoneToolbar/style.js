let injected;
export function injectStyles(){
  if(injected) return;
  const style=document.createElement('style');
  style.textContent=`
    #zone-toolbar{min-width:170px;max-width:210px;background:#e8f1fa;box-shadow:2px 0 10px rgba(21,101,192,0.06);border-radius:16px;margin:32px 12px 32px 24px;display:flex;flex-direction:column;gap:16px;padding:18px 12px;font-size:1.01rem;}
    #zone-toolbar button{margin:5px 0;width:100%;background:#fff;border:1.5px solid #1565c0;border-radius:8px;padding:6px 10px;color:#1565c0;font-weight:600;cursor:pointer;transition:background .2s;}
    #zone-toolbar button:hover{background:#e0e7f8;}
    @media(max-width:640px){#zone-toolbar{flex-direction:row;margin:12px 2px;border-radius:12px;max-width:98vw;min-width:0;gap:7px;font-size:.98rem;}}
  `;
  document.head.appendChild(style);
  injected=true;
}
