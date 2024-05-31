'use strict';

import {goods} from '/data/data.js';

const createData = () => {
  const td = document.createElement('td');
  td.classList.add('table__data');

  return td;
};

const createRow = () => {
  const tr = document.createElement('tr');
  tr.classList.add('table__row');

  return tr;
};

const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table');

  return table;
};

const insertDataToRow = (tr, productData) => {
  if (typeof productData !== 'object') {
    const td = createData();
    td.textContent = productData;

    return tr.append(td);
  }

  return Object.values(productData).forEach((subProductData) => {
    insertDataToRow(tr, subProductData);
  });
};

const renderGoods = (goods) => {
  const table = createTable();

  goods.forEach((product) => {
    const tr = createRow();
    insertDataToRow(tr, product);

    table.append(tr);
  });

  return table;
};

const table = renderGoods(goods);
console.log(table);
