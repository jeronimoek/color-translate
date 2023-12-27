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
import { ColorFormat } from "./enum";
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
  GeneralOptions,
  GetColor,
  HEX,
  HSL,
  HWB,
  LAB,
  LCH,
  OKLAB,
  OKLCH,
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
  private _options: GeneralOptions = {
    angleUnit: "none",
    legacy: false,
    spaced: true,
    limitToColorSpace: true,
    maxDigits: 2,
    cacheInput: true,
  };
  private _lastInput?: { format: ColorFormat; color: ColorInput };

  constructor(
    color: string | ColorInput,
    options: Partial<GeneralOptions> = {}
  ) {
    this._options = merge(this._options, options);

    const { rgb100, format, standardizedColor } = colorToRgb100(color);

    this.setCachedInput(format, standardizedColor);
    this._rgb = rgb100;
  }

  cachedInput(format: ColorFormat) {
    return this._options.cacheInput && this._lastInput?.format === format
      ? this._lastInput
      : undefined;
  }

  setCachedInput(format: ColorFormat, color: ColorInput) {
    this._lastInput = { format, color };
  }

  // HEX

  get hex(): HEX & GetColor {
    const rgb100 =
      (this.cachedInput(ColorFormat.RGB)?.color as RGB<number>) ?? this._rgb;
    return {
      ...rgbToHex(rgb100ToRgb(rgb100)),
      toString: hexToString,
      options: this._options,
    };
  }

  // HEX 0x

  get hex0x(): HEX & GetColor {
    const rgb100 =
      (this.cachedInput(ColorFormat.RGB)?.color as RGB<number>) ?? this._rgb;
    return {
      ...rgbToHex(rgb100ToRgb(rgb100)),
      toString: hex0xToString,
      options: this._options,
    };
  }

  // RGB

  get rgb(): RGB<number> & GetColor {
    const rgb100 =
      (this.cachedInput(ColorFormat.RGB)?.color as RGB<number>) ?? this._rgb;
    return {
      ...rgb100ToRgb(rgb100),
      toString: rgbToString,
      options: this._options,
    };
  }

  updateRgb(rgbRaw: Partial<RawRGB>) {
    const rgb100 =
      (this.cachedInput(ColorFormat.RGB)?.color as RGB<number>) ?? this._rgb;
    const rgb = standardizePartialRgb(rgbRaw);
    this._rgb = merge(rgb100, rgb);
    this.setCachedInput(ColorFormat.RGB, this._rgb);
  }

  // HSL

  get hsl(): HSL<number> & GetColor {
    const hsl =
      (this.cachedInput(ColorFormat.HSL)?.color as HSL<number>) ??
      rgbToHsl(this._rgb);
    return {
      ...hsl,
      toString: hslToString,
      options: this._options,
    };
  }

  updateHsl(hslRaw: Partial<RawHSL>) {
    const hsl = standardizePartialHsl(hslRaw);
    const currentHsl =
      (this.cachedInput(ColorFormat.HSL)?.color as HSL<number>) ??
      rgbToHsl(this._rgb);
    const newHsl = merge(currentHsl, hsl);
    this.setCachedInput(ColorFormat.HSL, newHsl);
    const rgb = hslToRgb(newHsl);
    this._rgb = rgb;
  }

  // HWB

  get hwb(): HWB<number> & GetColor {
    const hwb =
      (this.cachedInput(ColorFormat.HWB)?.color as HWB<number>) ??
      rgbToHwb(this._rgb);
    return {
      ...hwb,
      toString: hwbToString,
      options: this._options,
    };
  }

  updateHwb(hwbRaw: Partial<RawHWB>) {
    const hwb = standardizePartialHwb(hwbRaw);
    const currentHwb =
      (this.cachedInput(ColorFormat.HWB)?.color as HWB<number>) ??
      rgbToHwb(this._rgb);
    const newHwb = merge(currentHwb, hwb);
    this.setCachedInput(ColorFormat.HWB, newHwb);
    const rgb = hwbToRgb(newHwb);
    this._rgb = rgb;
  }

  // LAB

  get lab(): LAB<number> & GetColor {
    const lab =
      (this.cachedInput(ColorFormat.LAB)?.color as LAB<number>) ??
      rgbToLab(this._rgb);
    return {
      ...lab,
      toString: labToString,
      options: this._options,
    };
  }

  updateLab(labRaw: Partial<RawLAB>) {
    const lab = standardizePartialLab(labRaw);
    const currentLab =
      (this.cachedInput(ColorFormat.LAB)?.color as LAB<number>) ??
      rgbToLab(this._rgb);
    const newLab = merge(currentLab, lab);
    this.setCachedInput(ColorFormat.LAB, newLab);
    const rgb = labToRgb(newLab);
    this._rgb = rgb;
  }

  // LCH

  get lch(): LCH<number> & GetColor {
    const lch =
      (this.cachedInput(ColorFormat.LCH)?.color as LCH<number>) ??
      rgbToLch(this._rgb);
    return {
      ...lch,
      toString: lchToString,
      options: this._options,
    };
  }

  updateLch(lchRaw: Partial<RawLCH>) {
    const lch = standardizePartialLch(lchRaw);
    const currentLch =
      (this.cachedInput(ColorFormat.LCH)?.color as LCH<number>) ??
      rgbToLch(this._rgb);
    const newLch = merge(currentLch, lch);
    this.setCachedInput(ColorFormat.LCH, newLch);
    const rgb = lchToRgb(newLch);
    this._rgb = rgb;
  }

  // LAB

  get oklab(): OKLAB<number> & GetColor {
    const oklab =
      (this.cachedInput(ColorFormat.OKLAB)?.color as OKLAB<number>) ??
      rgbToOklab(this._rgb);
    return {
      ...oklab,
      toString: oklabToString,
      options: this._options,
    };
  }

  updateOklab(oklabRaw: Partial<RawOKLAB>) {
    const oklab = standardizePartialOklab(oklabRaw);
    const currentOklab =
      (this.cachedInput(ColorFormat.OKLAB)?.color as OKLAB<number>) ??
      rgbToOklab(this._rgb);
    const newOklab = merge(currentOklab, oklab);
    this.setCachedInput(ColorFormat.OKLAB, newOklab);
    const rgb = oklabToRgb(newOklab);
    this._rgb = rgb;
  }

  // LCH

  get oklch(): OKLCH<number> & GetColor {
    const oklch =
      (this.cachedInput(ColorFormat.OKLCH)?.color as OKLCH<number>) ??
      rgbToOklch(this._rgb);
    return {
      ...oklch,
      toString: oklchToString,
      options: this._options,
    };
  }

  updateOklch(oklchRaw: Partial<RawOKLCH>) {
    const oklch = standardizePartialOklch(oklchRaw);
    const currentokLch =
      (this.cachedInput(ColorFormat.OKLCH)?.color as OKLCH<number>) ??
      rgbToOklch(this._rgb);
    const newOkLch = merge(currentokLch, oklch);
    this.setCachedInput(ColorFormat.OKLCH, newOkLch);
    const rgb = oklchToRgb(newOkLch);
    this._rgb = rgb;
  }

  // CMYK

  get cmyk(): CMYK<number> & GetColor {
    const cmyk =
      (this.cachedInput(ColorFormat.DEVICE_CMYK)?.color as CMYK<number>) ??
      rgbToCmyk(this._rgb);
    return {
      ...cmyk,
      toString: cmykToString,
      options: this._options,
    };
  }

  updateCmyk(cmykRaw: Partial<RawCMYK>) {
    const cmyk = standardizePartialCmyk(cmykRaw);
    const currentCmyk =
      (this.cachedInput(ColorFormat.DEVICE_CMYK)?.color as CMYK<number>) ??
      rgbToCmyk(this._rgb);
    const newCmyk = merge(currentCmyk, cmyk);
    this.setCachedInput(ColorFormat.DEVICE_CMYK, newCmyk);
    const rgb = cmykToRgb(newCmyk);
    this._rgb = rgb;
  }

  // Options

  get options() {
    return this._options;
  }

  updateOptions(options: Partial<GeneralOptions>) {
    this._options = merge(this._options, options);
  }
}
