'use strict';

const addOverlayActive = (overlay) => {
  overlay.classList.add('overlay--active');
};

const removeOverlayActive = (overlay) => {
  overlay.classList.remove('overlay--active');
};

const init = () => {
  const btnAddProduct = document.querySelector('.goods__add-product');
  const overlay = document.querySelector('.overlay');
  const btnClose = document.querySelector('.modal__close-button');

  btnAddProduct.addEventListener('click', () => {
    addOverlayActive(overlay);
  });

  overlay.addEventListener('click', event => {
    const target = event.target;

    if (target.className.includes('overlay--active')) {
      removeOverlayActive(overlay);
    }
  });

  btnClose.addEventListener('click', () => {
    removeOverlayActive(overlay);
  });
};

init();
