const totalPrice = document.querySelector('#cmsPrice');
let currentTotalPrice = 0;

export const updateDisplayedPrice = (price) => {
  currentTotalPrice = Number(price);
  totalPrice.textContent = `$${price}`;
};

export const increaseTotalPrice = (price, count) => {
  currentTotalPrice += Number(price) * Number(count);
  updateDisplayedPrice(currentTotalPrice);
};

export const decreaseTotalPrice = (price, count) => {
  currentTotalPrice -= Number(price) * Number(count);
  updateDisplayedPrice(currentTotalPrice);
};

export const calculateProductPrice = (price, count, discount = 0) => {
  const priceValue = Number(price) || 0;
  const countValue = Number(count) || 0;
  const discountValue = Number(discount) || 0;

  const total = priceValue * countValue * (1 - discountValue / 100);
  return total;
};

export const encodeImage = image => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', err => {
    reject(err);
  });

  reader.readAsDataURL(image);
});

export const debounce = (func, waitTime) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, waitTime);
  };
};
