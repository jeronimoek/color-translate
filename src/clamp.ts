import { clamp } from "./utils";

// Clamps

export function clampPercent(value: number) {
  return clamp(value, 0, 100);
}

export function clampHue(value: number) {
  return clamp(value, 0, 360);
}

export function clampLab(value: number) {
  return clamp(value, -125, 125);
}

export function clampChroma(value: number) {
  return clamp(value, 0, 150);
}

// Value to range

export function rgbToRange(value: number) {
  const scale = 100 / 255;
  const scaled = value * scale;
  return clampPercent(scaled);
}

export function gradToRange(value: number) {
  const scale = 360 / 400;
  const scaled = value * scale;
  return clampHue(scaled);
}

export function radToRange(value: number) {
  const scale = 360 / (2 * Math.PI);
  const scaled = value * scale;
  return clampHue(scaled);
}

export function turnToRange(value: number) {
  const scale = 360;
  const scaled = value * scale;
  return clampHue(scaled);
}

export function labABPercentageToRange(value: number) {
  const scale = 125 / 100;
  const scaled = value * scale;
  return clampLab(scaled);
}

export function lchChromaPercentageToRange(value: number) {
  const scale = 150 / 100;
  const scaled = value * scale;
  return clampChroma(scaled);
}

export function oklabABNumberToRange(value: number) {
  const scale = 125 / 0.4;
  const scaled = value * scale;
  return clampLab(scaled);
}

export function oklchChromaNumberToRange(value: number) {
  const scale = 150 / 0.4;
  const scaled = value * scale;
  return clampChroma(scaled);
}
