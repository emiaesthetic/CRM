import JustValidate from 'just-validate';

export const validateAndSubmitForm = (form, onSuccess) => {
  const validator = new JustValidate(form, {validateBeforeSubmitting: false});

  validator
      .addField(form.title, [
        {
          rule: 'required',
          errorMessage: 'Введите название товара',
        },
        {
          rule: 'minLength',
          value: 2,
          errorMessage: 'Минимум 2 символа',
        },
      ])
      .addField(form.description, [
        {
          rule: 'required',
          errorMessage: 'Введите описание товара',
        },
        {
          rule: 'minLength',
          value: 80,
          errorMessage: 'Минимум 80 символов',
        },
      ])
      .addField(form.category, [
        {
          rule: 'required',
          errorMessage: 'Выберите категорию товара',
        },
      ])
      .addField(form.units, [
        {
          rule: 'required',
          errorMessage: 'Введите единицу измерения товара',
        },
        {
          rule: 'customRegexp',
          value: /^[а-яё]+$/i,
          errorMessage: 'Используйте только кириллицу',
        },
      ])
      .addField(form.count, [
        {
          rule: 'required',
          errorMessage: 'Введите количество товара',
        },
        {
          rule: 'number',
          errorMessage: 'Значение должно быть числом',
        },
      ])
      .addField(form.discount, [
        {
          rule: 'number',
          errorMessage: 'Значение должно быть числом',
        },
      ])
      .addField(form.price, [
        {
          rule: 'required',
          errorMessage: 'Введите цену товара',
        },
        {
          rule: 'number',
          errorMessage: 'Значение должно быть числом',
        },
      ])
      .addField(form.image, [
        {
          rule: 'files',
          value: {
            files: {
              extensions: ['jpeg', 'jpg', 'png'],
              maxSize: 1024 * 1024,
              types: ['image/jpeg', 'image/jpg', 'image/png'],
            },
          },
          errorMessage: ' ',
        },
      ])
      .onSuccess((event) => {
        event.preventDefault();
        onSuccess(event);
      });

  Object.values(validator.fields).map(field => {
    field.elem.addEventListener('blur', () => {
      validator.revalidateField(field.elem);
    });
  });
};
