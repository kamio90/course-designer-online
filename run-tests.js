import fs from 'fs';
import path from 'path';

const testFiles = [];
function scan(dir){
  for(const f of fs.readdirSync(dir)){
    const p=path.join(dir,f);
    if(fs.statSync(p).isDirectory()) scan(p);
    else if(p.endsWith('test.js')) testFiles.push(p);
  }
}
scan('./src');

let failed=false;
for(const file of testFiles){
  const mod = await import(path.resolve(file));
  const fn = Object.values(mod).find(v=>typeof v==='function');
  try{
    await fn();
    console.log('✓', file);
  }catch(e){
    failed=true;
    console.error('✗', file, e.message);
  }
}
if(failed){
  process.exit(1);
}
