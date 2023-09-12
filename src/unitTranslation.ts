import {
  clampChroma,
  clampHue,
  clampLab,
  clampPercent,
  gradToRange,
  labABPercentageToRange,
  lchChromaPercentageToRange,
  oklabABNumberToRange,
  oklchChromaNumberToRange,
  radToRange,
  rgbToRange,
  turnToRange,
} from "./clamp";
import { isGrad, isPercentage, isRad, isTurn } from "./classify";

// Value parse

type ParseFunc = (value: string | number) => number;

/**
 * Clamp rgb to 0 - 100
 */
export const rgbParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return rgbToRange(value);
  }
  if (isPercentage(value)) return clampPercent(parseFloat(value));

  return rgbToRange(parseFloat(value) / 2.55);
};

/**
 * Clamp percentage to 0 - 100
 */
export const percentageParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return clampPercent(value);
  }
  return clampPercent(parseFloat(value));
};

/**
 * Translate and clamp hue to 0 - 360
 */
export const hueParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return clampHue(value);
  }
  if (isGrad(value)) {
    return gradToRange(parseFloat(value));
  }
  if (isRad(value)) {
    return radToRange(parseFloat(value));
  }
  if (isTurn(value)) {
    return turnToRange(parseFloat(value));
  }
  return clampHue(parseFloat(value));
};

/**
 * Clamp lab a/b to -125 - 125
 */
export const labABParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return clampLab(value);
  }
  if (isPercentage(value)) {
    return labABPercentageToRange(parseFloat(value));
  }
  return clampLab(parseFloat(value));
};

/**
 * Clamp lch chroma to 0 - 150
 */
export const lchChromaParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return clampChroma(value);
  }
  if (isPercentage(value)) {
    return lchChromaPercentageToRange(parseFloat(value));
  }
  return clampChroma(parseFloat(value));
};

/**
 * Clamp lch hue to -180 - 180
 */
export const lchHueParse: ParseFunc = (value) => {
  const result = hueParse(value);
  return result - 180;
};

/**
 * Clamp percentage to 0 - 100
 */
export const numberPercentageParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return clampPercent(value * 100);
  }
  if (isPercentage(value)) {
    return clampPercent(parseFloat(value));
  }
  return clampPercent(parseFloat(value) * 100);
};

/**
 * Clamp oklab a/b to -125 - 125
 */
export const oklabABParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return oklabABNumberToRange(value);
  }
  if (isPercentage(value)) {
    return labABPercentageToRange(parseFloat(value));
  }
  return oklabABNumberToRange(parseFloat(value));
};

/**
 * Clamp oklch chroma to 0 - 150
 */
export const oklchChromaParse: ParseFunc = (value) => {
  if (typeof value === "number") {
    return oklchChromaNumberToRange(value);
  }
  if (isPercentage(value)) {
    return lchChromaPercentageToRange(parseFloat(value));
  }
  return oklchChromaNumberToRange(parseFloat(value));
};
