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
import { customToString } from "./customToString";
import { AngleUnit, ColorFormat, ColorOutput } from "./enum";
import { getOutputOptions } from "./getOutputOptions";
import { mergeDeep, round } from "./helper";
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
  RecursivePartial,
  RGB,
  StringOptions,
  ValuesArray,
} from "./types";
import { degToGrad, degToRad, degToTurn, remap } from "./utils";

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
  customOptions: RecursivePartial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { r, g, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ r, g, b, alpha } = clampA98Color({ r, g, b, a98: true, alpha }));
  }

  if (stringOptions.customOutputs?.a98) {
    return customToString(
      {
        r,
        g,
        b,
        alpha,
      } as A98<number>,
      getOutputOptions(stringOptions, ColorOutput.A98),
      stringOptions
    );
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
  customOptions: RecursivePartial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { r, g, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ r, g, b, alpha } = clampRgbColor({ r, g, b, alpha }));
  }

  if (stringOptions.customOutputs?.rgb) {
    return customToString(
      {
        r: remap(r, 0, 255, 0, 1),
        g: remap(g, 0, 255, 0, 1),
        b: remap(b, 0, 255, 0, 1),
        alpha,
      } as RGB<number>,
      getOutputOptions(stringOptions, ColorOutput.RGB),
      stringOptions
    );
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
  customOptions: RecursivePartial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { h, s, l, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ h, s, l, alpha } = clampHslColor({ h, s, l, alpha }));
  }

  if (stringOptions.customOutputs?.hsl) {
    return customToString(
      {
        h: remap(h, 0, 360, 0, 1),
        s,
        l,
        alpha,
      } as HSL<number>,
      getOutputOptions(stringOptions, ColorOutput.HSL),
      stringOptions
    );
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
  customOptions: RecursivePartial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { h, w, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ h, w, b, alpha } = clampHwbColor({ h, w, b, alpha }));
  }

  if (stringOptions.customOutputs?.hwb) {
    return customToString(
      {
        h: remap(h, 0, 360, 0, 1),
        w,
        b,
        alpha,
      } as HWB<number>,
      getOutputOptions(stringOptions, ColorOutput.HWB),
      stringOptions
    );
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
  customOptions: RecursivePartial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { l, a, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, a, b, alpha } = clampLabColor({ l, a, b, alpha }));
  }

  if (stringOptions.customOutputs?.lab) {
    return customToString(
      {
        l: remap(l, 0, 100, 0, 1),
        a: remap(a, -125, 125, 0, 1),
        b: remap(b, -125, 125, 0, 1),
        alpha,
      } as LAB<number>,
      getOutputOptions(stringOptions, ColorOutput.LAB),
      stringOptions
    );
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
  customOptions: RecursivePartial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { l, c, h, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, c, h, alpha } = clampLchColor({ l, c, h, alpha }));
  }

  if (stringOptions.customOutputs?.lch) {
    return customToString(
      {
        l: remap(l, 0, 100, 0, 1),
        c: remap(c, 0, 150, 0, 1),
        h: remap(h, 0, 360, 0, 1),
        alpha,
      } as LCH<number>,
      getOutputOptions(stringOptions, ColorOutput.LCH),
      stringOptions
    );
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
  customOptions: RecursivePartial<StringOptions> = {},
  is0x = false
) {
  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { r, g, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ r, g, b, alpha } = clampHexColor({ r, g, b, alpha }));
  }

  if (stringOptions.customOutputs?.hex) {
    return customToString(
      {
        r,
        g,
        b,
        alpha,
      } as HEX,
      getOutputOptions(stringOptions, ColorOutput.HEX),
      stringOptions
    );
  }

  const prefix = is0x ? "0x" : "#";

  const values = [r, g, b];
  if (alpha !== "FF") {
    values.push(alpha);
  }

  return prefix + values.join("");
}

export function hex0xToString(
  this: HEX & GetColor,
  customOptions: RecursivePartial<StringOptions> = {}
) {
  if (!customOptions.customOutputs?.hex) {
    return hexToString.bind(this)(customOptions, true);
  }

  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { r, g, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ r, g, b, alpha } = clampHexColor({ r, g, b, alpha }));
  }

  return customToString(
    {
      r,
      g,
      b,
      alpha,
    } as HEX,
    getOutputOptions(stringOptions, ColorOutput.HEX),
    stringOptions
  );
}

export function oklabToString(
  this: OKLAB<number> & GetColor,
  customOptions: RecursivePartial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { l, a, b, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, a, b, alpha } = clampOklabColor({ l, a, b, alpha, ok: true }));
  }

  if (stringOptions.customOutputs?.oklab) {
    return customToString(
      {
        l,
        a: remap(a, -0.4, 0.4, 0, 1),
        b: remap(b, -0.4, 0.4, 0, 1),
        alpha,
      } as OKLAB<number>,
      getOutputOptions(stringOptions, ColorOutput.OKLAB),
      stringOptions
    );
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
  customOptions: RecursivePartial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { l, c, h, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ l, c, h, alpha } = clampOklchColor({ l, c, h, alpha, ok: true }));
  }

  if (stringOptions.customOutputs?.oklch) {
    return customToString(
      {
        l,
        c: remap(c, 0, 0.4, 0, 1),
        h: remap(h, 0, 360, 0, 1),
        alpha,
      } as OKLCH<number>,
      getOutputOptions(stringOptions, ColorOutput.OKLCH),
      stringOptions
    );
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
  customOptions: RecursivePartial<StringOptions> = {}
) {
  const { options } = this;
  const stringOptions = mergeDeep(options)(customOptions);
  let { c, m, y, k, alpha } = this;
  if (stringOptions.limitToColorSpace) {
    ({ c, m, y, k, alpha } = clampCmykColor({ c, m, y, k, alpha }));
  }

  if (stringOptions.customOutputs?.cmyk) {
    return customToString(
      {
        c,
        m,
        y,
        k,
        alpha,
      } as CMYK<number>,
      getOutputOptions(stringOptions, ColorOutput.CMYK),
      stringOptions
    );
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
