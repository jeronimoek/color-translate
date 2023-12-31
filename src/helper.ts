type UnknownObject = Record<string, any>;

function definedProps<T extends UnknownObject>(obj: T): T {
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

export function round(number: number, decimals = 2) {
  return (
    Math.round((number + Number.EPSILON) * 10 ** decimals) / 10 ** decimals
  );
}
