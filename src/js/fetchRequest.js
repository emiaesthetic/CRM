import {serverURL} from './constants.js';

export const sendRequest = async (path, {
  method = 'GET',
  headers,
  body,
  callback,
}) => {
  try {
    const url = `${serverURL}${path}`;
    const options = {
      method,
    };

    if (headers) options.headers = headers;
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Ошибка ${response.status}`);

    const data = await response.json();
    if (callback) return callback(null, data);
  } catch (error) {
    return callback(error);
  }
};

export const loadGoods = async (page = 1) => await sendRequest(
    `api/goods?page=${page}`, {
      callback: (error, data) => {
        if (error) {
          console.error(error);
          return;
        }
        return data;
      },
    },
);

export const loadCategories = async () => await sendRequest('api/categories', {
  callback: (error, categories) => {
    if (error) {
      console.error(error);
      return;
    }
    return categories;
  },
});

export const loadTotalPrice = async () => await sendRequest('api/total', {
  callback: (error, totalPrice) => {
    if (error) {
      console.error(error);
      return;
    }
    return totalPrice;
  },
});

export const loadSearch = async (query, page) => await sendRequest(
    `api/goods?${page ? `page=${page}&` : ''}search=${query || ''}`, {
      callback: (error, data) => {
        if (error) {
          console.error(error);
          return;
        }
        return data;
      },
    },
);
