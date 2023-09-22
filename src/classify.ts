import {
  Color,
  ColorInput,
  HSL,
  HWB,
  LAB,
  LCH,
  OKLAB,
  OKLCH,
  RGB,
} from "./types";

function isColorType<T extends Color>(color: T, keys: (keyof T)[]) {
  return keys.every((key) => color[key] != null);
}

export function isRGB(color: ColorInput): color is RGB<number> | RGB<string> {
  return isColorType<RGB<number> | RGB<string>>(
    color as RGB<number> | RGB<string>,
    ["r", "g", "b"]
  );
}

export function isHSL(color: ColorInput): color is HSL<number> | HSL<string> {
  return isColorType<HSL<number> | HSL<string>>(
    color as HSL<number> | HSL<string>,
    ["h", "s", "l"]
  );
}

export function isHWB(color: ColorInput): color is HWB<number> | HWB<string> {
  return isColorType<HWB<number> | HWB<string>>(
    color as HWB<number> | HWB<string>,
    ["h", "w", "b"]
  );
}

export function isLAB(color: ColorInput): color is LAB<number> | LAB<string> {
  return isColorType<LAB<number> | LAB<string>>(
    color as LAB<number> | LAB<string>,
    ["l", "a", "b"]
  );
}

export function isLCH(color: ColorInput): color is LCH<number> | LCH<string> {
  return isColorType<LCH<number> | LCH<string>>(
    color as LCH<number> | LCH<string>,
    ["l", "c", "h"]
  );
}

export function isOKLAB(
  color: ColorInput
): color is OKLAB<number> | OKLAB<string> {
  return isColorType<OKLAB<number> | OKLAB<string>>(
    color as OKLAB<number> | OKLAB<string>,
    ["l", "a", "b", "ok"]
  );
}

export function isOKLCH(
  color: ColorInput
): color is OKLCH<number> | OKLCH<string> {
  return isColorType<OKLCH<number> | OKLCH<string>>(
    color as OKLCH<number> | OKLCH<string>,
    ["l", "c", "h", "ok"]
  );
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
