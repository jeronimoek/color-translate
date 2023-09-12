/// <reference path='./index.d.ts' />
import { Color, RGB } from "./types";
import {
  standardizeHSL,
  standardizeHWB,
  standardizeLAB,
  standardizeLCH,
} from "./standardize";
import {
  isHSL,
  isHWB,
  isLAB,
  isLCH,
  isOKLAB,
  isOKLCH,
  isRGB,
} from "./classify";
import { oklabToRGB as oklabToRgb, oklchToRGB as oklchToRgb } from "./okColors";
import { color as colorRegex } from "./regex";
import { hslToRgb, hwbToRgb, labToRgb, lchToRgb } from "./colorTranslation";

function parseColorString(color: string): Color {
  const matches = colorRegex.exec(color);
  if (!matches) throw Error("Invalid input: " + color);
  const [, format, value1, value2, value3, alpha] = matches.filter((v) => v);
  switch (format.toLocaleLowerCase()) {
    case "#":
      return {
        r: parseInt(value1.padStart(2, value1), 16),
        g: parseInt(value2.padStart(2, value2), 16),
        b: parseInt(value3.padStart(2, value3), 16),
        alpha:
          alpha != null
            ? parseInt(alpha.padStart(2, alpha), 16) / 255
            : undefined,
      };
    case "hsl":
    case "hsla":
      return {
        h: value1,
        s: value2,
        l: value3,
        alpha,
      };
    case "hwb":
      return {
        h: value1,
        w: value2,
        b: value3,
        alpha,
      };
    case "lab":
      return {
        l: value1,
        a: value2,
        b: value3,
        alpha,
      };
    case "lch":
      return {
        l: value1,
        c: value2,
        h: value3,
        alpha,
      };
    case "oklab":
      return {
        ok: true,
        l: value1,
        a: value2,
        b: value3,
        alpha,
      };
    case "oklch":
      return {
        ok: true,
        l: value1,
        c: value2,
        h: value3,
        alpha,
      };
    case "rgb":
    case "rgba":
    default:
      return {
        r: value1,
        g: value2,
        b: value3,
        alpha,
      };
  }
}

export function colorToRgba(color: Color | string): RGB<number> {
  if (typeof color === "string") {
    color = parseColorString(color);
  }
  let result: RGB<number> = { r: 0, g: 0, b: 0 };
  let rgb100 = undefined;
  if (isRGB(color)) {
    result = color;
  } else if (isHSL(color)) {
    rgb100 = hslToRgb(standardizeHSL(color));
  } else if (isHWB(color)) {
    rgb100 = hwbToRgb(standardizeHWB(color));
    // The next two 'ok' formats MUST go before the non 'ok' formats
  } else if (isOKLAB(color)) {
    result = oklabToRgb(color);
  } else if (isOKLCH(color)) {
    result = oklchToRgb(color);
  } else if (isLAB(color)) {
    rgb100 = labToRgb(standardizeLAB(color));
  } else if (isLCH(color)) {
    rgb100 = lchToRgb(standardizeLCH(color));
  }
  if (rgb100) {
    const { r, g, b } = rgb100;
    result = { r: r * 2.55, g: g * 2.55, b: b * 2.55 };
  }
  const alpha = color.alpha != null ? +color.alpha : 1;
  return { ...result, alpha };
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function radToDeg(rad: number): number {
  return rad * (180 / Math.PI);
}
