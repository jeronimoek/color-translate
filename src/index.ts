import ColorTranslator from "./colorTranslator";
import {
  cmyk as cmykRegex,
  color as colorRegex,
  hex0x as hex0xRegex,
  hex as hexRegex,
  hsl as hslRegex,
  hwb as hwbRegex,
  lab as labRegex,
  lch as lchRegex,
  oklab as oklabRegex,
  oklch as oklchRegex,
  rgb as rgbRegex,
} from "./regex";

export default ColorTranslator;
export * from "./types";
export {
  ColorTranslator,
  cmykRegex,
  colorRegex,
  hexRegex,
  hex0xRegex,
  hslRegex,
  hwbRegex,
  labRegex,
  lchRegex,
  oklabRegex,
  oklchRegex,
  rgbRegex,
};
