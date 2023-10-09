import { CMYK, HEX, HSL, HWB, LAB, LCH, OKLAB, OKLCH, RGB } from "./types";
import { clamp, toHex } from "./utils";

// Clamps

function clampUnit(value: number) {
  return clamp(value, 0, 1);
}

function clampPercentage(value: number) {
  return clamp(value, 0, 100);
}

function clampRgb(value: number) {
  return clamp(value, 0, 255);
}

function clampDeg(value: number) {
  return clamp(value, 0, 360);
}

function clampLabAB(value: number) {
  return clamp(value, -125, 125);
}

function clampChroma(value: number) {
  return clamp(value, 0, 150);
}

function clampOklabAB(value: number) {
  return clamp(value, -0.4, 0.4);
}

function clampOklchChroma(value: number) {
  return clamp(value, 0, 0.4);
}

function clampHex(value: string) {
  const intValue = parseInt(value, 16);
  const intClamped = clampRgb(intValue);
  const hexClamped = toHex(intClamped);
  return hexClamped;
}

export function clampRgbColor({ r, g, b, alpha }: RGB<number>) {
  return {
    r: clampRgb(r),
    g: clampRgb(g),
    b: clampRgb(b),
    alpha: clampUnit(alpha),
  };
}

export function clampHslColor({ h, s, l, alpha }: HSL<number>) {
  return {
    h: clampDeg(h),
    s: clampUnit(s),
    l: clampUnit(l),
    alpha: clampUnit(alpha),
  };
}

export function clampHwbColor({ h, w, b, alpha }: HWB<number>) {
  return {
    h: clampDeg(h),
    w: clampUnit(w),
    b: clampUnit(b),
    alpha: clampUnit(alpha),
  };
}

export function clampLabColor({ l, a, b, alpha }: LAB<number>) {
  return {
    l: clampPercentage(l),
    a: clampLabAB(a),
    b: clampLabAB(b),
    alpha: clampUnit(alpha),
  };
}

export function clampLchColor({ l, c, h, alpha }: LCH<number>) {
  return {
    l: clampPercentage(l),
    c: clampChroma(c),
    h: clampDeg(h),
    alpha: clampUnit(alpha),
  };
}

export function clampOklabColor({ l, a, b, alpha }: OKLAB<number>) {
  return {
    l: clampUnit(l),
    a: clampOklabAB(a),
    b: clampOklabAB(b),
    alpha: clampUnit(alpha),
  };
}

export function clampOklchColor({ l, c, h, alpha }: OKLCH<number>) {
  return {
    l: clampUnit(l),
    c: clampOklchChroma(c),
    h: clampDeg(h),
    alpha: clampUnit(alpha),
  };
}

export function clampHexColor({ r, g, b, alpha }: HEX) {
  return {
    r: clampHex(r),
    g: clampHex(g),
    b: clampHex(b),
    alpha: clampHex(alpha),
  };
}

export function clampCmykColor({ c, m, y, k, alpha }: CMYK<number>) {
  return {
    c: clampUnit(c),
    m: clampUnit(m),
    y: clampUnit(y),
    k: clampUnit(k),
    alpha: clampUnit(alpha),
  };
}
