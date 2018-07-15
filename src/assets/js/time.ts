import { pad } from '@/assets/js/util';

export const format = (interval: number): string => {
  interval |= 0;
  const minute = (interval / 60) | 0;
  const second = pad(interval % 60);
  return `${minute}:${second}`;
};
