import { initNavigationMenu, hidePreloader, initLinksMiddleware, initScrollArea, fixScreenHeight, initFullScreenButton } from './helpers.js';
import { initSliders, onStageSlideChange } from './sliders.js';
import { initTabs } from './tabs.js';
import { initScrollToBlock } from './scrollToBlock.js';
import { initSounds } from './playSound.js';
import { initRundomColorSelect } from './rundomColor.js';
import { initPrint } from './print.js';
import { setupStikySidebarEvents, initStikySidebar, initSidebarPopups } from './stiky-sidebar.js';

fixScreenHeight();
initScrollArea();
initNavigationMenu();
initLinksMiddleware();
initFullScreenButton();
initSliders();
initScrollToBlock();
initTabs();
initSounds();
initRundomColorSelect();
initPrint();
setupStikySidebarEvents();
initStikySidebar();
initSidebarPopups();
hidePreloader();

document.addEventListener('DOMContentLoaded', () => {
  const stageSlider = window.swipers?.['stage-slider'];
  if (!stageSlider) return;

  stageSlider.on('slideChange', () => {
    const index = stageSlider.activeIndex; // Берём реальный DOM slide
    const slideEl = stageSlider.slides[index];
    const number = slideEl?.dataset?.number;
    if (number) {
      onStageSlideChange(Number(number));
    }
  });
});
