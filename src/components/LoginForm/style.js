let injected;
export function injectStyles(){
  if(injected) return;
  const style = document.createElement('style');
  style.textContent = `
    .login-form{max-width:320px;margin:40px auto;padding:24px;background:var(--surface);box-shadow:var(--shadow);border-radius:12px;display:flex;flex-direction:column;gap:16px;animation:fadeIn .3s;}
    .login-form h2{margin:0;font-size:1.4rem;color:var(--primary-dark);text-align:center;}
    .login-form label{display:flex;flex-direction:column;font-size:.9rem;color:var(--primary-dark);}
    .login-form input{padding:8px 12px;font-size:1rem;border:1px solid #cfd6e6;border-radius:4px;}
    .login-form button{padding:10px 16px;font-size:1rem;border:none;border-radius:4px;cursor:pointer;transition:background var(--transition);}
    .login-form button.primary{background:var(--primary);color:var(--on-primary);}
    .login-form button.primary:hover{background:var(--primary-dark);}
    .login-form button.google{background:#db4437;color:#fff;}
    .login-form button.google:hover{background:#c33c2f;}
    .login-form button.facebook{background:#1877f2;color:#fff;}
    .login-form button.facebook:hover{background:#0f6ae6;}
    .login-links{display:flex;justify-content:space-between;font-size:.85rem;}
    .login-links a{color:var(--primary);text-decoration:none;}
    .login-links a:hover{text-decoration:underline;}
    .login-error{color:#b00020;font-size:.9rem;min-height:1.2em;text-align:center;}
  `;
  document.head.appendChild(style);
  injected = true;
}
