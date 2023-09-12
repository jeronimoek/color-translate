import {
  hsl2rgb,
  hwb2rgb,
  lab2rgb,
  lch2rgb,
  rgb2hsl,
  rgb2hwb,
  rgb2lab,
  rgb2lch,
} from "@csstools/convert-colors";
import { HSL, HWB, LAB, LCH, RGB } from "./types";

export function hslToRgb({ h, s, l, alpha }: HSL<number>): RGB<number> {
  const [r, g, b] = hsl2rgb(h, s, l);
  return { r, g, b, alpha };
}

export function rgbToHsl({ r, g, b, alpha }: RGB<number>): HSL<number> {
  const [h, s, l] = rgb2hsl(r, g, b);
  return { h, s, l, alpha };
}

export function hwbToRgb(hwba: HWB<number>): RGB<number> {
  const [r, g, b] = hwb2rgb(hwba.h, hwba.w, hwba.b);
  return { r, g, b, alpha: hwba.alpha };
}

export function rgbToHwb(rgba: RGB<number>): HWB<number> {
  const [h, w, b] = rgb2hwb(rgba.r, rgba.g, rgba.b);
  return { h, w, b, alpha: rgba.alpha };
}

export function labToRgb(laba: LAB<number>): RGB<number> {
  const [r, g, b] = lab2rgb(laba.l, laba.a, laba.b);
  return { r, g, b, alpha: laba.alpha };
}

export function rgbToLab(rgba: RGB<number>): LAB<number> {
  const [l, a, b] = rgb2lab(rgba.r, rgba.g, rgba.b);
  return { l, a, b, alpha: rgba.alpha };
}

export function lchToRgb(lcha: LCH<number>): RGB<number> {
  const [r, g, b] = lch2rgb(lcha.l, lcha.c, lcha.h);
  return { r, g, b, alpha: lcha.alpha };
}

export function rgbToLch(rgba: RGB<number>): LCH<number> {
  const [l, c, h] = rgb2lch(rgba.r, rgba.g, rgba.b);
  return { l, c, h, alpha: rgba.alpha };
}
