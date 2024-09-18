import {
  createModalWindow,
  createForm,
  createError,
  createDeleteConfirm,
} from './elements.js';
import {
  attachModalEventListeners,
  attachFormEventListeners,
  attachConfirmEventListeners,
} from './handlers.js';
import {loadCategories} from '../fetchRequest.js';

const renderModal = () => {
  const {overlay, modalWindow, closeBtn} = createModalWindow();
  modalWindow.append(closeBtn);
  overlay.append(modalWindow);
  document.body.append(overlay);

  attachModalEventListeners(overlay, closeBtn);

  return {
    overlay,
    modalWindow,
  };
};

export const renderError = (error) => {
  const {modalWindow} = renderModal();
  const errorContent = createError(error.message);
  modalWindow.append(errorContent);
  modalWindow.classList.add('error');
};

export const renderForm = async (data) => {
  const categories = await loadCategories();

  const {overlay, modalWindow} = renderModal();
  const {header, form, footer} = createForm(data, categories);

  modalWindow.append(header, form, footer);
  overlay.classList.add('overlay--form');

  attachFormEventListeners(form, data);
};

export const renderConfirm = (id) => {
  const {modalWindow} = renderModal();
  const {confirmWrapper, applyBtn, cancelBtn} = createDeleteConfirm(id);
  modalWindow.append(confirmWrapper);
  modalWindow.classList.add('confirm');

  attachConfirmEventListeners(applyBtn, cancelBtn);
};
