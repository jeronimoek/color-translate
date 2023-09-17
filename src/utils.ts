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
import { oklabToRgb, oklchToRgb } from "./okColors";
import { color as colorRegex } from "./regex";
import {
  hslToRgb,
  hwbToRgb,
  labToRgb,
  lchToRgb,
  rgbToRgb100,
} from "./colorTranslation";

function parseColorString(color: string): Color {
  const matches = colorRegex.exec(color);
  if (!matches) throw Error("Invalid input: " + color);
  const [, format, value1, value2, value3, alpha = "1"] = matches.filter(
    (v) => v
  );
  switch (format.toLocaleLowerCase()) {
    case "#":
      return {
        r: parseInt(value1.padStart(2, value1), 16),
        g: parseInt(value2.padStart(2, value2), 16),
        b: parseInt(value3.padStart(2, value3), 16),
        alpha: parseInt(alpha.padStart(2, alpha), 16) / 255,
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

/**
 * Parse raw color, object or string, into rgb100 object (0 - 100)
 * @param color
 * @returns
 */
export function colorToRgb100(color: Color | string): RGB<number> {
  if (typeof color === "string") {
    color = parseColorString(color);
  }
  let rgb100: RGB<number> = { r: 0, g: 0, b: 0, alpha: 1 };
  if (isRGB(color)) {
    rgb100 = rgbToRgb100(color);
  } else if (isHSL(color)) {
    rgb100 = hslToRgb(standardizeHSL(color));
  } else if (isHWB(color)) {
    rgb100 = hwbToRgb(standardizeHWB(color));
    // The next two 'ok' formats MUST go before the non 'ok' formats
  } else if (isOKLAB(color)) {
    rgb100 = oklabToRgb(color);
  } else if (isOKLCH(color)) {
    rgb100 = oklchToRgb(color);
  } else if (isLAB(color)) {
    rgb100 = labToRgb(standardizeLAB(color));
  } else if (isLCH(color)) {
    rgb100 = lchToRgb(standardizeLCH(color));
  }
  return { ...rgb100 };
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function gradToDeg(grad: number) {
  return (grad / 400) * 360;
}

export function degToGrad(deg: number) {
  return (deg / 360) * 400;
}

export function radToDeg(rad: number) {
  return (rad / (2 * Math.PI)) * 360;
}

export function degToRad(deg: number) {
  return (deg / 360) * (2 * Math.PI);
}

export function turnToDeg(turn: number) {
  return turn * 360;
}

export function degToTurn(deg: number) {
  return deg / 360;
}

export function toHex(rgbValue: number) {
  return Math.round(rgbValue).toString(16).toUpperCase().padStart(2, "0");
}

export function percentageToNumber(
  percentage: string | number,
  min = 0,
  max = 1
) {
  if (typeof percentage === "number") return percentage;
  if (!percentage.endsWith("%")) return parseFloat(percentage);
  const range = max - min;
  return (parseFloat(percentage) / 100) * range - min;
}

export function rgbRawToNumber(rgbRaw: string | number) {
  return percentageToNumber(rgbRaw, 0, 255);
}

export function oklabABRawToNumber(rgbRaw: string | number) {
  return percentageToNumber(rgbRaw, 0, 0.4);
}

export function oklchChromaRawToNumber(rgbRaw: string | number) {
  return percentageToNumber(rgbRaw, 0, 0.4);
}
