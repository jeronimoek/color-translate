import {
  clampHexColor,
  clampHslColor,
  clampHwbColor,
  clampLabColor,
  clampLchColor,
  clampOklabColor,
  clampOklchColor,
  clampRgbColor,
} from "./clamp";
import { AngleUnit } from "./enum";
import { merge, round } from "./helper";
import {
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

function stringifyDeg(angle: number, options: Options) {
  const { maxDigits, angleUnit } = options;
  switch (angleUnit) {
    case AngleUnit.GRAD:
      return round(degToGrad(angle), maxDigits) + "grad";
    case AngleUnit.RAD:
      return round(degToRad(angle), maxDigits) + "rad";
    case AngleUnit.TURN:
      return round(degToTurn(angle), maxDigits) + "turn";
    case AngleUnit.NONE:
      return round(angle, maxDigits);
    case AngleUnit.DEG:
    default:
      return round(angle, maxDigits) + "deg";
  }
}

export function rgbToString(
  this: RGB<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { r, g, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ r, g, b, alpha } = clampRgbColor({ r, g, b, alpha }));
  }

  const { maxDigits } = stringOptions;
  const format = alpha === 1 ? "rgb" : "rgba";

  return genericToString(
    format,
    [
      round(r, maxDigits),
      round(g, maxDigits),
      round(b, maxDigits),
      round(alpha, maxDigits),
    ],
    stringOptions
  );
}

export function hslToString(
  this: HSL<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { h, s, l, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ h, s, l, alpha } = clampHslColor({ h, s, l, alpha }));
  }

  const { maxDigits } = stringOptions;
  const format = alpha === 1 ? "hsl" : "hsla";
  return genericToString(
    format,
    [
      stringifyDeg(h, stringOptions),
      round(s, maxDigits) + "%",
      round(l, maxDigits) + "%",
      round(alpha, maxDigits),
    ],
    stringOptions
  );
}

export function hwbToString(
  this: HWB<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { h, w, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ h, w, b, alpha } = clampHwbColor({ h, w, b, alpha }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    "hwb",
    [
      stringifyDeg(h, stringOptions),
      round(w, maxDigits) + "%",
      round(b, maxDigits) + "%",
      round(alpha, maxDigits),
    ],
    stringOptions
  );
}

export function labToString(
  this: LAB<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { l, a, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, a, b, alpha } = clampLabColor({ l, a, b, alpha }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    "lab",
    [
      round(l, maxDigits),
      round(a, maxDigits),
      round(b, maxDigits),
      round(alpha, maxDigits),
    ],
    stringOptions
  );
}

export function lchToString(
  this: LCH<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { l, c, h, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, c, h, alpha } = clampLchColor({ l, c, h, alpha }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    "lch",
    [
      round(l, maxDigits),
      round(c, maxDigits),
      stringifyDeg(h, stringOptions),
      round(alpha, maxDigits),
    ],
    stringOptions
  );
}

export function hexToString(
  this: HEX & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { r, g, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ r, g, b, alpha } = clampHexColor({ r, g, b, alpha }));
  }

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
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { l, a, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, a, b, alpha } = clampOklabColor({ l, a, b, alpha, ok: true }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    "oklab",
    [
      round(l, maxDigits),
      round(a, maxDigits),
      round(b, maxDigits),
      round(alpha, maxDigits),
    ],
    stringOptions
  );
}

export function oklchToString(
  this: OKLCH<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { l, c, h, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, c, h, alpha } = clampOklchColor({ l, c, h, alpha, ok: true }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    "oklch",
    [
      round(l, maxDigits),
      round(c, maxDigits),
      stringifyDeg(h, stringOptions),
      round(alpha, maxDigits),
    ],
    stringOptions
  );
}
