import {addProductPage} from './render.js';
import {
  addProductId,
  addProduct,
  deleteProduct,
  getTotalPrice,
} from './data.js';

export const addTotalPricePage = () => {
  const elem = document.querySelector('.heading__price');
  elem.textContent = `${getTotalPrice()}$`;
};

export const formControl = (form, table, closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);

    addProductId(newProduct);
    addProductPage(table, newProduct);
    addProduct(newProduct);
    addTotalPricePage();

    form.reset();
    closeModal();
  });

  form.addEventListener('change', () => {
    const totalPrice =
      form.price.value && form.count.value ?
        Number(form.price.value) * Number(form.count.value) :
        '';

    const elem = document.querySelector('.add-product__footer-price');
    elem.textContent = `${totalPrice}$`;
  });
};

export const modalControl = (btnAdd, overlay) => {
  const openModal = () => {
    overlay.classList.add('overlay--active');
  };

  const closeModal = () => {
    overlay.classList.remove('overlay--active');
  };

  btnAdd.addEventListener('click', openModal);

  overlay.addEventListener('click', (event) => {
    const target = event.target;
    if (
      target.classList.contains('overlay') ||
      target.closest('.modal__close-button')
    ) {
      closeModal(overlay);
    }
  });

  return {
    closeModal,
  };
};

export const deleteControl = (table) => {
  table.tbody.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.table__body-button--delete')) {
      const currentRow = target.closest('.table__row');
      const dataset = currentRow.dataset;

      currentRow.remove();
      deleteProduct(dataset.id);
      addTotalPricePage();
    }
  });
};

export const checkboxControl = (checkbox) => {
  checkbox.addEventListener('click', () => {
    const discount = checkbox.nextElementSibling.children[0];
    if (checkbox.checked) {
      discount.disabled = false;
    } else {
      discount.disabled = true;
      discount.value = '';
    }
  });
};
