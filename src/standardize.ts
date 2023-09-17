import {
  lchChromaParse,
  lchHueParse,
  hueParse,
  labABParse,
  percentageParse,
  rgbParse,
  oklabABParse,
  oklchChromaParse,
} from "./unitTranslation";
import {
  RGB,
  RawRGB,
  RawHSL,
  RawHWB,
  RawLAB,
  RawLCH,
  HSL,
  HWB,
  LAB,
  LCH,
  RawOKLAB,
  OKLAB,
  RawOKLCH,
  OKLCH,
} from "./types";
import { percentageToNumber } from "./utils";

// These functions clamp color values to use them directly with the library "@csstools/convert-colors"

export function standardizePartialRGB(
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

export function standardizeRGB(color: RawRGB): RGB<number> {
  return standardizePartialRGB(color) as RGB<number>;
}

export function standardizePartialHSL(
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

export function standardizeHSL(color: RawHSL): HSL<number> {
  return standardizePartialHSL(color) as HSL<number>;
}

export function standardizePartialHWB(
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

export function standardizeHWB(color: RawHWB): HWB<number> {
  return standardizePartialHWB(color) as HWB<number>;
}

export function standardizePartialLAB(
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

export function standardizeLAB(color: RawLAB): LAB<number> {
  return standardizePartialLAB(color) as LAB<number>;
}

export function standardizePartialLCH(
  color: Partial<RawLCH>
): Partial<LCH<number>> {
  const { l, c, h, alpha } = color;
  return {
    l: l != null ? percentageParse(l) : undefined,
    c: c != null ? lchChromaParse(c) : undefined,
    h: h != null ? lchHueParse(h) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
  };
}

export function standardizeLCH(color: RawLCH): LCH<number> {
  return standardizePartialLCH(color) as LCH<number>;
}

export function standardizePartialOKLAB(
  color: Partial<RawOKLAB>
): Partial<OKLAB<number>> {
  const { l, a, b, alpha } = color;
  return {
    l: l != null ? percentageParse(l) : undefined,
    a: a != null ? oklabABParse(a) : undefined,
    b: b != null ? oklabABParse(b) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
  };
}

export function standardizeOKLAB(color: RawOKLAB): OKLAB<number> {
  return standardizePartialOKLAB(color) as OKLAB<number>;
}

export function standardizePartialOKLCH(
  color: Partial<RawOKLCH>
): Partial<OKLCH<number>> {
  const { l, c, h, alpha } = color;
  return {
    l: l != null ? percentageParse(l) : undefined,
    c: c != null ? oklchChromaParse(c) : undefined,
    h: h != null ? hueParse(h) : undefined,
    alpha: alpha != null ? percentageToNumber(alpha) : undefined,
  };
}

export function standardizeOKLCH(color: RawOKLCH): OKLCH<number> {
  return standardizePartialOKLCH(color) as OKLCH<number>;
}
