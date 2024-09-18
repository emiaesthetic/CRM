import {renderGoods} from './productList/render.js';
import {renderControlPanel} from './productControl/render.js';
import {loadGoods, loadTotalPrice} from './fetchRequest.js';
import {updateDisplayedPrice} from './utils.js';

const renderPage = async () => {
  const data = await loadGoods();
  for (let page = 2; page <= data.pages; page++) {
    const nextData = await loadGoods(page);
    data.goods = [...data.goods, ...nextData.goods];
  }

  const totalPrice = await loadTotalPrice();

  updateDisplayedPrice(totalPrice);
  renderControlPanel();
  renderGoods(data.goods);
};

renderPage();
