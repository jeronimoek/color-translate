import {
  standardizePartialHSL,
  standardizePartialHWB,
  standardizePartialLAB,
  standardizePartialLCH,
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
} from "./types";
import { colorToRgba } from "./utils";
import {
  hslToRgb,
  hwbToRgb,
  labToRgb,
  lchToRgb,
  rgbToHsl,
  rgbToHwb,
  rgbToLab,
  rgbToLch,
} from "./colorTranslation";
import { merge } from "./helper";
import {
  hslToString,
  hwbToString,
  labToString,
  lchToString,
  rgbToString,
} from "./stringify";

export default class ColorTranslator {
  private _rgb: RGB<number>;
  private _options: Options = {
    angleUnit: "none",
    legacy: false,
    spaced: true,
  };

  constructor(color: string | Color, options: Partial<Options> = {}) {
    this._options = merge(this._options, options);

    this._rgb = colorToRgba(color);
  }

  // RGB

  get rgb(): Required<RGB<number>> & GetColor {
    return {
      alpha: 1,
      ...this._rgb,
      toString: rgbToString,
      options: this._options,
    };
  }

  updateRgb(rgbRaw: Partial<RawRGB>) {
    const rgb = standardizePartialRGB(rgbRaw);
    this._rgb = merge(this._rgb, rgb);
  }

  // HSL

  get hsl(): Required<HSL<number>> & GetColor {
    return {
      alpha: 1,
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

  get hwb(): Required<HWB<number>> & GetColor {
    return {
      alpha: 1,
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

  get lab(): Required<LAB<number>> & GetColor {
    return {
      alpha: 1,
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

  get lch(): Required<LCH<number>> & GetColor {
    return {
      alpha: 1,
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

  // Options

  get options() {
    return this._options;
  }

  updateOptions(options: Partial<Options>) {
    this._options = merge(this._options, options);
  }
}
