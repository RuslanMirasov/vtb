export const hidePreloader = () => {
  const preloader = document.querySelector('[data-preloader]');
  const header = document.querySelector('.header');
  const mainSection = document.querySelector('.section--hero');
  const columnLeft = document.querySelector('.column--left');
  const columnRight = document.querySelector('.column--right');
  const fixedBackground = document.querySelector('.fixed-background');
  const preloaderImage = document.querySelector('.preloader__image');
  const isMainPage = fixedBackground.classList.contains('scaleble');
  const delay = isMainPage ? 1200 : 500;
  const delay2 = isMainPage ? 1000 : 0;

  if (isMainPage) {
    requestAnimationFrame(() => {
      preloaderImage.style.height = '100%';
      columnLeft.classList.add('in-main-page');
      columnRight.classList.add('in-main-page');
    });
  }

  const handlerLoad = () => {
    preloader?.classList.add('hidden');
    fixedBackground?.classList.remove('scaleble');
    if (isMainPage) {
      mainSection.classList.add('show');
    }

    setTimeout(() => {
      document.body.classList.add('loaded');
    }, delay);

    setTimeout(() => {
      preloader?.remove();
      header?.classList.remove('scaleble');
      columnLeft?.classList.remove('scaleble');
      columnRight?.classList.remove('scaleble');
      if (isMainPage) {
        mainSection.classList.remove('show');
      }
    }, 3000);
  };

  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      setTimeout(handlerLoad, delay2);
    });
  });
};

export const initNavigationMenu = () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.navigation ');
  const menuLinks = document.querySelectorAll('.menu__link');
  const main = document.querySelector('.main');
  const columnLeft = document.querySelector('.column--left');
  const columnRight = document.querySelector('.column--right');
  const fixedBackground = document.querySelector('.fixed-background');

  const toggleMenu = () => {
    burger?.classList.toggle('open');
    menu?.classList.toggle('open');
    main?.classList.toggle('hidden');
    columnLeft?.classList.toggle('hidden');
    columnRight?.classList.toggle('hidden');
    fixedBackground?.classList.toggle('move');
  };

  if (burger) burger.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => link.addEventListener('click', toggleMenu));
};

export const initLinksMiddleware = () => {
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    e.preventDefault();

    document.body.classList.remove('loaded');

    setTimeout(() => {
      const target = link.getAttribute('target');
      if (target === '_blank') {
        window.open(href, '_blank'); // новая вкладка
      } else {
        window.location.href = href; // текущая вкладка
      }
    }, 700);
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const linkPath = new URL(href, window.location.origin).pathname.replace(/\/+$/, '');
    const currentPath = window.location.pathname.replace(/\/+$/, '');

    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
};
