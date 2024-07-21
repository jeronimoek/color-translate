import {
  A98,
  CMYK,
  HSL,
  HWB,
  LAB,
  LCH,
  OKLAB,
  OKLCH,
  RawA98,
  RawCMYK,
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
  a98Parse,
  hueParse,
  labABParse,
  lchChromaParse,
  rgbParse,
} from "./unitTranslation";
import {
  oklabABRawToNumber,
  oklchChromaRawToNumber,
  percentageRawToNumber,
  percentageToNumber,
} from "./utils";

// These functions clamp color values to use them directly with the library "@csstools/convert-colors"

export function standardizePartialA98(
  color: Partial<RawA98>
): Partial<A98<number>> {
  const { r, g, b, a98, alpha } = color;
  return {
    r: r != null ? a98Parse(r) : undefined,
    g: g != null ? a98Parse(g) : undefined,
    b: b != null ? a98Parse(b) : undefined,
    a98,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
  };
}

export function standardizeA98(color: RawA98): A98<number> {
  return standardizePartialA98(color) as A98<number>;
}

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
    s: s != null ? percentageToNumber(s) : undefined,
    l: l != null ? percentageToNumber(l) : undefined,
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
    w: w != null ? percentageToNumber(w) : undefined,
    b: b != null ? percentageToNumber(b) : undefined,
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
    l: l != null ? percentageRawToNumber(l) : undefined,
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
    l: l != null ? percentageRawToNumber(l) : undefined,
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

export function standardizePartialCmyk(
  color: Partial<RawCMYK>
): Partial<CMYK<number>> {
  const { c, m, y, k, alpha } = color;
  return {
    c: c != null ? percentageToNumber(c) : undefined,
    m: m != null ? percentageToNumber(m) : undefined,
    y: y != null ? percentageToNumber(y) : undefined,
    k: k != null ? percentageToNumber(k) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
  };
}

export function standardizeCmyk(color: RawCMYK): CMYK<number> {
  return standardizePartialCmyk(color) as CMYK<number>;
}
