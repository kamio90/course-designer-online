import { BackButton } from './index.js';

export function testBackButton(){
  const html = BackButton();
  if(!html.includes('back-btn')) throw new Error('button not created');
}
