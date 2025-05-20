import { RecursivePartial } from "./types";

export function isObject(item: unknown) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function mergeDeep<T>(
  baseOriginal: T
): (partial: RecursivePartial<T>) => T {
  const base = JSON.parse(JSON.stringify(baseOriginal)); // Deep clone the base object
  return (partial: RecursivePartial<T>) => {
    if (isObject(base) && isObject(partial)) {
      for (const key in partial) {
        const value = partial[key];
        const baseValue = base[key as keyof typeof base];
        if (value !== undefined) {
          if (isObject(value) && baseValue !== undefined) {
            (base as any)[key] = mergeDeep(baseValue)(value as any);
          } else {
            (base as any)[key] = value;
          }
        }
      }
    }

    return base;
  };
}

export function round(number: number, decimals = 2) {
  return (
    Math.round((number + Number.EPSILON) * 10 ** decimals) / 10 ** decimals
  );
}
