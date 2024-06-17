import {createRow} from './createElements.js';

export const renderGoods = (table, goods) => {
  const allRow = goods.map(createRow);
  table.tbody.append(...allRow);
};

export const addProductPage = (table, product) => {
  const productRow = createRow(product);
  table.tbody.append(productRow);
};

export const replaceElement = (selector, newElement) => {
  const oldElement = document.querySelector(selector);
  oldElement.replaceWith(newElement);
};
