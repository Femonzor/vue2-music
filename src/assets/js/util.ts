export const pad = (number: number, length: number = 2): string => {
  return (Array(length).join('0') + number).slice(-length);
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const shuffle = (array: Array<any>): Array<any> => {
  let result = array.slice();
  for (let i = 0, len = result.length; i < result.length; i++) {
    let j = getRandomInt(0, i);
    result[i] = [result[j], (result[j] = result[i])][0];
  }
  return result;
};

export const debounce = (func: Function, delay: number) => {
  let timer: any;
  return (...args: Array<any>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(global, args);
    }, delay);
  };
};
