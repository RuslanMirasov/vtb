import { debounce } from './helpers.js';

let sidebar = null;
let limitEl = null;
let main = null;
let sidebarBottom = 0;

const getSidebarBottom = () => {
  const sb = sidebar.getBoundingClientRect();
  const mc = main.getBoundingClientRect();
  return sb.bottom - mc.top + main.scrollTop;
};

const fixSidebar = () => {
  if (!sidebar || !limitEl || !main) return;

  if (window.innerWidth < 1024) {
    sidebar.classList.remove('stiky');
    return;
  }

  const lr = limitEl.getBoundingClientRect();
  const mr = main.getBoundingClientRect();
  const limit = lr.top - mr.top + main.scrollTop;

  if (limit >= sidebarBottom) {
    sidebar.classList.add('stiky');
  } else {
    sidebar.classList.remove('stiky');
  }
};

export const initStikySidebar = () => {
  sidebar = document.querySelector('[data-stiky-sidebar]');
  limitEl = document.querySelector('[data-styky-limit]');
  main = document.querySelector('.main');

  if (!sidebar || !limitEl || !main) return;

  sidebarBottom = getSidebarBottom();
  fixSidebar();
};

export const setupStikySidebarEvents = () => {
  const updateDebounced = debounce(() => {
    sidebarBottom = getSidebarBottom();
    fixSidebar();
  }, 100);

  window.addEventListener('resize', updateDebounced);

  const mainEl = document.querySelector('.main');
  if (mainEl) {
    mainEl.addEventListener('scroll', fixSidebar);
  }
};

export const initSidebarPopups = () => {
  const navButtons = document.querySelectorAll('[data-open-sidebar-popup]');
  const closeButtons = document.querySelectorAll('[data-sidebar-popup-close]');
  const backddrop = document.querySelector('[data-stiky-sidebar]');

  if (!navButtons.length || !closeButtons.length || !backddrop) return;

  const openSidebarPopup = e => {
    const btn = e.currentTarget;

    const targetPopupNumber = btn.dataset.openSidebarPopup;
    const activePopup = document.querySelector('[data-sidebar-mobil-popup].active');

    if (!backddrop.classList.contains('active')) {
      backddrop.classList.add('active');
    }

    const targetPopup = document.querySelector(`[data-sidebar-mobil-popup="${targetPopupNumber}"]`);

    if (activePopup) {
      activePopup.classList.remove('active');
      setTimeout(() => {
        activePopup.style.display = 'none';
      }, 500);
      setTimeout(() => {
        targetPopup.style.display = 'flex';
      }, 520);
      setTimeout(() => {
        targetPopup.classList.add('active');
      }, 540);
      return;
    }
    targetPopup.style.display = 'flex';
    setTimeout(() => {
      targetPopup.classList.add('active');
    }, 10);
  };

  const closeSidebarPopup = e => {
    const target = e.target;
    if (target.classList.contains('sidebar') || target.classList.contains('sidebar-popup-close-button')) {
      backddrop.classList.remove('active');
      const activePopup = document.querySelector('[data-sidebar-mobil-popup].active');
      if (activePopup) {
        setTimeout(() => {
          activePopup.classList.remove('active');
          activePopup.style.display = 'none';
        }, 500);
      }
    }
  };

  navButtons.forEach(btn => btn.addEventListener('click', openSidebarPopup));
  closeButtons.forEach(btn => btn.addEventListener('click', closeSidebarPopup));
};
