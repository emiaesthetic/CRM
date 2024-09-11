export const createSVG = (width, height, tags) => {
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
