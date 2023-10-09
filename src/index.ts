import {
  cmykToRgb,
  hslToRgb,
  hwbToRgb,
  labToRgb,
  lchToRgb,
  rgb100ToRgb,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  rgbToHwb,
  rgbToLab,
  rgbToLch,
} from "./colorTranslation";
import { merge } from "./helper";
import { oklabToRgb, oklchToRgb, rgbToOklab, rgbToOklch } from "./okColors";
import {
  standardizePartialCmyk,
  standardizePartialHsl,
  standardizePartialHwb,
  standardizePartialLab,
  standardizePartialLch,
  standardizePartialOklab,
  standardizePartialOklch,
  standardizePartialRgb,
} from "./standardize";
import {
  cmykToString,
  hex0xToString,
  hexToString,
  hslToString,
  hwbToString,
  labToString,
  lchToString,
  oklabToString,
  oklchToString,
  rgbToString,
} from "./stringify";
import {
  CMYK,
  ColorInput,
  GetColor,
  HEX,
  HSL,
  HWB,
  LAB,
  LCH,
  OKLAB,
  OKLCH,
  Options,
  RawCMYK,
  RawHSL,
  RawHWB,
  RawLAB,
  RawLCH,
  RawOKLAB,
  RawOKLCH,
  RawRGB,
  RGB,
} from "./types";
import { colorToRgb100 } from "./utils";

export default class ColorTranslator {
  private _rgb: RGB<number>;
  private _options: Options = {
    angleUnit: "none",
    legacy: false,
    spaced: true,
    limitToColorSpace: true,
    maxDigits: 2,
  };

  constructor(color: string | ColorInput, options: Partial<Options> = {}) {
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

  // HEX 0x

  get hex0x(): HEX & GetColor {
    return {
      ...rgbToHex(rgb100ToRgb(this._rgb)),
      toString: hex0xToString,
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
    const rgb = standardizePartialRgb(rgbRaw);
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
    const hsl = standardizePartialHsl(hslRaw);
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
    const hwb = standardizePartialHwb(hwbRaw);
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
    const lab = standardizePartialLab(labRaw);
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
    const lch = standardizePartialLch(lchRaw);
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
    const oklab = standardizePartialOklab(oklabRaw);
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

  updateOklch(oklchRaw: Partial<RawOKLCH>) {
    const oklch = standardizePartialOklch(oklchRaw);
    const currentokLch = rgbToOklch(this._rgb);
    const newokLch = merge(currentokLch, oklch);
    const rgb = oklchToRgb(newokLch);
    this._rgb = rgb;
  }

  // CMYK

  get cmyk(): CMYK<number> & GetColor {
    return {
      ...rgbToCmyk(this._rgb),
      toString: cmykToString,
      options: this._options,
    };
  }

  updateCmyk(cmykRaw: Partial<RawCMYK>) {
    const cmyk = standardizePartialCmyk(cmykRaw);
    const currentCmyk = rgbToCmyk(this._rgb);
    const newCmyk = merge(currentCmyk, cmyk);
    const rgb = cmykToRgb(newCmyk);
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
