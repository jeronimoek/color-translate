import { clamp, gradToDeg, radToDeg, turnToDeg } from "./utils";

// Clamps

export function clampUnit(value: number) {
  return clamp(value, 0, 1);
}

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

export function gradToRange(grad: number) {
  return clampHue(gradToDeg(grad));
}

export function radToRange(rad: number) {
  return clampHue(radToDeg(rad));
}

export function turnToRange(turn: number) {
  return clampHue(turnToDeg(turn));
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
