import {fetchRequest} from './modules/api.js';
import {renderGoods, renderTable, renderModal} from './modules/render.js';
import {loadPrice} from './modules/helpers/calculatePrice.js';

{
  const init = async () => {
    const pathGoods = 'api/goods?page=2';
    const allRow = await fetchRequest(pathGoods, {callback: renderGoods});

    const table = renderTable();
    table.tbody.append(...allRow);

    const pathPrice = 'api/total';
    fetchRequest(pathPrice, {callback: loadPrice});

    const btnAdd = document.querySelector('#addProduct');
    btnAdd.addEventListener('click', async () => {
      await renderModal();
    });
  };

  window.crmInit = init;
}
