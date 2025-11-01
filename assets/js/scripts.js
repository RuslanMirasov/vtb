import { initNavigationMenu, hidePreloader, initLinksMiddleware, initScrollArea } from './helpers.js';
import { initSliders, onStageSlideChange } from './sliders.js';

initScrollArea();
initNavigationMenu();
initLinksMiddleware();
initSliders();
hidePreloader();

let lastRealIndex = null;

document.addEventListener('DOMContentLoaded', () => {
  const stageSlider = window.swipers?.['stage-slider'];
  if (!stageSlider) return;

  stageSlider.on('slideChange', () => {
    onStageSlideChange(stageSlider.realIndex + 1);
  });
});
