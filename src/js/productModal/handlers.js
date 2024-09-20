import {createPreviewImage, createPreviewError} from './elements.js';
import {renderError} from './render.js';
import {validateAndSubmitForm} from './formValidation.js';
import {
  addRow,
  updateRow,
  removeRow,
  updateShowBtn,
  formatProductData,
} from './utils.js';
import {sendRequest} from '../fetchRequest.js';
import {calculateProductPrice} from '../utils.js';

const handleOverlayClick = ({target}) => {
  if (target.classList.contains('overlay')) {
    target.remove();
  }
};

const handleCloseBtnClick = ({target}) => {
  if (target.closest('.modal__close')) {
    target.closest('.overlay').remove();
  }
};

const handlerFormPrice = form => {
  const formPrice = document.querySelector('#formPrice');

  const priceValue = parseFloat(form.price.value);
  const countValue = parseFloat(form.count.value);
  const discountValue = parseInt(form.discount.value);


  if (!isNaN(priceValue) && !isNaN(countValue)) {
    formPrice.textContent = `$${calculateProductPrice(
        priceValue,
        countValue,
        discountValue,
    ).toFixed(2)}`;
  } else {
    formPrice.textContent = '$0.00';
  }
};

const showPreviewImage = file => {
  if (file.files.length <= 0) return;

  const maxSize = 1024 * 1024;
  const fileWrapper = file.parentNode;

  const size = file.files[0].size;
  const src = URL.createObjectURL(file.files[0]);
  const preview = size > maxSize ?
      createPreviewError() : createPreviewImage(src);

  fileWrapper.nextElementSibling?.remove();
  fileWrapper.after(preview);
};

const toggleDiscountField = ({target}) => {
  if (target.closest('#checkbox')) {
    const discount = target.nextElementSibling.children[0];
    discount.disabled = !target.checked;
    discount.value = target.checked ? 0 : '';
  }
};

export const addProduct = async ({target}) => {
  const formData = new FormData(target);
  const newProduct = Object.fromEntries(formData);
  const formattedProduct = await formatProductData(newProduct);

  sendRequest('api/goods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formattedProduct,
    callback: (error, data) => {
      if (error) {
        renderError(error);
        return;
      }

      addRow(data);
      target.closest('.overlay').remove();
    },
  });
};

export const editProduct = async ({target}, id) => {
  const formData = new FormData(target);
  const newProduct = Object.fromEntries(formData);
  const formattedProduct = await formatProductData(newProduct);

  sendRequest(`api/goods/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formattedProduct,
    callback: (error, data) => {
      if (error) {
        renderError(error);
        return;
      }

      updateShowBtn(data, id);
      updateRow(data);
      target.closest('.overlay').remove();
    },
  });
};

const removeProduct = ({target}) => {
  if (target.closest('.confirm__apply')) {
    const confirmWrapper = target.closest('.confirm__wrapper');
    const productID = confirmWrapper.dataset.id;

    sendRequest(`api/goods/${productID}`, {
      method: 'DELETE',
      callback: (error) => {
        if (error) {
          console.error(error);
        }
        removeRow(productID);
        target.closest('.overlay').remove();
      },
    });
  }
};

export const attachModalEventListeners = (overlay, closeBtn) => {
  overlay.addEventListener('click', handleOverlayClick);
  closeBtn.addEventListener('click', handleCloseBtnClick);

  const removeOverlay = () => {
    overlay.removeEventListener('click', handleOverlayClick);
    closeBtn.removeEventListener('click', handleCloseBtnClick);
  };

  overlay.addEventListener('remove', removeOverlay);
};

export const attachFormEventListeners = (form, {id} = {}) => {
  form.addEventListener('click', toggleDiscountField);

  form.image.addEventListener('change', () => {
    showPreviewImage(form.image);
  });

  form.addEventListener('input', () => {
    handlerFormPrice(form);
  });

  if (id) {
    validateAndSubmitForm(form, (event) => {
      editProduct(event, id);
    });
  } else {
    validateAndSubmitForm(form, addProduct);
  }
};

export const attachConfirmEventListeners = (applyBtn, cancelBtn) => {
  applyBtn.addEventListener('click', removeProduct);
  cancelBtn.addEventListener('click', ({target}) => {
    target.closest('.overlay').remove();
  });
};
