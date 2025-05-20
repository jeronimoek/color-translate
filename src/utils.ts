/// <reference path='./index.d.ts' />
import {
  isA98,
  isCMYK,
  isHSL,
  isHWB,
  isLAB,
  isLCH,
  isOKLAB,
  isOKLCH,
  isRGB,
} from "./classify";
import {
  a98ToRgb,
  cmykToRgb,
  hslToRgb,
  hwbToRgb,
  labToRgb,
  lchToRgb,
} from "./colorTranslation";
import { namedColorsLAB } from "./constants";
import { ColorFormat } from "./enum";
import { oklabToRgb, oklchToRgb } from "./okColors";
import { color as colorRegex } from "./regex";
import {
  standardizeA98,
  standardizeCmyk,
  standardizeHsl,
  standardizeHwb,
  standardizeLab,
  standardizeLch,
  standardizeOklab,
  standardizeOklch,
  standardizeRgb,
} from "./standardize";
import { A98, Color, ColorInput, LAB, OKLAB, OKLCH, RGB } from "./types";

function parseColorString(colorString: string): Color {
  let color: Color;

  const namedMatch = namedColorsLAB[colorString as keyof typeof namedColorsLAB];
  if (namedMatch) {
    const [l, a, b] = namedMatch;
    return { l, a, b, alpha: 1 };
  }

  const matches = colorRegex.exec(colorString);
  if (!matches) throw Error("Invalid input: " + colorString);
  const [, format, ...values] = matches.filter((v) => v);

  if (format === "#" || format === "0x") {
    values[3] ??= "FF";
    return {
      r: parseInt(values[0].padStart(2, values[0]), 16),
      g: parseInt(values[1].padStart(2, values[1]), 16),
      b: parseInt(values[2].padStart(2, values[2]), 16),
      alpha: parseInt(values[3].padStart(2, values[3]), 16) / 255,
    };
  }

  switch (format.toLocaleLowerCase()) {
    case "hsl":
    case "hsla":
      color = {
        h: values[0],
        s: values[1],
        l: values[2],
        alpha: values[3],
      };
      break;
    case "hwb":
      color = {
        h: values[0],
        w: values[1],
        b: values[2],
        alpha: values[3],
      };
      break;
    case "lab":
      color = {
        l: values[0],
        a: values[1],
        b: values[2],
        alpha: values[3],
      };
      break;
    case "lch":
      color = {
        l: values[0],
        c: values[1],
        h: values[2],
        alpha: values[3],
      };
      break;
    case "oklab":
      color = {
        ok: true,
        l: values[0],
        a: values[1],
        b: values[2],
        alpha: values[3],
      };
      break;
    case "oklch":
      color = {
        ok: true,
        l: values[0],
        c: values[1],
        h: values[2],
        alpha: values[3],
      };
      break;
    case "device-cmyk":
      color = {
        c: values[0],
        m: values[1],
        y: values[2],
        k: values[3],
        alpha: values[4],
      };
      break;
    case "a98-rgb":
      color = {
        r: values[0],
        g: values[1],
        b: values[2],
        a98: true,
        alpha: values[3],
      };
      break;
    case "rgb":
    case "rgba":
    default:
      color = {
        r: values[0],
        g: values[1],
        b: values[2],
        alpha: values[3],
      };
      break;
  }

  return { ...color, alpha: color.alpha ?? "1" };
}

/**
 * Parse raw color, object or string, into rgb100 object (0 - 100)
 * @param color
 * @returns
 */
