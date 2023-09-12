import { Color, HSL, HWB, LAB, LCH, OKLAB, OKLCH, RGB } from "./types";

function isColorType<T extends Color>(color: T, keys: (keyof T)[]) {
  return keys.every((key) => color[key] != null);
}

export function isRGB(color: Color): color is RGB<number> {
  return isColorType<RGB<number>>(color as RGB<number>, ["r", "g", "b"]);
}

export function isHSL(color: Color): color is HSL<number> {
  return isColorType<HSL<number>>(color as HSL<number>, ["h", "s", "l"]);
}

export function isHWB(color: Color): color is HWB<number> {
  return isColorType<HWB<number>>(color as HWB<number>, ["h", "w", "b"]);
}

export function isLAB(color: Color): color is LAB<number> {
  return isColorType<LAB<number>>(color as LAB<number>, ["l", "a", "b"]);
}

export function isLCH(color: Color): color is LCH<number> {
  return isColorType<LCH<number>>(color as LCH<number>, ["l", "c", "h"]);
}

export function isOKLAB(color: Color): color is OKLAB<number> {
  return isColorType<OKLAB<number>>(color as OKLAB<number>, [
    "l",
    "a",
    "b",
    "ok",
  ]);
}

export function isOKLCH(color: Color): color is OKLCH<number> {
  return isColorType<OKLCH<number>>(color as OKLCH<number>, [
    "l",
    "c",
    "h",
    "ok",
  ]);
}

export function isPercentage(value: string) {
  return value.indexOf("%") !== -1;
}

export function isGrad(value: string) {
  return value.indexOf("grad") !== -1;
}

export function isRad(value: string) {
  return value.indexOf("rad") !== -1;
}

export function isTurn(value: string) {
  return value.indexOf("turn") !== -1;
}
