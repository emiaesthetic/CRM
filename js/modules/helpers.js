import {errorOverlay, errorMessage} from './ui/getElements.js';

export const openModal = (overlay) => overlay.classList.add('active');

export const closeModal = (overlay) => overlay.classList.remove('active');

export const showError = (error) => {
  errorMessage.textContent = error.message || 'Что-то пошло не так';
  openModal(errorOverlay);
};

export const getTotalProductPrice = (count, price) => {
  price = price.startsWith('$') ? price.slice(1) : price;
  return Number(count) * Number(price);
};

export const updateTotalPrice = (totalPrice, totalProductPrice, sign) => {
  totalPrice = Number(totalPrice.slice(1));

  if (sign === '+') {
    totalPrice += totalProductPrice;
  } else if (sign === '-') {
    totalPrice -= totalProductPrice;
  }

  return totalPrice;
};
