import {createRow, createTable} from './elements.js';
import {attachTableEventListeners} from './handlers.js';

export const renderGoods = (goods) => {
  const table = createTable();
  table.append(...goods.map(createRow));
  attachTableEventListeners(table);

  const tableWrapper = document.querySelector('#tableWrapper');
  tableWrapper.innerHTML = '';
  tableWrapper.append(table);
};
