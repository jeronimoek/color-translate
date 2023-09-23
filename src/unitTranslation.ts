import { isGrad, isPercentage, isRad, isTurn } from "./classify";
import {
  labABPercentageToRange,
  lchChromaPercentageToRange,
  rgbToRange,
} from "./toRange";
import { gradToDeg, radToDeg, turnToDeg } from "./utils";

// Value parse

type ParseFunc = (value: string | number) => number;

/**
 * Clamp rgb to 0 - 100
 */
export const rgbParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return rgbToRange(value);
  }
  if (isPercentage(value)) return parseFloat(value);
  return rgbToRange(parseFloat(value));
};

/**
 * Clamp percentage to 0 - 100
 * @example
 * percentageParse(0.5)     // 0.5
 * percentageParse('0.5')   // 0.5
 * percentageParse('50%')   // 0.5
 * percentageParse('125%')  // 1
 * percentageParse('-125%') // 0
 */
export const percentageParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return value;
  }
  if (isPercentage(value)) {
    return parseFloat(value) / 100;
  }
  return parseFloat(value);
};

/**
 * Translate and clamp hue to 0 - 360
 */
export const hueParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return value;
  }
  if (isGrad(value)) {
    return gradToDeg(parseFloat(value));
  }
  if (isRad(value)) {
    return radToDeg(parseFloat(value));
  }
  if (isTurn(value)) {
    return turnToDeg(parseFloat(value));
  }
  return parseFloat(value);
};

/**
 * Clamp lab a/b to -125 - 125
 */
export const labABParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return value;
  }
  if (isPercentage(value)) {
    return labABPercentageToRange(parseFloat(value));
  }
  return parseFloat(value);
};

/**
 * Clamp lch chroma to 0 - 150
 */
export const lchChromaParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return value;
  }
  if (isPercentage(value)) {
    return lchChromaPercentageToRange(parseFloat(value));
  }
  return parseFloat(value);
};
