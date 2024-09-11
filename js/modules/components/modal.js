import {createBtn} from './button.js';
import {createSVG} from './svg.js';
import {URL} from '../utils/constants.js';

export const createModal = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'active');

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal');

  const closeBtn = createBtn({
    className: 'modal__close button button-reset button--transparent',
    type: 'button',
    ariaLabel: 'Закрыть модальное окно',
    icon: createSVG(24, 24, [
      {
        'd': 'M2 2L22 22',
        'stroke': 'currentColor',
        'stroke-width': 3,
        'stroke-linecap': 'round',
      },
      {
        'd': 'M2 22L22 2',
        'stroke': 'currentColor',
        'stroke-width': 3,
        'stroke-linecap': 'round',
      },
    ]),
  });

  modalWindow.append(closeBtn);
  overlay.append(modalWindow);
  document.body.append(overlay);

  return {
    overlay,
    modalWindow,
    closeBtn,
  };
};

export const createPreview = (src) => {
  const previewWrapper = document.createElement('div');
  previewWrapper.classList.add('form__item', 'form-preview');

  const preview = document.createElement('img');
  preview.src = src;

  previewWrapper.append(preview);

  return previewWrapper;
};

export const createPreviewError = () => {
  const previewWrapper = document.createElement('div');
  previewWrapper.classList.add('form__item', 'form-preview');

  const error = document.createElement('span');
  error.classList.add('form-preview__error');
  error.textContent = 'Изображение не должно превышать размер 1 Мб';

  previewWrapper.append(error);

  return previewWrapper;
};

export const createForm = (data) => {
  const header = document.createElement('header');
  header.classList.add('modal__header');
  header.insertAdjacentHTML('afterbegin', `
    <h2 class="modal__header-title title">
      ${data ? 'Изменить товар' : 'Добавить товар'}
    </h2>
    <span class="modal__header-product-id">id: ${data?.id || ''}</span>
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
            value="${data?.title || ''}"
            pattern="^[А-Яа-яЁё\\s]+$"
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
          >${data?.description || ''}</textarea>
        </div>

        <div class="form__item form-category">
          <label class="form__label" for="category">Категория</label>
          <input
            class="form__input"
            type="text"
            name="category"
            id="category"
            value="${data?.category || ''}"
            pattern="^[А-Яа-яЁё\\s]+$"
            required
          >
        </div>

        <div class="form__item form-units">
          <label class="form__label" for="units">Единицы измерения</label>
          <input
            class="form__input"
            type="text"
            name="units"
            id="units"
            value="${data?.units || ''}"
            pattern="^[А-Яа-яЁё]+$"
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
            pattern="^[\\d+]+$"
            value="${data?.count || ''}"
            required
          >
        </div>

        <div class="form__item form-discount">
          <label class="form__label" for="discount">Дисконт</label>
          <input
            class="form-discount__checkbox"
            id="checkbox"
            type="checkbox"
            ${data?.discount ? 'checked' : ''}
          >
          <div class="form-discount__number">
            <input
              class="form__input form-discount__input"
              type="number"
              name="discount"
              id="discount"
              value="${data?.discount || ''}"
              pattern="^[\\d+]+$"
              disabled
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
            value="${data?.price || ''}"
            pattern="^[\\d+\\.\\d{2}]+$"
            required
          >
        </div>

        <div class="form__item form-file">
          <input
            class="form-file__input"
            type="file"
            name="file"
            id="file"
          >
          <label class="form-file__label" for="file">
            Добавить изображение
          </label>
        </div>
    `);

  if (data && data.image !== 'notimage') {
    const preview = createPreview(`${URL}${data.image}`);
    formContent.append(preview);
  }

  form.append(formContent);

  const footer = document.createElement('footer');
  footer.classList.add('modal__footer');
  footer.insertAdjacentHTML('afterbegin', `
    <span class="modal__footer-text total-text">
      Итоговая стоимость:
      <span class="modal__footer-price total-price" id="formPrice">
        $${data ?
            +data.price * +data.count * (1 - (+data.discount / 100)) :
            '0.00'}
      </span>
    </span>

    <button
      class="modal__footer-button button button-reset button--purple"
      form="form"
      type="submit"
    >
      Добавить товар
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

  const crossSVG = createSVG(94, 94, [
    {
      'd': 'M2 2L92 92',
      'stroke': '#D80101',
      'stroke-width': 3,
      'stroke-linecap': 'round',
    },
    {
      'd': 'M2 92L92 2',
      'stroke': '#D80101',
      'stroke-width': 3,
      'stroke-linecap': 'round',
    },
  ]);
  errorCross.append(crossSVG);

  const h2 = document.createElement('h2');
  h2.classList.add('error__message', 'title', 'title--small');
  h2.textContent = text || 'Что-то пошло не так';

  contentWrapper.append(errorCross, h2);

  return contentWrapper;
};