export function colorToRgb100(color: ColorInput | string): {
  rgb100: RGB<number>;
  format: ColorFormat;
  standardizedColor: Color;
} {
  if (typeof color === "string") {
    color = parseColorString(color);
  }
  let rgb100: RGB<number> = { r: 0, g: 0, b: 0, alpha: 1 };
  let format = ColorFormat.RGB;
  let standardizedColor: Color = rgb100;
  // The next 'a98' format MUST go before the rgb format
  if (isA98(color)) {
    standardizedColor = standardizeA98(color);
    format = ColorFormat.A98;
    rgb100 = a98ToRgb(standardizedColor as A98<number>);
  } else if (isRGB(color)) {
    standardizedColor = standardizeRgb(color);
    rgb100 = standardizedColor;
  } else if (isHSL(color)) {
    standardizedColor = standardizeHsl(color);
    format = ColorFormat.HSL;
    rgb100 = hslToRgb(standardizedColor);
  } else if (isHWB(color)) {
    standardizedColor = standardizeHwb(color);
    format = ColorFormat.HWB;
    rgb100 = hwbToRgb(standardizedColor);
    // The next two 'ok' formats MUST go before the non 'ok' formats
  } else if (isOKLAB(color)) {
    standardizedColor = standardizeOklab(color);
    format = ColorFormat.OKLAB;
    rgb100 = oklabToRgb(standardizedColor as OKLAB<number>);
  } else if (isOKLCH(color)) {
    standardizedColor = standardizeOklch(color);
    format = ColorFormat.OKLCH;
    rgb100 = oklchToRgb(standardizedColor as OKLCH<number>);
  } else if (isLAB(color)) {
    standardizedColor = standardizeLab(color);
    format = ColorFormat.LAB;
    rgb100 = labToRgb(standardizedColor);
  } else if (isLCH(color)) {
    standardizedColor = standardizeLch(color);
    format = ColorFormat.LCH;
    rgb100 = lchToRgb(standardizedColor);
  } else if (isCMYK(color)) {
    standardizedColor = standardizeCmyk(color);
    format = ColorFormat.DEVICE_CMYK;
    rgb100 = cmykToRgb(standardizedColor);
  }
  return {
    rgb100: { ...rgb100, alpha: rgb100.alpha ?? 1 },
    format,
    standardizedColor: {
      ...standardizedColor,
      alpha: standardizedColor.alpha ?? 1,
    },
  };
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
  const range = inputMax - inputMin;
  if (percentage.endsWith("%"))
    return (parseFloat(percentage) / 100) * range - inputMin;
  return parseFloat(percentage);
}

export function percentageRawToNumber(ABRaw: string | number) {
  return percentageToNumber(ABRaw, 0, 100);
}

export function oklabABRawToNumber(ABRaw: string | number) {
  return percentageToNumber(ABRaw, 0, 0.4);
}

export function oklchChromaRawToNumber(chromaRaw: string | number) {
  return percentageToNumber(chromaRaw, 0, 0.4);
}

export function deltaE(
  labA: [number, number, number],
  labB: [number, number, number]
) {
  const deltaL = labA[0] - labB[0];
  const deltaA = labA[1] - labB[1];
  const deltaB = labA[2] - labB[2];
  const c1 = Math.sqrt(labA[1] ** 2 + labA[2] ** 2);
  const c2 = Math.sqrt(labB[1] ** 2 + labB[2] ** 2);
  const deltaC = c1 - c2;
  let deltaH = deltaA ** 2 + deltaB ** 2 - deltaC ** 2;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  const sc = 1.0 + 0.045 * c1;
  const sh = 1.0 + 0.015 * c1;
  const deltaLKlsl = deltaL / 1.0;
  const deltaCkcsc = deltaC / sc;
  const deltaHkhsh = deltaH / sh;
  const i = deltaLKlsl ** 2 + deltaCkcsc ** 2 + deltaHkhsh ** 2;
  return i < 0 ? 0 : Math.sqrt(i);
}

export function findClosestNamedColor(lab: LAB<number>) {
  let minDelta = Number.POSITIVE_INFINITY;
  let closestNamedColor = Object.keys(namedColorsLAB)[0];

  Object.entries(namedColorsLAB).forEach(([namedColor, namedColorLAB]) => {
    const { l, a, b } = lab;
    const delta = deltaE([l, a, b], namedColorLAB);
    if (delta < minDelta) {
      minDelta = delta;
      closestNamedColor = namedColor;
    }
  });

  return closestNamedColor;
}

export function remap(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  const inputRange = inputMax - inputMin;
  if (inputRange == 0) {
    const outputValue = outputMin;
    return outputValue;
  } else {
    const outputRange = outputMax - outputMin;
    const outputValue =
      ((value - inputMin) * outputRange) / inputRange + outputMin;
    return outputValue;
  }
}
