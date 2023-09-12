import { merge } from "./helper";
import { GetColor, HSL, HWB, LAB, LCH, Options, RGB } from "./types";

// TODO: BUILD STRINGIFY FUNCTIONS USING OPTIONS

export function rgbToString(
  this: RGB<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const options = merge(this.options, customOptions);
  console.log(options);
  return "rgb";
}

export function hslToString(
  this: HSL<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const options = merge(this.options, customOptions);
  console.log(options);
  return "hsl";
}

export function hwbToString(
  this: HWB<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const options = merge(this.options, customOptions);
  console.log(options);
  return "hwb";
}

export function labToString(
  this: LAB<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const options = merge(this.options, customOptions);
  console.log(options);
  return "lab";
}

export function lchToString(
  this: LCH<number> & GetColor,
  customOptions: Partial<Options> = {}
) {
  const options = merge(this.options, customOptions);
  console.log(options);
  return "lch" + this.l + this.c + this.h;
}
