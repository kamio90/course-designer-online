/**
 * MainCanvas component
 * Provides polygon drawing and static object placement.
 * Props:
 *   container - DOM element to render into
 *   width, height - canvas dimensions
 *   onChange(stats) - callback when stats update
 *   pxPerMeter - scale of pixels per meter for stats
 */
import { injectStyles } from './style.js';
import { polygonArea, polygonPerimeter } from '../../utils/index.js';

export function renderMainCanvas({container,width=800,height=600,onChange,pxPerMeter=20}={}){
  if(!container) throw new Error('container required');
  injectStyles();
  container.innerHTML=`<canvas class="main-canvas" tabindex="0" width="${width}" height="${height}"></canvas>`;
  const canvas=container.querySelector('canvas');
  const ctx=canvas.getContext('2d');

  const state={
    mode:'area', // 'area' or 'static'
    closed:false,
    points:[],
    objects:[],
    currentType:null,
    draggingPoint:null,
    draggingObject:null,
    history:{undo:[],redo:[]},
    scale:1,
    pxPerMeter
  };

  function pushSnapshot(){
    state.history.undo.push(JSON.stringify({points:state.points,objects:state.objects}));
    state.history.redo=[];
  }

  function applySnapshot(snap){
    const obj=JSON.parse(snap);
    state.points=obj.points; state.objects=obj.objects;
    draw();
    notify();
  }

  const api={
    getStats(){
      return {
        area: +(polygonArea(state.points)/(state.pxPerMeter*state.pxPerMeter)).toFixed(2),
        perimeter: +(polygonPerimeter(state.points)/state.pxPerMeter).toFixed(2),
        vertices: state.points.length,
        edges: state.points.length,
        occupied: state.objects.length
      };
    },
    acceptArea(){ if(state.closed){ state.mode='static'; draw(); notify(); } },
    editArea(){ state.mode='area'; state.closed=false; draw(); notify(); },
    setObjectType(type){ state.currentType=type; },
    setPxPerMeter(val){ state.pxPerMeter=val; notify(); },
    clear(){ state.points=[]; state.objects=[]; state.mode='area'; state.closed=false; pushSnapshot(); draw(); notify(); },
    undo(){ if(!state.history.undo.length) return; state.history.redo.unshift(JSON.stringify({points:state.points,objects:state.objects})); applySnapshot(state.history.undo.pop()); },
    redo(){ if(!state.history.redo.length) return; state.history.undo.push(JSON.stringify({points:state.points,objects:state.objects})); applySnapshot(state.history.redo.shift()); },
    zoomIn(){ state.scale=Math.min(state.scale*1.2,4); draw(); },
    zoomOut(){ state.scale=Math.max(state.scale/1.2,0.5); draw(); },
    center(){ draw(); },
    getMode(){ return state.mode; },
    isClosed(){ return state.closed; },
    getPxPerMeter(){ return state.pxPerMeter; }
  };

  const listeners=[];
  function notify(){
    const stats=api.getStats();
    if(onChange) onChange(stats);
    listeners.forEach(fn=>fn(stats));
  }
  api.onChange=fn=>{listeners.push(fn);};

  function draw(){
    ctx.save();
    ctx.setTransform(state.scale,0,0,state.scale,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#e3ecfa';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle='#1565c0';
    ctx.lineWidth=2;
    if(state.points.length){
      ctx.beginPath();
      ctx.moveTo(state.points[0].x, state.points[0].y);
      for(let i=1;i<state.points.length;i++) ctx.lineTo(state.points[i].x,state.points[i].y);
      if(state.mode!=='area') ctx.closePath();
      ctx.stroke();
      // points
      state.points.forEach((p,i)=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,6,0,Math.PI*2);
        ctx.fillStyle='#fff';
        ctx.fill();
        ctx.stroke();
      });
    }
    // objects
    state.objects.forEach(o=>{
      ctx.fillStyle='#99d';
      ctx.fillRect(o.x-20,o.y-20,40,40);
      ctx.strokeRect(o.x-20,o.y-20,40,40);
    });
    ctx.restore();
  }

  function canvasPos(evt){
    const rect=canvas.getBoundingClientRect();
    return {x:(evt.clientX-rect.left)/state.scale, y:(evt.clientY-rect.top)/state.scale};
  }

  canvas.addEventListener('mousedown',e=>{
    const pos=canvasPos(e);
    if(state.mode==='area'){
      const idx=state.points.findIndex(p=>Math.hypot(p.x-pos.x,p.y-pos.y)<8);
      if(idx!==-1){
        state.draggingPoint=idx;
      } else if(!state.closed && state.points.length>=3 && Math.hypot(state.points[0].x-pos.x,state.points[0].y-pos.y)<8){
        state.closed=true; draw(); notify();
      } else if(!state.closed){
        state.points.push({x:pos.x,y:pos.y});
        pushSnapshot();
        draw(); notify();
      }
    } else if(state.mode==='static' && state.currentType){
      state.objects.push({type:state.currentType,x:pos.x,y:pos.y});
      pushSnapshot();
      draw(); notify();
    } else {
      const idx=state.objects.findIndex(o=>Math.abs(o.x-pos.x)<20 && Math.abs(o.y-pos.y)<20);
      if(idx!==-1){ state.draggingObject=idx; }
    }
  });

  canvas.addEventListener('mousemove',e=>{
    const pos=canvasPos(e);
    if(state.draggingPoint!==null){
      state.points[state.draggingPoint].x=pos.x;
      state.points[state.draggingPoint].y=pos.y;
      draw(); notify();
    }
    if(state.draggingObject!==null){
      state.objects[state.draggingObject].x=pos.x;
      state.objects[state.draggingObject].y=pos.y;
      draw(); notify();
    }
  });

  canvas.addEventListener('mouseup',()=>{
    if(state.draggingPoint!==null || state.draggingObject!==null){
      pushSnapshot();
    }
    state.draggingPoint=null; state.draggingObject=null;
  });

  draw();
  notify();
  return api;
}
