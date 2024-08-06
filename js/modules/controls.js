import {
  formOverlay,
  errorOverlay,
  form,
  formPrice,
  btnAdd,
  checkbox,
  table,
} from './ui/getElements.js';
import {openModal, closeModal, showError} from './helpers.js';
import {fetchRequest} from './api.js';
import {addProduct, removeProduct} from './render.js';

export const modalsControl = () => {
  [formOverlay, errorOverlay].forEach((overlay) => {
    overlay.addEventListener('click', (event) => {
      const target = event.target;
      if (
        target.classList.contains('overlay') || target.closest('.modal__close')
      ) {
        closeModal(overlay);
      }
    });
  });
};

export const formControl = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);

    fetchRequest('api/goods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newProduct,
      callback: (error, data) => {
        if (error) {
          showError(error);
          return;
        }

        addProduct(data);
        form.reset();
        closeModal(formOverlay);
      },
    });
  });

  form.addEventListener('input', () => {
    const totalPrice =
      form.price.value && form.count.value ?
        Number(form.price.value) * Number(form.count.value) :
        '';
    formPrice.textContent = `${totalPrice}$`;
  });

  btnAdd.addEventListener('click', () => {
    openModal(formOverlay);
  });
};


export const deleteControl = () => {
  table.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.delete')) {
      const currentRow = target.closest('.table__row');
      const productID = currentRow.dataset.id;
      const productCount = currentRow.querySelector('#count').textContent;
      const productPrice = currentRow.querySelector('#price').textContent;

      fetchRequest(`api/goods/${productID}`, {
        method: 'DELETE',
        callback: (error) => {
          if (error) {
            showError(error);
            return;
          }

          removeProduct(productID, productCount, productPrice);
        },
      });
    }
  });
};

export const checkboxControl = () => {
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

export const showImageControl = () => {
  table.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.show')) {
      const currentRow = target.closest('.table__row');

      const imagePath = currentRow.dataset.pic;
      const imageWidth = 600;
      const imageHeight = 600;
      const params = `
        width=${imageWidth},
        height=${imageHeight},
        left=${(screen.width - imageWidth) / 2},
        top=${(screen.height - imageHeight) / 2},
      `;

      open(imagePath, '', params);
    }
  });
};

modalsControl();
formControl();
deleteControl();
checkboxControl();
showImageControl();
