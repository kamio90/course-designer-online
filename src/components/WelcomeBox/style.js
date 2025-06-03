let injected;
export function injectStyles(){
  if(injected) return;
  const style=document.createElement('style');
  style.textContent=`
    .welcome-box{background:var(--surface);box-shadow:var(--shadow);border-radius:var(--border-radius);padding:44px 40px 36px 40px;max-width:430px;width:100%;text-align:center;animation:fadeIn .6s cubic-bezier(.2,.8,.4,1);}
    .welcome-box h1{font-size:2.35rem;font-weight:700;margin:0 0 16px 0;}
    .welcome-box p{font-size:1.1rem;font-weight:400;color:#63676d;margin-bottom:30px;margin-top:0;}
    #create-project-btn{display:inline-flex;align-items:center;gap:.7em;background:var(--primary);color:var(--on-primary);border:none;font-size:1.15rem;font-weight:600;padding:14px 34px;border-radius:100px;box-shadow:0 2px 8px rgba(21,101,192,0.13);cursor:pointer;transition:background var(--transition),box-shadow var(--transition);}
    #create-project-btn:hover{background:var(--primary-dark);box-shadow:0 3px 12px rgba(21,101,192,0.19);}
    #create-project-btn svg{vertical-align:middle;}
    @media(max-width:640px){.welcome-box{padding:18px 5px 12px 5px;max-width:98vw;}}
  `;
  document.head.appendChild(style);
  injected=true;
}
