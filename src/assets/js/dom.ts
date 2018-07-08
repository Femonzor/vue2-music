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

const elementStyle: CSSStyleDeclaration = document.createElement('div').style;
const vendor = (() => {
  const transformNames: any = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform',
  };
  for (let key in transformNames) {
    if (
      transformNames.hasOwnProperty(key) &&
      typeof elementStyle[transformNames[key]] !== 'undefined'
    ) {
      return key;
    }
  }
  return false;
})();

export const prefixStyle = (style: string): string => {
  if (!vendor) return '';
  if (vendor === 'standard') return style;
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
};
