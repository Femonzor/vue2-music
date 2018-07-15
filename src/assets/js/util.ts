export const pad = (number: number, length: number = 2): string => {
  return (Array(length).join('0') + number).slice(-length);
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const shuffle = (array: Array<any>): Array<any> => {
  for (let i = 0, len = array.length; i < array.length; i++) {
    let j = getRandomInt(0, i);
    array[i] = [array[j], (array[j] = array[i])][0];
  }
  return array;
};
