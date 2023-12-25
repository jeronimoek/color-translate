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
import { CMYK, HEX, HSL, HWB, LAB, LCH, RGB } from "./types";
import { toHex } from "./utils";

export function rgb100ToRgb({ r, g, b, alpha }: RGB<number>): RGB<number> {
  return { r: r * 2.55, g: g * 2.55, b: b * 2.55, alpha };
}

export function hslToRgb({ h, s, l, alpha }: HSL<number>): RGB<number> {
  const [r, g, b] = hsl2rgb(h, s * 100, l * 100);
  return { r, g, b, alpha };
}

export function rgbToHsl({ r, g, b, alpha }: RGB<number>): HSL<number> {
  const [h, s, l] = rgb2hsl(r, g, b);
  return { h, s: s / 100, l: l / 100, alpha };
}

export function hwbToRgb(hwba: HWB<number>): RGB<number> {
  const [r, g, b] = hwb2rgb(hwba.h, hwba.w * 100, hwba.b * 100);
  return { r, g, b, alpha: hwba.alpha };
}

export function rgbToHwb(rgba: RGB<number>): HWB<number> {
  const [h, w, b] = rgb2hwb(rgba.r, rgba.g, rgba.b);
  return { h, w: w / 100, b: b / 100, alpha: rgba.alpha };
}

export function labToRgb(laba: LAB<number>): RGB<number> {
  const [r, g, b] = lab2rgb(laba.l, laba.a, laba.b);
  return { r, g, b, alpha: laba.alpha };
}

export function rgbToLab(rgba: RGB<number>): LAB<number> {
  const [l, a, b] = rgb2lab(rgba.r, rgba.g, rgba.b);
  return { l, a, b, alpha: rgba.alpha };
}

export function lchToRgb({ l, c, h, alpha }: LCH<number>): RGB<number> {
  const [r, g, b] = lch2rgb(l, c, h);
  return { r, g, b, alpha };
}

export function rgbToLch({ r, g, b, alpha }: RGB<number>): LCH<number> {
  const [l, c, h] = rgb2lch(r, g, b);
  return { l, c, h: h < 0 ? h + 360 : h, alpha };
}

export function rgbToHex({ r, g, b, alpha }: RGB<number>): HEX {
  return {
    r: toHex(r),
    g: toHex(g),
    b: toHex(b),
    alpha: toHex(alpha * 255),
  };
}

export function cmykToRgb({ c, m, y, k, alpha }: CMYK<number>): RGB<number> {
  return {
    r: (1 - Math.min(1, c * (1 - k) + k)) * 100,
    g: (1 - Math.min(1, m * (1 - k) + k)) * 100,
    b: (1 - Math.min(1, y * (1 - k) + k)) * 100,
    alpha,
  };
}

export function rgbToCmyk({ r, g, b, alpha }: RGB<number>): CMYK<number> {
  const black = 1 - Math.max(r / 100, g / 100, b / 100);

  if (black === 1) {
    return {
      c: 0,
      m: 0,
      y: 0,
      k: black,
      alpha,
    };
  }

  return {
    c: (1 - r / 100 - black) / (1 - black),
    m: (1 - g / 100 - black) / (1 - black),
    y: (1 - b / 100 - black) / (1 - black),
    k: black,
    alpha,
  };
}
