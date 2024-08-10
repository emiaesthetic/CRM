import {addRow, removeRow} from './components/table.js';
import {renderModal} from './render.js';
import {fetchRequest} from './api.js';

export const calculatePrice = (form, price) => {
  price.textContent = form.price.value && form.count.value ?
    `$${+form.price.value * +form.count.value}` : '';
};

export const closeBtn = ({target}, overlay) => {
  if (target.closest('.modal__close')) {
    overlay.remove();
  }
};

export const overlay = ({target}) => {
  if (target.classList.contains('overlay')) {
    target.remove();
  }
};

export const addProduct = (e, overlay) => {
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
        renderModal(error);
        return;
      }
      addRow(data);
      overlay.remove();
    },
  });
};

export const removeProduct = ({target}) => {
  if (target.closest('.delete')) {
    const currentRow = target.closest('.table__row');
    const productID = currentRow.dataset.id;

    fetchRequest(`api/goods/${productID}`, {
      method: 'DELETE',
      callback: (error) => {
        if (error) {
          renderModal(error);
          return;
        }

        removeRow(productID);
      },
    });
  }
};

export const editProduct = ({target}) => {
  if (target.closest('.edit')) {
    const productID = target.closest('.table__row').dataset.id;
    fetchRequest(`api/goods/${productID}`, {
      callback: (error, data) => {
        if (error) {
          renderModal(error);
          return;
        }

        renderModal(null, data);
      },
    });
  }
};

export const checkbox = ({target}) => {
  if (target.closest('#checkbox')) {
    const discount = target.nextElementSibling.children[0];
    discount.disabled = !target.checked;
    discount.value = target.checked ? 0 : '';
  }
};

export const showImage = ({target}) => {
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
};
