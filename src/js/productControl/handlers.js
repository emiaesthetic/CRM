import {renderGoods} from '../productList/render.js';
import {renderForm} from '../productModal/render.js';
import {debounce} from '../utils.js';
import {loadSearch} from '../fetchRequest.js';

const searchAndShowProduct = async query => {
  const data = await loadSearch(query);
  renderGoods(data.goods);
};

export const attachControlEventListeners = (form, addBtn) => {
  addBtn.addEventListener('click', renderForm);

  form.addEventListener('input', debounce(() => {
    const query = form.search.value.trim();
    searchAndShowProduct(query);
  }, 300));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
};
