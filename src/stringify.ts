import { AngleUnit } from "./enum";
import { merge, round } from "./helper";
import {
  AngleUnitType,
  ColorFormat,
  GetColor,
  HEX,
  HSL,
  HWB,
  LAB,
  LCH,
  OKLAB,
  OKLCH,
  Options,
  RGB,
  ValuesArray,
} from "./types";
import { degToGrad, degToRad, degToTurn } from "./utils";

function genericToString(
  format: ColorFormat,
  values: ValuesArray,
  { legacy, spaced }: Options
) {
  let separator;
  let alphaSeparator;

  if (legacy) {
    if (spaced) {
      separator = ", ";
      alphaSeparator = ", ";
    } else {
      separator = ",";
      alphaSeparator = ",";
    }
  } else {
    separator = " ";
    if (spaced) {
      alphaSeparator = " / ";
    } else {
      alphaSeparator = "/";
    }
  }

  return `${format}(${values[0]}${separator}${values[1]}${separator}${
    values[2]
  }${+values[3] !== 1 ? alphaSeparator + values[3] : ""})`;
}

export function stringifyDeg(angle: number, angleUnit: AngleUnitType) {
  switch (angleUnit) {
    case AngleUnit.GRAD:
      return round(degToGrad(angle)) + "grad";
    case AngleUnit.RAD:
      return round(degToRad(angle)) + "rad";
    case AngleUnit.TURN:
      return round(degToTurn(angle)) + "turn";
    case AngleUnit.NONE:
    case AngleUnit.DEG:
    default:
      return round(angle) + "deg";
  }
}

export function rgbToString(
  this: RGB<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { r, g, b, alpha, options } = this;
  const stringOptions = merge(options, customOptions);
  const format = alpha === 1 ? "rgb" : "rgba";
  return genericToString(
    format,
    [round(r), round(g), round(b), round(alpha)],
    stringOptions
  );
}

export function hslToString(
  this: HSL<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { h, s, l, alpha, options } = this;
  const stringOptions = merge(options, customOptions);
  const format = alpha === 1 ? "hsl" : "hsla";
  return genericToString(
    format,
    [
      stringifyDeg(round(h), stringOptions.angleUnit),
      round(s) + "%",
      round(l) + "%",
      round(alpha),
    ],
    stringOptions
  );
}

export function hwbToString(
  this: HWB<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { h, w, b, alpha, options } = this;
  const stringOptions = merge(options, customOptions);
  return genericToString(
    "hwb",
    [
      stringifyDeg(round(h), stringOptions.angleUnit),
      round(w) + "%",
      round(b) + "%",
      round(alpha),
    ],
    stringOptions
  );
}

export function labToString(
  this: LAB<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { l, a, b, alpha, options } = this;
  const stringOptions = merge(options, customOptions);
  return genericToString(
    "lab",
    [round(l), round(a), round(b), round(alpha)],
    stringOptions
  );
}

export function lchToString(
  this: LCH<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { l, c, h, alpha, options } = this;
  const stringOptions = merge(options, customOptions);
  return genericToString(
    "lch",
    [round(l), round(c), round(h), round(alpha)],
    stringOptions
  );
}

export function hexToString(this: HEX & GetColor) {
  const { r, g, b, alpha } = this;
  const values = [r, g, b];
  if (alpha !== "FF") {
    values.push(alpha);
  }
  return "#" + values.join("");
}

export function oklabToString(
  this: OKLAB<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { l, a, b, alpha, options } = this;
  const stringOptions = merge(options, customOptions);
  return genericToString(
    "oklab",
    [round(l), round(a), round(b), round(alpha)],
    stringOptions
  );
}

export function oklchToString(
  this: OKLCH<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { l, c, h, alpha, options } = this;
  const stringOptions = merge(options, customOptions);
  return genericToString(
    "oklch",
    [round(l), round(c), round(h), round(alpha)],
    stringOptions
  );
}
