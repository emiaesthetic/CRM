export const createBtn = ({className, type, text, ariaLabel, icon}) => {
  const button = document.createElement('button');
  button.className = className;
  button.type = type;
  button.ariaLabel = ariaLabel;
  button.textContent ??= text;

  if (icon) button.append(icon);

  return button;
};
