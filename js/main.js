import {loadPage} from './modules/render.js';
import './modules/controls.js';
{
  const init = () => {
    loadPage();
  };

  window.crmInit = init;
}
