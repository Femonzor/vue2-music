declare module 'create-keyframe-animation' {
  export function hasAnimation(name: string): boolean;
  export function unregisterAnimation(name: string): void;
  export function registerAnimation(opts: Object): void;
  export function runAnimation(els: HTMLElement | Array<HTMLElement>, opts: Object, cl: Function): any;
}
