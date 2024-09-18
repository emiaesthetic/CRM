const totalPrice = document.querySelector('#cmsPrice');
let currentTotalPrice = 0;

export const loadPrice = (error, data) => {
  if (error) {
    console.warn(error);
    return;
  }
  currentTotalPrice = +data;
  totalPrice.textContent = `$${currentTotalPrice}`;
};

const updateDisplayedPrice = (price) => {
  totalPrice.textContent = `${price.toFixed(2)}`;
};

export const increaseTotalPrice = (price, count) => {
  currentTotalPrice += +price * +count;
  updateDisplayedPrice(currentTotalPrice);
};

export const decreaseTotalPrice = (price, count) => {
  currentTotalPrice -= +price * +count;
  updateDisplayedPrice(currentTotalPrice);
};

export const calculateTotalPrice = (price, count, discount = 0) => {
  const priceValue = Number(price) || 0;
  const countValue = Number(count) || 0;
  const discountValue = Number(discount) || 0;

  const total = priceValue * countValue * (1 - discountValue / 100);
  return `$${total.toFixed(0)}`;
};
