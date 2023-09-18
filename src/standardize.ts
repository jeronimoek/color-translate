import {
  HSL,
  HWB,
  LAB,
  LCH,
  OKLAB,
  OKLCH,
  RawHSL,
  RawHWB,
  RawLAB,
  RawLCH,
  RawOKLAB,
  RawOKLCH,
  RawRGB,
  RGB,
} from "./types";
import {
  hueParse,
  labABParse,
  lchChromaParse,
  percentageParse,
  rgbParse,
} from "./unitTranslation";
import {
  oklabABRawToNumber,
  oklchChromaRawToNumber,
  percentageToNumber,
} from "./utils";

// These functions clamp color values to use them directly with the library "@csstools/convert-colors"

export function standardizePartialRgb(
  color: Partial<RawRGB>
): Partial<RGB<number>> {
  const { r, g, b, alpha } = color;
  return {
    r: r != null ? rgbParse(r) : undefined,
    g: g != null ? rgbParse(g) : undefined,
    b: b != null ? rgbParse(b) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
  };
}

export function standardizeRgb(color: RawRGB): RGB<number> {
  return standardizePartialRgb(color) as RGB<number>;
}

export function standardizePartialHsl(
  color: Partial<RawHSL>
): Partial<HSL<number>> {
  const { h, s, l, alpha } = color;
  return {
    h: h != null ? hueParse(h) : undefined,
    s: s != null ? percentageParse(s) : undefined,
    l: l != null ? percentageParse(l) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
  };
}

export function standardizeHsl(color: RawHSL): HSL<number> {
  return standardizePartialHsl(color) as HSL<number>;
}

export function standardizePartialHwb(
  color: Partial<RawHWB>
): Partial<HWB<number>> {
  const { h, w, b, alpha } = color;
  return {
    h: h != null ? hueParse(h) : undefined,
    w: w != null ? percentageParse(w) : undefined,
    b: b != null ? percentageParse(b) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
  };
}

export function standardizeHwb(color: RawHWB): HWB<number> {
  return standardizePartialHwb(color) as HWB<number>;
}

export function standardizePartialLab(
  color: Partial<RawLAB>
): Partial<LAB<number>> {
  const { l, a, b, alpha } = color;
  return {
    l: l != null ? percentageParse(l) : undefined,
    a: a != null ? labABParse(a) : undefined,
    b: b != null ? labABParse(b) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
  };
}

export function standardizeLab(color: RawLAB): LAB<number> {
  return standardizePartialLab(color) as LAB<number>;
}

export function standardizePartialLch(
  color: Partial<RawLCH>
): Partial<LCH<number>> {
  const { l, c, h, alpha } = color;
  return {
    l: l != null ? percentageParse(l) : undefined,
    c: c != null ? lchChromaParse(c) : undefined,
    h: h != null ? hueParse(h) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
  };
}

export function standardizeLch(color: RawLCH): LCH<number> {
  return standardizePartialLch(color) as LCH<number>;
}

export function standardizePartialOklab(
  color: Partial<RawOKLAB>
): Partial<OKLAB<number>> {
  const { l, a, b, alpha, ok } = color;
  return {
    l: l != null ? percentageToNumber(l) : undefined,
    a: a != null ? oklabABRawToNumber(a) : undefined,
    b: b != null ? oklabABRawToNumber(b) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
    ok,
  };
}

export function standardizeOklab(color: RawOKLAB): OKLAB<number> {
  return standardizePartialOklab(color) as OKLAB<number>;
}

export function standardizePartialOklch(
  color: Partial<RawOKLCH>
): Partial<OKLCH<number>> {
  const { l, c, h, alpha, ok } = color;
  return {
    l: l != null ? percentageToNumber(l) : undefined,
    c: c != null ? oklchChromaRawToNumber(c) : undefined,
    h: h != null ? hueParse(h) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
    ok,
  };
}

export function standardizeOklch(color: RawOKLCH): OKLCH<number> {
  return standardizePartialOklch(color) as OKLCH<number>;
}
