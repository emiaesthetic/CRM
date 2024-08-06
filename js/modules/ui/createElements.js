const createSVG = (width, height, tags) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('fill', 'none');

  tags.forEach(tag => {
    const path = document.createElementNS(svg.namespaceURI, 'path');
    for (const [key, value] of Object.entries(tag)) {
      path.setAttribute(key, value);
    }
    svg.append(path);
  });

  return svg;
};

const createBtn = ({className, type, ariaLabel, icon}) => {
  const button = document.createElement('button');
  button.className = className;
  button.type = type;
  button.ariaLabel = ariaLabel;
  button.append(icon);
  return button;
};

export const createRow = ({
  id,
  title,
  category,
  price,
  count,
  units,
  image,
}) => {
  const tr = document.createElement('tr');
  tr.classList.add('table__row');
  tr.dataset.id = id;
  tr.dataset.pic = image ?? '/img/goods/phone.jpg';

  tr.insertAdjacentHTML(
      'beforeend',
      `
    <td class="table__data">${id}</td>
    <td class="table__data">${title}</td>
    <td class="table__data">${category}</td>
    <td class="table__data">${units}</td>
    <td class="table__data" id="count">${count}</td>
    <td class="table__data" id="price">$${price}</td>
    <td class="table__data">$${price * count}</td>
  `);

  const btnGroup = document.createElement('td');
  btnGroup.classList.add('table__data');

  const showBtn = createBtn({
    className: 'table__button button button-reset button--transparent show',
    type: 'button',
    ariaLabel: 'Открыть изображение',
    icon: createSVG(20, 20, [
      {
        'd': `
        M17.7778 2.22223H2.22223C1.92754 2.22223 1.64493 2.33929 1.43655
        2.54767C1.22818 2.75604 1.11111 3.03866 1.11111 3.33334V16.6667C1.11111
        16.9614 1.22818 17.244 1.43655 17.4523C1.64493 17.6607 1.92754 17.7778
        2.22223 17.7778H17.7778C18.0725 17.7778 18.3551 17.6607 18.5635
        17.4523C18.7718 17.244 18.8889 16.9614 18.8889 16.6667V3.33334C18.8889
        3.03866 18.7718 2.75604 18.5635 2.54767C18.3551 2.33929 18.0725 2.22223
        17.7778 2.22223ZM2.22223 16.6667V3.33334H17.7778V16.6667H2.22223Z
        `,
        'fill': 'currentColor',
      },
      {
        'd': `
          M4.95555 7.77779C5.28518 7.77779 5.60741 7.68004 5.8815
          7.49691C6.15558 7.31377 6.3692 7.05347 6.49535 6.74893C6.62149 6.44439
          6.6545 6.10928 6.59019 5.78598C6.52588 5.46267 6.36715 5.1657 6.13406
          4.93261C5.90097 4.69953 5.604 4.54079 5.2807 4.47648C4.9574 4.41217
          4.62228 4.44518 4.31774 4.57133C4.0132 4.69747 3.7529 4.91109 3.56976
          5.18518C3.38663 5.45926 3.28888 5.78149 3.28888 6.11113C3.28888
          6.55315 3.46447 6.97708 3.77703 7.28964C4.0896 7.6022 4.51352 7.77779
          4.95555 7.77779ZM4.95555 5.22224C5.13158 5.22114 5.30399 5.27233
          5.45089 5.36933C5.5978 5.46633 5.71259 5.60477 5.78072 5.7671C5.84885
          5.92942 5.86725 6.10832 5.83358 6.28111C5.79992 6.4539 5.7157 6.6128
          5.59161 6.73767C5.46752 6.86254 5.30915 6.94776 5.13657
          6.98251C4.96399 7.01726 4.78498 6.99998 4.62223 6.93287C4.45949
          6.86576 4.32033 6.75183 4.22241 6.60554C4.12449 6.45924 4.07222
          6.28717 4.07221 6.11113C4.07367 5.8773 4.1672 5.65347 4.33255
          5.48812C4.49789 5.32278 4.72172 5.22925 4.95555 5.22779V5.22224Z
        `,
        'fill': 'currentColor',
      },
      {
        'd': `
          M12.6555 8.53887L9.65555 11.5389L7.43332 9.31665C7.32923 9.21318
          7.18843 9.1551 7.04166 9.1551C6.89489 9.1551 6.75408 9.21318 6.64999
          9.31665L3.28888 12.7222V14.2944L7.0611 10.5222L8.88888 12.3222L6.80555
          14.4055H8.33332L13.0278 9.71109L16.6667 13.3333V11.7666L13.4389
          8.53887C13.3348 8.4354 13.194 8.37732 13.0472 8.37732C12.9004 8.37732
          12.7596 8.4354 12.6555 8.53887Z
        `,
        'fill': 'currentColor',
      },
    ]),
  });

  const editBtn = createBtn({
    className: 'table__button button button-reset button--transparent edit',
    type: 'button',
    ariaLabel: 'Открыть изображение',
    icon: createSVG(20, 20, [
      {
        'd': `
          M15.5629 4.86076L17.6394 6.93627L15.5629 4.86076ZM16.8982
          3.03231L11.2834 8.64707C10.9933 8.93678 10.7955 9.30589 10.7148
          9.70787L10.1962 12.304L12.7923 11.7844C13.1942 11.704 13.5629
          11.5069 13.8531 11.2167L19.4678 5.60195C19.6366 5.43322 19.7704
          5.23292 19.8617 5.01247C19.953 4.79202 20 4.55574 20 4.31713C20
          4.07852 19.953 3.84224 19.8617 3.62179C19.7704 3.40134 19.6366
          3.20104 19.4678 3.03231C19.2991 2.86359 19.0988 2.72975 18.8784
          2.63843C18.6579 2.54712 18.4216 2.50012 18.183 2.50012C17.9444
          2.50012 17.7081 2.54712 17.4877 2.63843C17.2672 2.72975 17.0669
          2.86359 16.8982 3.03231V3.03231Z
        `,
        'stroke': 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
      {
        'd': `
          M18.0394 14.2648V17.206C18.0394 17.726 17.8328 18.2248 17.4651
          18.5925C17.0973 18.9602 16.5986 19.1668 16.0786
          19.1668H5.29415C4.77411 19.1668 4.27537 18.9602 3.90765
          18.5925C3.53993 18.2248 3.33334 17.726 3.33334 17.206V6.42156C3.33334
          5.90152 3.53993 5.40278 3.90765 5.03506C4.27537 4.66734 4.77411
          4.46075 5.29415 4.46075H8.23535
        `,
        'stroke': 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
    ]),
  });

  const deleteBtn = createBtn({
    className: 'table__button button button-reset button--transparent delete',
    type: 'button',
    ariaLabel: 'Открыть изображение',
    icon: createSVG(20, 20, [
      {
        'd': `
          M7.03125 3.59375H6.875C6.96094 3.59375 7.03125 3.52344 7.03125
          3.4375V3.59375H12.9688V3.4375C12.9688 3.52344 13.0391 3.59375
          13.125 3.59375H12.9688V5H14.375V3.4375C14.375 2.74805 13.8145 2.1875
          13.125 2.1875H6.875C6.18555 2.1875 5.625 2.74805 5.625
          3.4375V5H7.03125V3.59375ZM16.875 5H3.125C2.7793 5 2.5 5.2793
          2.5 5.625V6.25C2.5 6.33594 2.57031 6.40625 2.65625
          6.40625H3.83594L4.31836 16.6211C4.34961 17.2871 4.90039 17.8125
          5.56641 17.8125H14.4336C15.1016 17.8125 15.6504 17.2891 15.6816
          16.6211L16.1641 6.40625H17.3438C17.4297 6.40625 17.5 6.33594 17.5
          6.25V5.625C17.5 5.2793 17.2207 5 16.875 5ZM14.2832
          16.4062H5.7168L5.24414 6.40625H14.7559L14.2832 16.4062Z
        `,
        'fill': 'currentColor',
      },
    ]),
  });

  btnGroup.append(showBtn, editBtn, deleteBtn);
  tr.append(btnGroup);

  return tr;
};
