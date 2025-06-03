/**
 * MainCanvas component
 * Provides drawing canvas area.
 * Props: container - element to render into
 *   width, height - canvas size
 */
import { injectStyles } from './style.js';

export function renderMainCanvas({container, width=800, height=600}={}){
  if(!container) throw new Error('container required');
  injectStyles();
  container.innerHTML = `<canvas class="main-canvas" width="${width}" height="${height}" tabindex="0"></canvas>`;
  return container.querySelector('canvas');
}
