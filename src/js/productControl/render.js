import {createFilterBtn, createSearchForm, createAddBtn} from './elements.js';
import {attachControlEventListeners} from './handlers.js';

export const renderControlPanel = () => {
  const filterBtn = createFilterBtn();
  const searchForm = createSearchForm();
  const addBtn = createAddBtn();

  const wrapper = document.querySelector('#controlWrapper');
  wrapper.append(filterBtn, searchForm, addBtn);

  attachControlEventListeners(searchForm, addBtn);
};
