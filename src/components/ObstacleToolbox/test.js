import { renderObstacleToolbox } from './index.js';

export function testObstacleToolbox(){
  const div=document.createElement('div');
  renderObstacleToolbox({container:div,obstacles:[{id:1,name:'A'}]});
  if(!div.querySelector('.obstacle-toolbox')) throw new Error('toolbox not rendered');
}
