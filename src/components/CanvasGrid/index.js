import { t } from '../../i18n.js';
import { injectStyles } from './style.js';

export const CanvasGrid = {
  init(config){
    injectStyles();
    const canvas = document.getElementById('parkur-canvas');
    let w, h;
    if(config.mode === 'rect'){
      w = config.width * config.pxPerMeter;
      h = config.height * config.pxPerMeter;
    } else {
      w = 800;
      h = 500;
    }
    canvas.width = w;
    canvas.height = h;
    this.config = config;
    this.ctx = canvas.getContext('2d');
    if(config.mode === 'rect') this.drawGrid(w,h,config.pxPerMeter);
    else this.enableFreeDraw(canvas);
  },
  drawGrid(w,h,pxPerMeter){
    const ctx = this.ctx;
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = '#1565c044';
    ctx.lineWidth = 1;
    for(let x=0;x<=w;x+=pxPerMeter){
      ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();
    }
    for(let y=0;y<=h;y+=pxPerMeter){
      ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();
    }
    ctx.strokeStyle = '#1565c0';
    ctx.lineWidth = 3;
    ctx.strokeRect(1.5,1.5,w-3,h-3);
  },
  enableFreeDraw(canvas){
    const ctx = this.ctx;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = '20px Inter';
    ctx.fillStyle = '#1565c0';
    ctx.fillText(t('grid.drawMode'),32,48);
  }
};
