import { lazy as ReactLazy, ComponentClass, FunctionComponent } from 'react';

type ComponentType<T = any> = ComponentClass<T> | FunctionComponent<T>;

export function lazy<T extends { [V in K]: ComponentType }, K extends keyof T>(
  factory: () => Promise<T>,
  key: K
) {
  return ReactLazy(() => factory().then(cImport => ({ default: cImport[key] })));
}