import {
  standardizePartialHSL,
  standardizePartialHWB,
  standardizePartialLAB,
  standardizePartialLCH,
  standardizePartialOKLAB,
  standardizePartialOKLCH,
  standardizePartialRGB,
} from "./standardize";
import {
  Color,
  RGB,
  Options,
  HSL,
  RawRGB,
  RawHSL,
  HWB,
  LAB,
  LCH,
  RawHWB,
  RawLAB,
  RawLCH,
  GetColor,
  HEX,
  OKLAB,
  RawOKLAB,
  OKLCH,
  RawOKLCH,
} from "./types";
import { colorToRgb100 } from "./utils";
import {
  hslToRgb,
  hwbToRgb,
  labToRgb,
  lchToRgb,
  rgbToHsl,
  rgbToHwb,
  rgbToLab,
  rgbToLch,
  rgb100ToRgb,
  rgbToHex,
} from "./colorTranslation";
import { merge } from "./helper";
import {
  hexToString,
  hslToString,
  hwbToString,
  labToString,
  lchToString,
  oklabToString,
  oklchToString,
  rgbToString,
} from "./stringify";
import { oklabToRgb, oklchToRgb, rgbToOklab, rgbToOklch } from "./okColors";

export default class ColorTranslator {
  private _rgb: RGB<number>;
  private _options: Options = {
    angleUnit: "none",
    legacy: false,
    spaced: true,
  };

  constructor(color: string | Color, options: Partial<Options> = {}) {
    this._options = merge(this._options, options);

    this._rgb = colorToRgb100(color);
  }

  // HEX

  get hex(): HEX & GetColor {
    return {
      ...rgbToHex(rgb100ToRgb(this._rgb)),
      toString: hexToString,
      options: this._options,
    };
  }

  // RGB

  get rgb(): RGB<number> & GetColor {
    return {
      ...rgb100ToRgb(this._rgb),
      toString: rgbToString,
      options: this._options,
    };
  }

  updateRgb(rgbRaw: Partial<RawRGB>) {
    const rgb = standardizePartialRGB(rgbRaw);
    this._rgb = merge(this._rgb, rgb);
  }

  // HSL

  get hsl(): HSL<number> & GetColor {
    return {
      ...rgbToHsl(this._rgb),
      toString: hslToString,
      options: this._options,
    };
  }

  updateHsl(hslRaw: Partial<RawHSL>) {
    const hsl = standardizePartialHSL(hslRaw);
    const currentHsl = rgbToHsl(this._rgb);
    const newHsl = merge(currentHsl, hsl);
    const rgb = hslToRgb(newHsl);
    this._rgb = rgb;
  }

  // HWB

  get hwb(): HWB<number> & GetColor {
    return {
      ...rgbToHwb(this._rgb),
      toString: hwbToString,
      options: this._options,
    };
  }

  updateHwb(hwbRaw: Partial<RawHWB>) {
    const hwb = standardizePartialHWB(hwbRaw);
    const currentHwb = rgbToHwb(this._rgb);
    const newHwb = merge(currentHwb, hwb);
    const rgb = hwbToRgb(newHwb);
    this._rgb = rgb;
  }

  // LAB

  get lab(): LAB<number> & GetColor {
    return {
      ...rgbToLab(this._rgb),
      toString: labToString,
      options: this._options,
    };
  }

  updateLab(labRaw: Partial<RawLAB>) {
    const lab = standardizePartialLAB(labRaw);
    const currentLab = rgbToLab(this._rgb);
    const newLab = merge(currentLab, lab);
    const rgb = labToRgb(newLab);
    this._rgb = rgb;
  }

  // LCH

  get lch(): LCH<number> & GetColor {
    return {
      ...rgbToLch(this._rgb),
      toString: lchToString,
      options: this._options,
    };
  }

  updateLch(lchRaw: Partial<RawLCH>) {
    const lch = standardizePartialLCH(lchRaw);
    const currentLch = rgbToLch(this._rgb);
    const newLch = merge(currentLch, lch);
    const rgb = lchToRgb(newLch);
    this._rgb = rgb;
  }

  // LAB

  get oklab(): OKLAB<number> & GetColor {
    return {
      ...rgbToOklab(this._rgb),
      toString: oklabToString,
      options: this._options,
    };
  }

  updateOklab(oklabRaw: Partial<RawOKLAB>) {
    const oklab = standardizePartialOKLAB(oklabRaw);
    const currentOklab = rgbToOklab(this._rgb);
    const newOklab = merge(currentOklab, oklab);
    const rgb = oklabToRgb(newOklab);
    this._rgb = rgb;
  }

  // LCH

  get oklch(): OKLCH<number> & GetColor {
    return {
      ...rgbToOklch(this._rgb),
      toString: oklchToString,
      options: this._options,
    };
  }

  updateokLch(oklchRaw: Partial<RawOKLCH>) {
    const oklch = standardizePartialOKLCH(oklchRaw);
    const currentokLch = rgbToOklch(this._rgb);
    const newokLch = merge(currentokLch, oklch);
    const rgb = oklchToRgb(newokLch);
    this._rgb = rgb;
  }

  // Options

  get options() {
    return this._options;
  }

  updateOptions(options: Partial<Options>) {
    this._options = merge(this._options, options);
  }
}
