type UnknownObject = Record<string, any>;

export function definedProps<T extends UnknownObject>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as T;
}

export function merge<T1 extends UnknownObject, T2 extends UnknownObject>(
  obj1: T1,
  obj2: T2
): T1 & T2 {
  return { ...obj1, ...definedProps(obj2) };
}
