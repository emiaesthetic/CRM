import {createTable, createRow} from './components/table.js';
import {loadStyle} from './utils/style.js';
import * as handlers from './handlers.js';
import {createModal, createForm, createError} from './components/modal.js';
import {validateDescription} from './utils/validation.js';

export const renderModal = async (err, data) => {
  await loadStyle('css/blocks/_overlay.css');

  const {overlay, modalWindow, closeBtn} = createModal();

  overlay.addEventListener('click', handlers.overlay);

  closeBtn.addEventListener('click', (e) => {
    handlers.closeBtn(e, overlay);
  });

  if (err) {
    const errorContent = createError(err.message);
    modalWindow.classList.add('error');
    modalWindow.append(errorContent);
  } else {
    const {header, form, footer} = createForm(data);

    form.addEventListener('click', handlers.checkbox);

    form.addEventListener('input', () => {
      const price = footer.querySelector('#formPrice');
      handlers.calculatePrice(form, price);
    });

    form.file.addEventListener('change', () => {
      handlers.showPreview(form.file);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      validateDescription(form.description);

      if (form.description.checkValidity()) {
        handlers.addProduct(e.target, overlay);
      } else {
        form.description.addEventListener('input', () => {
          validateDescription(form.description);
        });
      }
    });

    overlay.classList.add('overlay--form');
    modalWindow.append(header, form, footer);
  }
};

export const renderGoods = (err, data) => {
  if (err) {
    renderModal(err);
    return;
  };

  return data.goods.map(createRow);
};

export const renderTable = () => {
  const table = createTable();
  table.addEventListener('click', handlers.removeProduct);
  table.addEventListener('click', handlers.editProduct);
  table.addEventListener('click', handlers.showImage);

  const tableWrapper = document.querySelector('#tableWrapper');
  tableWrapper.append(table);

  return table;
};
