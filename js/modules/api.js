export const fetchRequest = async (path, {
  method = 'GET',
  headers,
  body,
  callback,
}) => {
  try {
    const url = `https://bristle-wonderful-eagle.glitch.me/${path}`;
    const options = {
      method,
    };

    if (headers) options.headers = headers;
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      if (callback) return callback(null, data);
    }

    throw new Error(response.statusText);
  } catch (error) {
    return callback(error);
  }
};
