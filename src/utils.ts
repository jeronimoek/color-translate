/// <reference path='./index.d.ts' />
import {
  isHSL,
  isHWB,
  isLAB,
  isLCH,
  isOKLAB,
  isOKLCH,
  isRGB,
} from "./classify";
import { hslToRgb, hwbToRgb, labToRgb, lchToRgb } from "./colorTranslation";
import { oklabToRgb, oklchToRgb } from "./okColors";
import { color as colorRegex } from "./regex";
import {
  standardizeHsl,
  standardizeHwb,
  standardizeLab,
  standardizeLch,
  standardizeOklab,
  standardizeOklch,
  standardizeRgb,
} from "./standardize";
import { Color, RGB } from "./types";

function parseColorString(color: string): Color {
  const matches = colorRegex.exec(color);
  if (!matches) throw Error("Invalid input: " + color);
  const [, format, value1, value2, value3, _alpha] = matches.filter((v) => v);
  let alpha = _alpha;

  if (format === "#") {
    alpha ??= "FF";
    return {
      r: parseInt(value1.padStart(2, value1), 16),
      g: parseInt(value2.padStart(2, value2), 16),
      b: parseInt(value3.padStart(2, value3), 16),
      alpha: parseInt(alpha.padStart(2, alpha), 16) / 255,
    };
  }

  alpha ??= "1";

  switch (format.toLocaleLowerCase()) {
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
  if (color.alpha === undefined) {
    color.alpha = 1;
  }
  let rgb100: RGB<number> = { r: 0, g: 0, b: 0, alpha: 1 };
  if (isRGB(color)) {
    rgb100 = standardizeRgb(color);
  } else if (isHSL(color)) {
    rgb100 = hslToRgb(standardizeHsl(color));
  } else if (isHWB(color)) {
    rgb100 = hwbToRgb(standardizeHwb(color));
    // The next two 'ok' formats MUST go before the non 'ok' formats
  } else if (isOKLAB(color)) {
    rgb100 = oklabToRgb(standardizeOklab(color));
  } else if (isOKLCH(color)) {
    rgb100 = oklchToRgb(standardizeOklch(color));
  } else if (isLAB(color)) {
    rgb100 = labToRgb(standardizeLab(color));
  } else if (isLCH(color)) {
    rgb100 = lchToRgb(standardizeLch(color));
  }
  return { ...rgb100, alpha: rgb100.alpha ?? 1 };
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

/**
 * @example
 * percentageToNumber(0.5)      // 0.5
 * percentageToNumber('0.5')    // 0.5
 * percentageToNumber('50%')    // 0.5
 */
export function percentageToNumber(
  percentage: string | number,
  inputMin = 0,
  inputMax = 1
) {
  if (typeof percentage === "number") return percentage;
  if (!percentage.endsWith("%")) return parseFloat(percentage);
  const range = inputMax - inputMin;
  return (parseFloat(percentage) / 100) * range - inputMin;
}

export function oklabABRawToNumber(ABRaw: string | number) {
  return percentageToNumber(ABRaw, 0, 0.4);
}

export function oklchChromaRawToNumber(chromaRaw: string | number) {
  return percentageToNumber(chromaRaw, 0, 0.4);
}
