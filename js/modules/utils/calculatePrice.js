import {renderModal} from '../render.js';

const totalPrice = document.querySelector('#cmsPrice');
let currentTotalPrice = NaN;

export const loadPrice = (err, data) => {
  if (err) {
    renderModal(err);
    return;
  }
  currentTotalPrice = +data;
  totalPrice.textContent = `$${currentTotalPrice}`;
};

export const addCmsPrice = (price, count) => {
  currentTotalPrice += +price * +count;
  totalPrice.textContent = `$${currentTotalPrice}`;
};

export const removeCmsPrice = (price, count) => {
  currentTotalPrice -= +price * +count;
  totalPrice.textContent = `$${currentTotalPrice}`;
};
