declare module 'good-storage' {
  export function get(key: string, def: any): any;
  export function set(key: string, val: any): any;
  export function remove(key: string): any;
}
