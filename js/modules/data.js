export const goods = [
  {
    'id': 253842678,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': 'Смартфон Xiaomi – это представитель флагманской линейки.',
    'category': 'mobile-phone',
    'discount': false,
    'count': 3,
    'units': 'шт',
    'image': '/img/goods/phone.jpg',
  },
  {
    'id': 296378448,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч.',
    'category': 'toys',
    'discount': 5,
    'count': 1,
    'units': 'шт',
    'image': '/img/goods/auto.jpg',
  },
  {
    'id': 215796548,
    'title': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': 'Всего лишь один шаг сделает ваш телевизор умным.',
    'category': 'tv-box',
    'discount': 15,
    'count': 4,
    'units': 'шт',
    'image': '/img/goods/television.jpg',
  },
  {
    'id': 246258248,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': 'Витая пара Proconnect 01-0043-25 является сетевым кабелем.',
    'category': 'cables',
    'discount': false,
    'count': 420,
    'units': 'v',
    'image': '/img/goods/internet.jpg',
  },
];

export const addProduct = (product) => {
  goods.push(product);
};

export const deleteProduct = (idProduct) => {
  const indexProduct = goods.findIndex(product => product.id === +idProduct);
  goods.splice(indexProduct, 1);
};

const getLastProductId = () => [...goods]
    .sort((a, b) => (a['id'] > b['id'] ? 1 : -1)).at(-1).id;

export const addProductId = (newProduct) => {
  const lastProductId = getLastProductId();
  newProduct.id = lastProductId + 1;

  return newProduct;
};

export const getTotalPrice = () => goods
    .reduce((acc, product) => acc + (product.price * product.count), 0);
