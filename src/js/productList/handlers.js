import {sendRequest} from '../fetchRequest.js';
import {
  renderForm,
  renderConfirm,
} from '../productModal/render.js';

const showImage = ({target}) => {
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

const handleEditButtonClick = ({target}) => {
  if (target.closest('.edit')) {
    const currentRow = target.closest('.table__row');
    const productID = currentRow.dataset.id;

    sendRequest(`api/goods/${productID}`, {
      callback: (error, data) => {
        if (error) {
          console.warn(error);
        }

        renderForm(data);
      },
    });
  }
};

const showDeleteConfirm = ({target}) => {
  if (target.closest('.delete')) {
    const currentRow = target.closest('.table__row');
    const productID = currentRow.dataset.id;
    renderConfirm(productID);
  }
};

export const attachTableEventListeners = (table) => {
  table.addEventListener('click', showImage);
  table.addEventListener('click', handleEditButtonClick);
  table.addEventListener('click', showDeleteConfirm);
};
