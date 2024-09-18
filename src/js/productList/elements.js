import {serverURL} from '../constants.js';
import {calculateProductPrice} from '../utils';

export const createShowBtn = (image) => {
  const button = document.createElement('button');
  button.classList.add('table__button', 'button', 'button-reset');
  button.type = 'button';

  if (!image.includes('notimage.jpg')) {
    button.classList.add('button--transparent', 'show');
    button.ariaLabel = 'Открыть изображение товара';
  } else {
    button.classList.add('no-image');
    button.ariaLabel = 'Изображение отсутствует';
  }

  return button;
};

const createEditBtn = () => {
  const button = document.createElement('button');
  button.classList.add(
      'table__button',
      'button',
      'button-reset',
      'button--transparent',
      'edit',
  );
  button.type = 'button';
  button.ariaLabel = 'Редактировать данные о товаре';

  return button;
};

const createDeleteBtn = () => {
  const button = document.createElement('button');
  button.classList.add(
      'table__button',
      'button',
      'button-reset',
      'button--transparent',
      'delete',
  );
  button.type = 'button';
  button.ariaLabel = 'Удалить товар';

  return button;
};

const createBtnGroup = (image) => {
  const btnGroup = document.createElement('td');
  btnGroup.classList.add('table__data');

  const showBtn = createShowBtn(image);
  const editBtn = createEditBtn();
  const deleteBtn = createDeleteBtn();

  btnGroup.append(showBtn, editBtn, deleteBtn);

  return btnGroup;
};

export const setRowAttribute = (row, image) => {
  if (!image.includes('notimage.jpg')) {
    row.dataset.pic = `${serverURL}${image}`;
  }
};

export const createRow = ({
  id,
  title,
  category,
  price,
  count,
  units,
  image,
}) => {
  const tr = document.createElement('tr');
  tr.classList.add('table__row');
  tr.dataset.id = id;

  tr.insertAdjacentHTML(
      'beforeend',
      `
    <td class="table__data">${id}</td>
    <td class="table__data" id="title">${title}</td>
    <td class="table__data" id="category">${category}</td>
    <td class="table__data" id="units">${units}</td>
    <td class="table__data" id="count">${count}</td>
    <td class="table__data" id="price">$${price}</td>
    <td class="table__data" id="totalPrice">
      $${Math.round(calculateProductPrice(price, count))}
    </td>
  `);

  setRowAttribute(tr, image);

  const btnGroup = createBtnGroup(image);
  tr.append(btnGroup);

  return tr;
};

export const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('goods__table', 'table');

  const thead = document.createElement('thead');
  thead.classList.add('table__header');
  thead.insertAdjacentHTML(
      'afterbegin',
      `
  <tr class="table__row">
    <th class="table__title">ID</th>
    <th class="table__title">Наименование</th>
    <th class="table__title">Категория</th>
    <th class="table__title">Ед/изм</th>
    <th class="table__title">Количество</th>
    <th class="table__title">Цена</th>
    <th class="table__title">Итог</th>
    <th class="table__title"></th>
  </tr>
  `,
  );

  const tbody = document.createElement('tbody');
  tbody.classList.add('table__body');

  table.append(thead, tbody);
  table.thead = thead;
  table.tbody = tbody;

  return table;
};
