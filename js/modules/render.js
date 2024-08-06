import {createRow} from './ui/createElements.js';
import {table, cmsPrice} from './ui/getElements.js';
import {fetchRequest} from './api.js';
import {
  showError,
  updateTotalPrice,
  getTotalProductPrice,
} from './helpers.js';

const renderTotalPrice = (error, price) => {
  if (error) {
    showError(error);
    return;
  };
  cmsPrice.textContent = `$${price}`;
};

const renderGoods = (error, data) => {
  if (error) {
    showError(error);
    return;
  };
  const allRow = data.goods.map(createRow);
  table.append(...allRow);
};

export const loadPage = () => {
  const pathGoods = 'api/goods?page=2';
  const pathTotalPrice = 'api/total';

  fetchRequest(pathGoods, {callback: renderGoods});
  fetchRequest(pathTotalPrice, {callback: renderTotalPrice});
};

export const addProduct = (product) => {
  const row = createRow(product);
  table.append(row);

  const totalProductPrice = getTotalProductPrice(product.count, product.price);
  cmsPrice.textContent =
    `$${updateTotalPrice(cmsPrice.textContent, totalProductPrice, '+')}`;
};

export const removeProduct = (productID, count, price) => {
  const currentRow = document.querySelector(`[data-id="${productID}"]`);
  currentRow.remove();

  const totalProductPrice = getTotalProductPrice(count, price);
  cmsPrice.textContent =
    `$${updateTotalPrice(cmsPrice.textContent, totalProductPrice, '-')}`;
};
