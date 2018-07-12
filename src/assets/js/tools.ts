export const pad = (number: number, length: number = 2) => {
  return (Array(length).join('0') + number).slice(-length);
};
