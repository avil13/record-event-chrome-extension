export function getCssPath(pathArray: Element[]): string {
  let path = [];

  for (let i = 0; i < pathArray.length; i++) {
    const el = pathArray[i];

    if (el.nodeName === 'BODY' || el.nodeName === 'HTML') {
      break;
    }

    if (el.id) {
      path.push(`#${el.id}`);
    } else if (el.classList && el.classList.length) {
      const elementClasses = Array.from(el.classList)
        .map(cl => `.${cl}`)
        .join('');
      path.push(elementClasses);
    } else if (el.tagName) {
      path.push(el.tagName.toLowerCase());
    }
  }

  return path.reverse().join(' > ');
}
