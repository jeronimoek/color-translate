import { AngleUnit, ColorOutput } from "./enum";

export type ValuesArray = (number | string)[];

export type RecursivePartial<T> = T extends unknown[]
  ? T
  : {
      [P in keyof T]?: RecursivePartial<T[P]>;
    };

export interface HEX {
  r: string;
  g: string;
  b: string;
  alpha: string;
}

export interface RGB<T extends number | string> {
  r: T;
  g: T;
  b: T;
  alpha: T;
}
export type RawRGB = RGB<number> | RGB<string>;

/**
 * Hue: 0-360
 * Saturation: 0-100
 * Lightness: 0-100
 */
export interface HSL<T extends number | string> {
  h: T;
  s: T;
  l: T;
  alpha: T;
}

export type RawHSL = HSL<number> | HSL<string>;

export interface HWB<T extends number | string> {
  h: T;
  w: T;
  b: T;
  alpha: T;
}

export type RawHWB = HWB<number> | HWB<string>;

export interface LAB<T extends number | string> {
  l: T;
  a: T;
  b: T;
  alpha: T;
}

export type RawLAB = LAB<number> | LAB<string>;

export interface LCH<T extends number | string> {
  l: T;
  c: T;
  h: T;
  alpha: T;
}

export type RawLCH = LCH<number> | LCH<string>;

export interface OKLAB<T extends number | string> {
  l: T;
  a: T;
  b: T;
  ok: true;
  alpha: T;
}

export type RawOKLAB = OKLAB<number> | OKLAB<string>;

export interface OKLCH<T extends number | string> {
  l: T;
  c: T;
  h: T;
  ok: true;
  alpha: T;
}

export type RawOKLCH = OKLCH<number> | OKLCH<string>;

/**
 * Cyan: 0-1
 * Magenta: 0-1
 * Yellow: 0-1
 * Black: 0-1
 */
export interface CMYK<T extends number | string> {
  c: T;
  m: T;
  y: T;
  k: T;
  alpha: T;
}

export type RawCMYK = CMYK<number> | CMYK<string>;

/**
 * Red: 0-1
 * Green: 0-1
 * Blue: 0-1
 */
export interface A98<T extends number | string> {
  r: T;
  g: T;
  b: T;
  a98: true;
  alpha: T;
}

export type RawA98 = A98<number> | A98<string>;

export type Color =
  | A98<number>
  | A98<string>
  | RGB<number>
  | RGB<string>
  | HSL<number>
  | HSL<string>
  | HWB<number>
  | HWB<string>
  | LAB<number>
  | LAB<string>
  | LCH<number>
  | LCH<string>
  | OKLAB<number>
  | OKLAB<string>
  | OKLCH<number>
  | OKLCH<string>
  | CMYK<number>
  | CMYK<string>;

type MapOptionalAlpha<U> = U extends Color
  ? Omit<U, "alpha"> & { alpha?: Color["alpha"] }
  : never;

export type ColorInput = MapOptionalAlpha<Color>;

type AngleUnitType = `${AngleUnit}`;

interface ValueProperties {
  from?: number;
  to?: number;
  suffix?: string;
  maxDigits?: number;
}

export interface CustomOutput<T extends Color> {
  template: string;
  templateWithAlpha: string;
  values: { [keyof in keyof T]?: ValueProperties };
}

export interface CustomOutputs {
  [ColorOutput.RGB]: CustomOutput<RGB<number>>;
  [ColorOutput.HEX]: CustomOutput<HEX>;
  [ColorOutput.HEX_0x]: CustomOutput<HEX>;
  [ColorOutput.HSL]: CustomOutput<HSL<number>>;
  [ColorOutput.HWB]: CustomOutput<HWB<number>>;
  [ColorOutput.LAB]: CustomOutput<LAB<number>>;
  [ColorOutput.LCH]: CustomOutput<LCH<number>>;
  [ColorOutput.OKLAB]: CustomOutput<OKLAB<number>>;
  [ColorOutput.OKLCH]: CustomOutput<OKLCH<number>>;
  [ColorOutput.CMYK]: CustomOutput<CMYK<number>>;
  [ColorOutput.A98]: CustomOutput<A98<number>>;
}

export interface StringOptions {
  legacy: boolean;
  spaced: boolean;
  angleUnit: AngleUnitType;
  maxDigits: number;
  limitToColorSpace: boolean;
  customOutputs?: CustomOutputs;
}

export interface GeneralOptions extends StringOptions {
  cacheInput: boolean;
}

type ToStringColor = (options?: RecursivePartial<StringOptions>) => string;

export interface GetColor {
  toString: ToStringColor;
  options: StringOptions;
}
