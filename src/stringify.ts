import {
  clampA98Color,
  clampCmykColor,
  clampHexColor,
  clampHslColor,
  clampHwbColor,
  clampLabColor,
  clampLchColor,
  clampOklabColor,
  clampOklchColor,
  clampRgbColor,
} from "./clamp";
import { AngleUnit, ColorFormat } from "./enum";
import { merge, round } from "./helper";
import {
  A98,
  CMYK,
  GetColor,
  HEX,
  HSL,
  HWB,
  LAB,
  LCH,
  OKLAB,
  OKLCH,
  RGB,
  StringOptions,
  ValuesArray,
} from "./types";
import { degToGrad, degToRad, degToTurn } from "./utils";

function formatAllowLegacy(format: string) {
  const allowedLegacyFormats: string[] = [
    ColorFormat.RGB,
    ColorFormat.RGBA,
    ColorFormat.HSL,
    ColorFormat.HSLA,
  ];
  return allowedLegacyFormats.includes(format);
}

function genericToString(
  format: string,
  values: ValuesArray,
  _alpha: number,
  { legacy, spaced, maxDigits }: StringOptions
) {
  const alpha = round(_alpha, maxDigits);

  let separator;
  let alphaSeparator;

  if (legacy && formatAllowLegacy(format)) {
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

  return `${format}(${values.join(separator)}${
    +alpha !== 1 ? alphaSeparator + alpha : ""
  })`;
}

function stringifyDeg(angle: number, options: StringOptions) {
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

export function a98ToString(
  this: A98<number> & GetColor,
  customOptions: Partial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { r, g, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ r, g, b, alpha } = clampA98Color({ r, g, b, a98: true, alpha }));
  }

  const { maxDigits } = stringOptions;

  return genericToString(
    "color",
    ["a98-rgb", round(r, maxDigits), round(g, maxDigits), round(b, maxDigits)],
    alpha,
    stringOptions
  );
}

export function rgbToString(
  this: RGB<number> & GetColor,
  customOptions: Partial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { r, g, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ r, g, b, alpha } = clampRgbColor({ r, g, b, alpha }));
  }

  const { maxDigits } = stringOptions;
  const format = alpha === 1 ? ColorFormat.RGB : ColorFormat.RGBA;

  return genericToString(
    format,
    [round(r, maxDigits), round(g, maxDigits), round(b, maxDigits)],
    alpha,
    stringOptions
  );
}

export function hslToString(
  this: HSL<number> & GetColor,
  customOptions: Partial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { h, s, l, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ h, s, l, alpha } = clampHslColor({ h, s, l, alpha }));
  }

  const { maxDigits } = stringOptions;
  const format = alpha === 1 ? ColorFormat.HSL : ColorFormat.HSLA;
  return genericToString(
    format,
    [
      stringifyDeg(h, stringOptions),
      round(s * 100, maxDigits) + "%",
      round(l * 100, maxDigits) + "%",
    ],
    alpha,
    stringOptions
  );
}

export function hwbToString(
  this: HWB<number> & GetColor,
  customOptions: Partial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { h, w, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ h, w, b, alpha } = clampHwbColor({ h, w, b, alpha }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    ColorFormat.HWB,
    [
      stringifyDeg(h, stringOptions),
      round(w * 100, maxDigits) + "%",
      round(b * 100, maxDigits) + "%",
    ],
    alpha,
    stringOptions
  );
}

export function labToString(
  this: LAB<number> & GetColor,
  customOptions: Partial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { l, a, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, a, b, alpha } = clampLabColor({ l, a, b, alpha }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    ColorFormat.LAB,
    [round(l, maxDigits), round(a, maxDigits), round(b, maxDigits)],
    alpha,
    stringOptions
  );
}

export function lchToString(
  this: LCH<number> & GetColor,
  customOptions: Partial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { l, c, h, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, c, h, alpha } = clampLchColor({ l, c, h, alpha }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    ColorFormat.LCH,
    [round(l, maxDigits), round(c, maxDigits), stringifyDeg(h, stringOptions)],
    alpha,
    stringOptions
  );
}

export function hexToString(
  this: HEX & GetColor,
  customOptions: Partial<StringOptions> = {},
  is0x = false
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

  const prefix = is0x ? "0x" : "#";

  return prefix + values.join("");
}

export function hex0xToString(
  this: HEX & GetColor,
  customOptions: Partial<StringOptions> = {}
) {
  return hexToString.bind(this)(customOptions, true);
}

export function oklabToString(
  this: OKLAB<number> & GetColor,
  customOptions: Partial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { l, a, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, a, b, alpha } = clampOklabColor({ l, a, b, alpha, ok: true }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    ColorFormat.OKLAB,
    [round(l, maxDigits), round(a, maxDigits), round(b, maxDigits)],
    alpha,
    stringOptions
  );
}

export function oklchToString(
  this: OKLCH<number> & GetColor,
  customOptions: Partial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { l, c, h, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, c, h, alpha } = clampOklchColor({ l, c, h, alpha, ok: true }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    ColorFormat.OKLCH,
    [round(l, maxDigits), round(c, maxDigits), stringifyDeg(h, stringOptions)],
    alpha,
    stringOptions
  );
}

export function cmykToString(
  this: CMYK<number> & GetColor,
  customOptions: Partial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = merge(options, customOptions);
  let { c, m, y, k, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ c, m, y, k, alpha } = clampCmykColor({ c, m, y, k, alpha }));
  }

  const { maxDigits } = stringOptions;
  return genericToString(
    ColorFormat.DEVICE_CMYK,
    [
      round(c, maxDigits),
      round(m, maxDigits),
      round(y, maxDigits),
      round(k, maxDigits),
    ],
    alpha,
    stringOptions
  );
}
