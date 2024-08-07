import { isGrad, isPercentage, isRad, isTurn } from "./classify";
import {
  labABPercentageToRange,
  lchChromaPercentageToRange,
  rgbToRange,
} from "./toRange";
import { gradToDeg, radToDeg, turnToDeg } from "./utils";

// Value parse

type ParseFunc = (value: string | number) => number;

export const a98Parse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return value;
  }
  return parseFloat(value);
};

/**
 * Rgb to 0 - 100
 */
export const rgbParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return rgbToRange(value);
  }
  if (isPercentage(value)) return parseFloat(value);
  return rgbToRange(parseFloat(value));
};

/**
 * Translate hue to 0 - 360
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
  if (isPercentage(value)) {
    return parseFloat(value) * 3.6;
  }
  return parseFloat(value);
};

/**
 * Lab a/b to -125 - 125
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
 * Lch chroma to 0 - 150
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
