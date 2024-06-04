'use strict';

{
  const addOverlayActive = (overlay) => {
    overlay.classList.add('overlay--active');
  };

  const removeOverlayActive = (overlay) => {
    overlay.classList.remove('overlay--active');
  };

  const init = () => {
    const btnAddProduct = document.querySelector('.goods__add-product');
    const overlay = document.querySelector('.overlay');

    btnAddProduct.addEventListener('click', () => {
      addOverlayActive(overlay);
    });

    overlay.addEventListener('click', (event) => {
      const target = event.target;
      if (
        target.classList.contains('overlay') ||
        target.closest('.modal__close-button')
      ) {
        removeOverlayActive(overlay);
      }
    });
  };

  window.modalWindow = init;
}
