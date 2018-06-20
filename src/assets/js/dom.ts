export const addClass = (el: HTMLElement, className: string): void => {
  if (hasClass(el, className)) return;
  el.classList.add(className);
};

export const hasClass = (el: HTMLElement, className: string): boolean => {
  let reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
  return reg.test(el.className);
};