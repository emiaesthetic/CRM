export const validateDescription = (description) => {
  const minLength = 80;
  const pattern = /^[А-Яа-яЁё\s]+$/;

  description.setCustomValidity('');

  const value = description.value.trim();
  if (!pattern.test(value)) {
    description.setCustomValidity('Только кириллица и пробел');
  } else if (value.length < minLength) {
    description.setCustomValidity('Не менее 80 символов');
  }

  description.reportValidity();
};
