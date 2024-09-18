import {
  createRow,
  setRowAttribute,
  createShowBtn,
} from '../productList/elements.js';
import {
  increaseTotalPrice,
  decreaseTotalPrice,
  calculateProductPrice,
  encodeImage,
} from '../utils.js';

export const addRow = data => {
  document.querySelector('.table')?.append(createRow(data));
  increaseTotalPrice(data.price, data.count);
};

export const updateRow = data => {
  const currentRow = document.querySelector(`[data-id="${data.id}"]`);

  if (data.image) {
    setRowAttribute(currentRow, data.image);
  }

  const title = currentRow.querySelector('#title');
  title.textContent = data.title;

  const category = currentRow.querySelector('#category');
  category.textContent = data.category;

  const units = currentRow.querySelector('#units');
  units.textContent = data.units;

  const count = currentRow.querySelector('#count');
  const prevCount = count.textContent;
  count.textContent = data.count;

  const price = currentRow.querySelector('#price');
  const prevPrice = price.textContent.slice(1);
  price.textContent = data.price;

  const totalPrice = currentRow.querySelector('#totalPrice');
  totalPrice.textContent = `$${Math.round(calculateProductPrice(
      data.price,
      data.count,
      data.discount,
  ))}`;

  decreaseTotalPrice(prevPrice, prevCount);
  increaseTotalPrice(data.price, data.count);
};

export const removeRow = id => {
  const currentRow = document.querySelector(`[data-id="${id}"]`);

  const rowPrice = currentRow.querySelector('#price').textContent.slice(1);
  const rowCount = currentRow.querySelector('#count').textContent;
  decreaseTotalPrice(rowPrice, rowCount);

  currentRow.remove();
};

export const updateShowBtn = (data, id) => {
  const currentRow = document.querySelector(`[data-id="${id}"`);

  if ('image' in data && !currentRow.hasAttribute('data-pic')) {
    const noImageBtn = currentRow.querySelector('.no-image');
    const showBtn = createShowBtn(data.image);
    noImageBtn.replaceWith(showBtn);
  }
};

export const formatProductData = async data => {
  data['price'] = Number(data['price']);
  data['count'] = Number(data['count']);

  if ('discount' in data) {
    data['discount'] = Number(data['discount']);
  }

  if ('image' in data && data.image.size !== 0) {
    data.image = await encodeImage(data.image);
  } else {
    delete data.image;
  }

  return data;
};
