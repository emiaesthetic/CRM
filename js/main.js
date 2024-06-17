import {goods} from './modules/data.js';
import {renderGoods, replaceElement} from './modules/render.js';
import {
  formControl,
  modalControl,
  deleteControl,
  checkboxControl,
  addTotalPricePage,
} from './modules/control.js';
import {
  createForm,
  createTable,
  getElementsPage,
} from './modules/createElements.js';

{
  const init = () => {
    const table = createTable();
    renderGoods(table, goods);
    replaceElement('.table', table);

    const form = createForm();
    replaceElement('.form', form);

    const {btnAdd, overlay, checkbox} = getElementsPage();
    const {closeModal} = modalControl(btnAdd, overlay);

    checkboxControl(checkbox);
    formControl(form, table, closeModal);
    deleteControl(table);
    addTotalPricePage();
  };

  window.crmInit = init;
}
