import { OKLAB, OKLCH, RGB } from "./types";
import { hueParse } from "./unitTranslation";
import {
  clamp,
  degToRad,
  oklabABRawToNumber,
  oklchChromaRawToNumber,
  percentageToNumber,
  radToDeg,
} from "./utils";

// correlary of first psuedocode block here (f_inv) : https://bottosson.github.io/posts/colorwrong/#what-can-we-do%3F ; "applying the inverse of the sRGB nonlinear transform function.." -- keeping the abbreviated syntax of arrow functions and ? : if/then, despite that they confuse and stretch my noob brain:
const gammaToLinear = (c: number) =>
  c >= 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
// correlary of the first " : "..then switching back" :
const linearToGamma = (c: number) =>
  c >= 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;

export function rgbToOklab({ r, g, b, alpha }: RGB<number>): OKLAB<number> {
  // This is my undersanding: JavaScript canvas and many other virtual and literal devices use gamma-corrected (non-linear lightness) RGB, or sRGB. To convert sRGB values for manipulation in the Oklab color space, you must first convert them to linear RGB. Where Oklab interfaces with RGB it expects and returns linear RGB values. This next step converts (via a function) sRGB to linear RGB for Oklab to use:
  r = gammaToLinear(r / 100);
  g = gammaToLinear(g / 100);
  b = gammaToLinear(b / 100);
  // This is the Oklab math:
  let l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  let m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  let s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  // Math.crb (cube root) here is the equivalent of the C++ cbrtf function here: https://bottosson.github.io/posts/oklab/#converting-from-linear-srgb-to-oklab
  l = Math.cbrt(l);
  m = Math.cbrt(m);
  s = Math.cbrt(s);
  return {
    l: l * +0.2104542553 + m * +0.793617785 + s * -0.0040720468,
    a: l * +1.9779984951 + m * -2.428592205 + s * +0.4505937099,
    b: l * +0.0259040371 + m * +0.7827717662 + s * -0.808675766,
    alpha,
    ok: true,
  };
}

export function oklabToRgb(lab: OKLAB<number> | OKLAB<string>): RGB<number> {
  const numberLab: OKLAB<number> = {
    l: percentageToNumber(lab.l),
    a: oklabABRawToNumber(lab.a),
    b: oklabABRawToNumber(lab.b),
    alpha: percentageToNumber(lab.alpha),
    ok: lab.ok,
  };
  let l =
    numberLab.l + numberLab.a * +0.3963377774 + numberLab.b * +0.2158037573;
  let m =
    numberLab.l + numberLab.a * -0.1055613458 + numberLab.b * -0.0638541728;
  let s =
    numberLab.l + numberLab.a * -0.0894841775 + numberLab.b * -1.291485548;
  l = l ** 3;
  m = m ** 3;
  s = s ** 3;
  let r = l * +4.0767416621 + m * -3.3077115913 + s * +0.2309699292;
  let g = l * -1.2684380046 + m * +2.6097574011 + s * -0.3413193965;
  let b = l * -0.0041960863 + m * -0.7034186147 + s * +1.707614701;
  // Convert linear RGB values returned from oklab math to sRGB for our use before returning them:
  r = 100 * linearToGamma(r);
  g = 100 * linearToGamma(g);
  b = 100 * linearToGamma(b);
  // OPTION: clamp r g and b values to the range 0-255; but if you use the values immediately to draw, JavaScript clamps them on use:
  r = clamp(r, 0, 100);
  g = clamp(g, 0, 100);
  b = clamp(b, 0, 100);
  return { r, g, b, alpha: numberLab.alpha };
}

export function oklchToRgb({
  l,
  c,
  h,
  alpha,
  ok,
}: OKLCH<number> | OKLCH<string>): RGB<number> {
  const numberLch: OKLCH<number> = {
    l: percentageToNumber(l),
    c: oklchChromaRawToNumber(c),
    h: hueParse(h),
    alpha: percentageToNumber(alpha),
    ok,
  };
  return oklabToRgb(lchToLab(numberLch));
}

export function rgbToOklch(rgb: RGB<number>): OKLCH<number> {
  return labToLch(rgbToOklab(rgb));
}

function labToLch({ l, a, b, alpha, ok }: OKLAB<number>): OKLCH<number> {
  return {
    l,
    c: Math.sqrt(a ** 2 + b ** 2),
    h: radToDeg(Math.atan2(b, a)),
    alpha,
    ok,
  };
}

function lchToLab({ l, c, h, alpha, ok }: OKLCH<number>): OKLAB<number> {
  return {
    l,
    a: c * Math.cos(degToRad(h)),
    b: c * Math.sin(degToRad(h)),
    alpha,
    ok,
  };
}
