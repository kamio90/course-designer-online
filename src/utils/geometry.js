export function polygonArea(points){
  if(points.length < 3) return 0;
  let area = 0;
  for(let i=0;i<points.length;i++){
    const j = (i+1)%points.length;
    area += points[i].x*points[j].y - points[j].x*points[i].y;
  }
  return Math.abs(area/2);
}

export function polygonPerimeter(points){
  if(points.length < 2) return 0;
  let perim = 0;
  for(let i=0;i<points.length;i++){
    const j=(i+1)%points.length;
    const dx = points[i].x - points[j].x;
    const dy = points[i].y - points[j].y;
    perim += Math.hypot(dx,dy);
  }
  return perim;
}
