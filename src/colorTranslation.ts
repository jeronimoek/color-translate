import {
  hsl2rgb,
  hwb2rgb,
  lab2rgb,
  lch2rgb,
  rgb2hsl,
  rgb2hwb,
  rgb2lab,
  rgb2lch,
  rgb2xyz,
  xyz2rgb,
} from "@csstools/convert-colors";
import { A98, CMYK, HEX, HSL, HWB, LAB, LCH, RGB } from "./types";
import { toHex } from "./utils";

/**
 * rgb a98 (RGB Adobe 1998) input range = 0 - 1.
 */
export function a98ToRgb({
  r: aR,
  g: aG,
  b: aB,
  alpha,
}: A98<number>): RGB<number> {
  const [r, g, b] = [aR, aG, aB]
    .map((v) => v ** 2.19921875)
    .map((v) => v * 100);

  const x = r * 0.57667 + g * 0.18555 + b * 0.18819;
  const y = r * 0.29738 + g * 0.62735 + b * 0.07527;
  const z = r * 0.02703 + g * 0.07069 + b * 0.9911;

  const [sR, sG, sB] = xyz2rgb(x, y, z);

  return { r: sR, g: sG, b: sB, alpha };
}

/**
 * rgb a98 (RGB Adobe 1998) output range = 0 - 1.
 */
export function rgbToA98({ r, g, b, alpha }: RGB<number>): A98<number> {
  const [x, y, z] = rgb2xyz(r, g, b).map((v) => v / 100);

  let aR = x * 2.04137 + y * -0.56495 + z * -0.34469;
  let aG = x * -0.96927 + y * 1.87601 + z * 0.04156;
  let aB = x * 0.01345 + y * -0.11839 + z * 1.01541;

  [aR, aG, aB] = [aR, aG, aB].map((v) => v ** (1 / 2.19921875));

  return { r: aR, g: aG, b: aB, a98: true, alpha };
}

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
