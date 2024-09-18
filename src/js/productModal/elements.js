import {serverURL} from '../constants.js';

export const createPreviewImage = (src) => {
  const previewWrapper = document.createElement('div');
  previewWrapper.classList.add('form__item', 'form-preview');

  const preview = document.createElement('img');
  preview.src = src;

  previewWrapper.append(preview);

  return previewWrapper;
};

export const createPreviewError = () => {
  const previewWrapper = document.createElement('div');
  previewWrapper.classList.add('form__item', 'form-error');

  const error = document.createElement('span');
  error.classList.add('form-error__text');
  error.textContent = 'Изображение не должно превышать размер 1 Мб';

  previewWrapper.append(error);

  return previewWrapper;
};

export const createForm = ({
  id = '',
  title = '',
  description = '',
  category = '',
  units = '',
  count = '',
  discount = '',
  price = '',
  image = '',
} = {}, categories = {}) => {
  const header = document.createElement('header');
  header.classList.add('modal__header');
  header.insertAdjacentHTML('afterbegin', `
    <h2 class="modal__header-title title">
      ${id ? 'Изменить товар' : 'Добавить товар'}
    </h2>
    <span class="modal__header-product-id">id: ${id || ''}</span>
  `);

  const form = document.createElement('form');
  form.className = 'form';
  form.id = 'form';
  form.enctype = 'multipart/form-data';

  const formContent = document.createElement('fieldset');
  formContent.classList.add('form__content');
  formContent.insertAdjacentHTML('afterbegin', `
      <div class="form__item form-title">
          <label class="form__label" for="title">Наименование</label>
          <input
            class="form__input"
            type="text"
            name="title"
            id="title"
            value="${title}"
            required
          >
        </div>

        <div class="form__item form-description">
          <label class="form__label" for="description">Описание</label>
          <textarea
            class="form__input form-description__input"
            name="description"
            id="description"
            required
          >${description}</textarea>
        </div>

        <div class="form__item form-category">
          <label class="form__label" for="category">Категория</label>
          <input
            class="form__input"
            type="text"
            name="category"
            id="category"
            value="${category}"
            list="category-list"
            required
          >
          <datalist id="category-list">
            ${categories.map(item => `<option value=${item}></option>`)}
          </datalist>
        </div>

        <div class="form__item form-units">
          <label class="form__label" for="units">Единицы измерения</label>
          <input
            class="form__input"
            type="text"
            name="units"
            id="units"
            value="${units}"
            required
          >
        </div>

        <div class="form__item form-count">
          <label class="form__label" for="count">Количество</label>
          <input
            class="form__input"
            type="number"
            name="count"
            id="count"
            value="${count}"
            required
          >
        </div>

        <div class="form__item form-discount">
          <label class="form__label" for="discount">Дисконт</label>
          <input
            class="form-discount__checkbox"
            name="checkbox"
            id="checkbox"
            type="checkbox"
            ${discount ? 'checked' : ''}
          >
          <div class="form-discount__number">
            <input
              class="form__input form-discount__input"
              type="number"
              name="discount"
              id="discount"
              value="${discount || ''}"
              ${discount ? '' : 'disabled'}
            >
          </div>
        </div>

        <div class="form__item form-price">
          <label class="form__label" for="price">Цена</label>
          <input
            class="form__input"
            type="number"
            name="price"
            id="price"
            value="${price}"
            required
          >
        </div>

        <div class="form__item form-file">
          <input
            class="form-file__input"
            type="file"
            name="image"
            id="image"
          >
          <label class="form-file__label" for="image">
            Добавить изображение
          </label>
        </div>
    `);

  if (image && !image.includes('notimage.jpg')) {
    const preview = createPreviewImage(`${serverURL}${image}`);
    formContent.append(preview);
  }

  form.append(formContent);

  const footer = document.createElement('footer');
  footer.classList.add('modal__footer');
  footer.insertAdjacentHTML('afterbegin', `
    <span class="modal__footer-text total-text">
      Итоговая стоимость:
      <span class="modal__footer-price total-price" id="formPrice">
        $${(+price * +count * (1 - (+discount / 100))).toFixed(2)}
      </span>
    </span>

    <button
      class="modal__footer-button button button-reset button--purple"
      form="form"
      type="submit"
    >
      ${price ? 'Изменить товар' : 'Добавить товар'}
    </button>
  `);

  return {
    header,
    form,
    footer,
  };
};

export const createError = (text) => {
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('error__content');

  const errorCross = document.createElement('span');
  errorCross.classList.add('error__cross');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '94');
  svg.setAttribute('height', '94');
  svg.setAttribute('viewBox', '0 0 94 94');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path',
  );
  path.setAttribute('d', 'M2 2L92 92');
  path.setAttribute('stroke', '#D80101');
  path.setAttribute('stroke-width', '3');
  path.setAttribute('stroke-linecap', 'round');

  const pathTwo = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path',
  );
  pathTwo.setAttribute('d', 'M2 92L92 2');
  pathTwo.setAttribute('stroke', '#D80101');
  pathTwo.setAttribute('stroke-width', '3');
  pathTwo.setAttribute('stroke-linecap', 'round');

  svg.append(path, pathTwo);
  errorCross.append(svg);

  const h2 = document.createElement('h2');
  h2.classList.add('error__message', 'title', 'title--small');
  h2.textContent = text || 'Что-то пошло не так';

  contentWrapper.append(errorCross, h2);

  return contentWrapper;
};

export const createDeleteConfirm = (id) => {
  const confirmWrapper = document.createElement('div');
  confirmWrapper.classList.add('confirm__wrapper');
  confirmWrapper.dataset.id = id;

  const confirmText = document.createElement('p');
  confirmText.classList.add('confirm__text', 'title');
  confirmText.textContent = 'Вы действительно хотите удалить товар?';

  const btnGroup = document.createElement('div');
  btnGroup.classList.add('confirm__buttons');

  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add(
      'confirm__cancel',
      'button',
      'button-reset',
      'button--purple',
  );
  cancelBtn.textContent = 'Отмена';

  const applyBtn = document.createElement('button');
  applyBtn.classList.add(
      'confirm__apply',
      'button',
      'button-reset',
      'button--purple',
  );
  applyBtn.textContent = 'Удалить';

  btnGroup.append(cancelBtn, applyBtn);
  confirmWrapper.append(confirmText, btnGroup);

  return {
    confirmWrapper,
    applyBtn,
    cancelBtn,
  };
};

export const createModalWindow = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'active');

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal__close button button-reset button--transparent';
  closeBtn.type = 'button';
  closeBtn.ariaLabel = 'Закрыть модальное окно';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path',
  );
  path.setAttribute('d', 'M2 2L22 22');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '3');
  path.setAttribute('stroke-linecap', 'round');

  const pathTwo = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path',
  );
  pathTwo.setAttribute('d', 'M2 22L22 2');
  pathTwo.setAttribute('stroke', 'currentColor');
  pathTwo.setAttribute('stroke-width', '3');
  pathTwo.setAttribute('stroke-linecap', 'round');

  svg.append(path, pathTwo);
  closeBtn.append(svg);

  return {
    overlay,
    modalWindow,
    closeBtn,
  };
};
