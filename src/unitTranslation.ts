import {
  clampChroma,
  clampHue,
  clampLab,
  clampPercent,
  clampUnit,
  gradToRange,
  labABPercentageToRange,
  lchChromaPercentageToRange,
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
    return clampUnit(value);
  }
  if (isPercentage(value)) {
    return clampUnit(parseFloat(value) / 100);
  }
  return clampUnit(parseFloat(value));
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
