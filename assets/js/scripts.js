import { initNavigationMenu, hidePreloader, initLinksMiddleware, initScrollArea, fixScreenHeight } from './helpers.js';
import { initSliders, onStageSlideChange } from './sliders.js';
import { initTabs } from './tabs.js';

fixScreenHeight();
initScrollArea();
initNavigationMenu();
initLinksMiddleware();
initSliders();
initTabs();
hidePreloader();

let lastRealIndex = null;

document.addEventListener('DOMContentLoaded', () => {
  const stageSlider = window.swipers?.['stage-slider'];
  if (!stageSlider) return;

  stageSlider.on('slideChange', () => {
    onStageSlideChange(stageSlider.realIndex + 1);
  });
});
