export const addClass = (el: HTMLElement, className: string): void => {
  if (hasClass(el, className)) return;
  el.classList.add(className);
};

export const hasClass = (el: HTMLElement, className: string): boolean => {
  let reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
  return reg.test(el.className);
};

export const getData = (
  /** cast type warn, so use any */
  el: any,
  name: string,
  val?: string | number,
): void | string | null => {
  name = `data-${name}`;
  if (val) {
    return el.setAttribute(name, val + '');
  } else {
    return el.getAttribute(name);
  }
};
