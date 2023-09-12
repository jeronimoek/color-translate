declare module "@csstools/convert-colors" {
  /**
   * An array of red, green, and blue channels.
   * 0 - Red (0 - 100).
   * 1 - Green (0 - 100).
   * 2 - Blue (0 - 100).
   */
  export type ArrayRGB = [number, number, number];
  /**
   * An array of red, green, blue, and alpha channels.
   * 0 - Red (0 - 100).
   * 1 - Green (0 - 100).
   * 2 - Blue (0 - 100).
   * 3 - Alpha (0 - 100).
   */
  export type ArrayRGBA = [number, number, number, number];
  /**
   * An array of hue, saturation, and lightness channels.
   * 0 - Hue Angle (0 - 360).
   * 1 - Saturation (0 - 100).
   * 2 - Lightness (0 - 100).
   */
  export type ArrayHSL = [number, number, number];
  /**
   * An array of hue, saturation, and value channels.
   * 0 - Hue Angle (0 - 360).
   * 1 - Saturation (0 - 100).
   * 2 - Value (0 - 100).
   */
  export type ArrayHSV = [number, number, number];
  /**
   * An array of CIELAB lightness, red/green, and yellow/blue.
   * 0 - CIE Lightness.
   * 1 - Red/Green Coordinate.
   * 2 - Yellow/Blue Coordinate.
   */
  export type ArrayLAB = [number, number, number];
  /**
   * An array of CIELAB lightness, chroma, and hue.
   * 0 - CIE Lightness.
   * 1 - CIE Chroma.
   * 2 - CIE Hue.
   */
  export type ArrayLCH = [number, number, number];
  /**
   * An array of hue, whiteness, and blackness channels.
   * 0 - Hue Angle (0 - 360).
   * 1 - Whiteness (0 - 100).
   * 2 - Blackness (0 - 100).
   */
  export type ArrayHWB = [number, number, number];
  /**
   * An array of CIELAB chromacity.
   * 0 - X Chromacity.
   * 1 - Y Chromacity.
   * 2 - Z Chromacity.
   */
  export type ArrayXYZ = [number, number, number];
  /**
   * A string representing the 3, 4, 6, or 8 digit hexidecimal color.
   */
  export type StringHex = string;
  /**
   * A case-insensitive string identifier that represents a specific color.
   */
  export type StringKeyword = string;
  /**
   * A contrast ratio of the colors (0 - 21)
   */
  export type NumberContrast = number;
  /**
   * A CIEDE2000 difference between 2 colors (0 - 100)
   */
  export type NumberCIEDE = number;
  /**
   * @function hex2ciede
   * @description Return the CIEDE2000 difference between 2 HEX colors
   * @param {StringHex} hex1
   * @param {StringHex} hex2
   * @returns {NumberCIEDE}
   * @example
   * hex2ciede('#fff', '#000') // => 100
   */
  export function hex2ciede(hex1: StringHex, hex2: StringHex): NumberCIEDE;
  /**
   * @function hex2contrast
   * @description Return the contrast ratio of 2 HEX colors
   * @param {StringHex} hex1
   * @param {StringHex} hex2
   * @returns {NumberContrast}
   * @example
   * rgb2contrast("#fff", '#000') // => 21
   */
  export function hex2contrast(
    hex1: StringHex,
    hex2: StringHex
  ): NumberContrast;
  /**
   * @function hex2hsl
   * @description Return an HSL color from a Hex color
   * @param {StringHex} hex
   * @returns {ArrayHSL}
   * @example
   * hex2hsl("#f00") // => [0, 100, 50]
   */
  export function hex2hsl(hex: StringHex): ArrayHSL;
  /**
   * @function hex2hsv
   * @description Return an HSL color from a Hex color
   * @param {StringHex} hex
   * @returns {ArrayHSV}
   * @example
   * hex2hsv("#f00") // => [0, 100, 100]
   */
  export function hex2hsv(hex: StringHex): ArrayHSV;
  /**
   * @function hex2hwb
   * @description Return an HWB color from a Hex color
   * @param {StringHex} hex
   * @returns {ArrayHWB}
   * @example
   * hex2hwb("#f00") // => [0, 0, 0]
   */
  export function hex2hwb(hex: StringHex): ArrayHWB;
  /**
   * @function hex2lab
   * @description Return a CIE LAB color from a Hex color
   * @param {StringHex} hex
   * @returns {ArrayLAB}
   * @example
   * hex2lab("#f00") // => [54.29, 80.82, 69.88]
   */
  export function hex2lab(hex: StringHex): ArrayLAB;
  /**
   * @function hex2lch
   * @description Return a CIE LCH color from a Hex color
   * @param {StringHex} hex
   * @returns {ArrayLCH}
   * @example
   * hex2lch("#f00") // => [54.29, 106.84, 40.85]
   */
  export function hex2lch(hex: StringHex): ArrayLCH;
  /**
   * @function hex2rgb
   * @description Return an RGBA color from a Hex color.
   * @param {StringHex} hex
   * @returns {ArrayRGBA}
   * @example
   * hex2rgb("#f00") // => [100, 0, 0, 100]
   * hex2rgb("#f00f") // => [100, 0, 0, 100]
   * @example
   * hex2rgb("#ff0000") // => [100, 0, 0, 100]
   * hex2rgb("#ff0000ff") // => [100, 0, 0, 100]
   */
  export function hex2rgb(hex: StringHex): ArrayRGBA;
  /**
   * @function hex2xyz
   * @description Return an XYZ color from a Hex color
   * @param {StringHex} hex
   * @returns {ArrayXYZ}
   * @example
   * hex2xyz("#f00") // => [41.25, 21.27, 1.93]
   */
  export function hex2xyz(hex: StringHex): ArrayXYZ;
  /**
   * @function hsl2ciede
   * @description Return the CIEDE2000 difference between 2 HSL colors
   * @param {ArrayHSL} hsl1
   * @param {ArrayHSL} hsl2
   * @returns {NumberCIEDE}
   * @example
   * hsl2ciede([0, 0, 100], [0, 0, 0]) // => 100
   */
  export function hsl2ciede(hsl1: ArrayHSL, hsl2: ArrayHSL): NumberCIEDE;
  /**
   * @function hsl2contrast
   * @description Return the contrast ratio of 2 HSL colors
   * @param {ArrayHSL} hsl1
   * @param {ArrayHSL} hsl2
   * @returns {NumberContrast}
   * @example
   * hsl2contrast([0, 0, 100], [0, 0, 0]) // => 21
   */
  export function hsl2contrast(hsl1: ArrayHSL, hsl2: ArrayHSL): NumberContrast;
  /**
   * @function hsl2hex
   * @description Return a Hex color from an HSL color
   * @param {number} hslH - Hue Angle (0 - 360)
   * @param {number} hslS - Saturation (0 - 100)
   * @param {number} hslL - Lightness (0 - 100)
   * @returns {StringHex}
   * @example
   * hsl2hex(0, 100, 50) // => "#f00"
   */
  export function hsl2hex(hslH: number, hslS: number, hslL: number): StringHex;
  /**
   * @function hsl2hsv
   * @description Return an HSV color from an HSL color
   * @param {number} hslH - Hue Angle (0 - 360)
   * @param {number} hslS - Saturation (0 - 100)
   * @param {number} hslL - Lightness (0 - 100)
   * @returns {ArrayHSV}
   * @example
   * hsl2hsv(0, 100, 50)
   */
  export function hsl2hsv(hslH: number, hslS: number, hslL: number): ArrayHSV;
  /**
   * @function hsl2hwb
   * @description Return an HWB color from an HSL color
   * @param {number} hslH - Hue Angle (0 - 360)
   * @param {number} hslS - Saturation (0 - 100)
   * @param {number} hslL - Lightness (0 - 100)
   * @returns {ArrayHWB}
   * @example
   * hsl2hwb(0, 0, 100) // => [0, 0, 0]
   */
  export function hsl2hwb(hslH: number, hslS: number, hslL: number): ArrayHWB;
  /**
   * @function hsl2lab
   * @description Return a CIE LAB color from an HSL color
   * @param {number} hslH - Hue Angle (0 - 360)
   * @param {number} hslS - Saturation (0 - 100)
   * @param {number} hslL - Lightness (0 - 100)
   * @returns {ArrayLAB}
   * @example
   * hsl2lab(0, 100, 50) // => [54.29, 80.82, 69.88]
   */
  export function hsl2lab(hslH: number, hslS: number, hslL: number): ArrayLAB;
  /**
   * @function hsl2lch
   * @description Return a CIE LCH color from an HSL color
   * @param {number} hslH - Hue Angle (0 - 360)
   * @param {number} hslS - Saturation (0 - 100)
   * @param {number} hslL - Lightness (0 - 100)
   * @returns {ArrayLCH}
   * @example
   * hsl2lch(0, 100, 50) // => [54.29, 106.84, 40.85]
   */
  export function hsl2lch(hslH: number, hslS: number, hslL: number): ArrayLCH;
  /**
   * @function hsl2rgb
   * @description Return an RGB color from an HSL color
   * @param {number} hslH - Hue Angle (0 - 360)
   * @param {number} hslS - Saturation (0 - 100)
   * @param {number} hslL - Lightness (0 - 100)
   * @returns {ArrayRGB}
   * @example
   * hsl2rgb(0, 100, 50) // => [0, 100, 100]
   */
  export function hsl2rgb(hslH: number, hslS: number, hslL: number): ArrayRGB;
  /**
   * @function hsl2xyz
   * @description Return an XYZ color from an HSL color
   * @param {number} hslH - Hue Angle (0 - 360)
   * @param {number} hslS - Saturation (0 - 100)
   * @param {number} hslL - Lightness (0 - 100)
   * @returns {ArrayXYZ}
   * @example
   * hsl2xyz(0, 100, 50) // => [41.25, 21.27, 1.93]
   */
  export function hsl2xyz(hslH: number, hslS: number, hslL: number): ArrayXYZ;
  /**
   * @function hsv2ciede
   * @description Return the CIEDE2000 difference between 2 HSV colors
   * @param {ArrayHSV} hsv1
   * @param {ArrayHSV} hsv2
   * @returns {NumberCIEDE}.
   * @example
   * hsv2ciede([0, 0, 40], [0, 0, 0]) // => 100
   */
  export function hsv2ciede(hsv1: ArrayHSV, hsv2: ArrayHSV): NumberCIEDE;
  /**
   * @function hsv2contrast
   * @description Return the contrast ratio of 2 HSV colors
   * @param {ArrayHSV} hsv1
   * @param {ArrayHSV} hsv2
   * @returns {NumberContrast}
   * @example
   * hsv2contrast([0, 0, 100], [0, 0, 0]) // => 21
   */
  export function hsv2contrast(hsv1: ArrayHSV, hsv2: ArrayHSV): NumberContrast;
  /**
   * @function hsv2hex
   * @description Return a Hex color from an HSV color
   * @param {number} hsvH - Hue Angle (0 - 360)
   * @param {number} hsvS - Saturation (0 - 100)
   * @param {number} hsvV - Value (0 - 100)
   * @returns {StringHex}
   * @example
   * hsv2hex(0, 100, 100) // => "#f00"
   */
  export function hsv2hex(hsvH: number, hsvS: number, hsvV: number): StringHex;
  /**
   * @function hsv2hsl
   * @description Return an HSL color from an HSV color
   * @param {number} hsvH - Hue Angle (0 - 360)
   * @param {number} hsvS - Saturation (0 - 100)
   * @param {number} hsvV - Value (0 - 100)
   * @returns {ArrayHSL}
   * @example
   * hsv2hsl(0, 0, 0) // => [0, 100, 50]
   */
  export function hsv2hsl(hsvH: number, hsvS: number, hsvV: number): ArrayHSL;
  /**
   * @function hsv2hwb
   * @description Return an HWB color from an HSV color
   * @param {number} hsvH - Hue Angle (0 - 360)
   * @param {number} hsvS - Saturation (0 - 100)
   * @param {number} hsvV - Value (0 - 100)
   * @returns {ArrayHWB}
   * @example
   * hsv2hwb(0, 100, 100) // => [0, 0, 0]
   */
  export function hsv2hwb(hsvH: number, hsvS: number, hsvV: number): ArrayHWB;
  /**
   * @function hsv2lab
   * @description Return a CIE LAB color from an HSV color
   * @param {number} hsvH - Hue Angle (0 - 360)
   * @param {number} hsvS - Saturation (0 - 100)
   * @param {number} hsvV - Value (0 - 100)
   * @returns {ArrayLAB}
   * @example
   * hsv2lab(0, 100, 100) // => [54.29, 80.82, 69.88]
   */
  export function hsv2lab(hsvH: number, hsvS: number, hsvV: number): ArrayLAB;
  /**
   * @function hsv2lch
   * @description Return a CIE LCH color from an HSV color
   * @param {number} hsvH - Hue Angle (0 - 360)
   * @param {number} hsvS - Saturation (0 - 100)
   * @param {number} hsvV - Value (0 - 100)
   * @returns {ArrayLCH}
   * @example
   * hsv2lch(0, 100, 100) // => [54.29, 106.84, 40.85]
   */
  export function hsv2lch(hsvH: number, hsvS: number, hsvV: number): ArrayLCH;
  /**
   * @function hsv2rgb
   * @description Return an RGB color from an HSV color
   * @param {number} hsvH - Hue Angle (0 - 360)
   * @param {number} hsvS - Saturation (0 - 100)
   * @param {number} hsvV - Value (0 - 100)
   * @returns {ArrayRGB}
   * @example
   * hsv2rgb(100, 0, 0) // => [100, 0, 0]
   */
  export function hsv2rgb(hsvH: number, hsvS: number, hsvV: number): ArrayRGB;
  /**
   * @function hsv2xyz
   * @description Return an XYZ color from an HSV color
   * @param {number} hsvH - Hue Angle (0 - 360)
   * @param {number} hsvS - Saturation (0 - 100)
   * @param {number} hsvV - Value (0 - 100)
   * @returns {ArrayXYZ}
   * @example
   * hsv2xyz(0, 100, 100) // => [41.25, 21.27, 1.93]
   */
  export function hsv2xyz(hsvH: number, hsvS: number, hsvV: number): ArrayXYZ;
  /**
   * @function hwb2ciede
   * @description Return the CIEDE2000 difference between 2 HWB colors
   * @param {ArrayHWB} hwb1
   * @param {ArrayHWB} hwb2
   * @returns {NumberCIEDE}.
   * @example
   * hwb2ciede([0, 0, 40], [0, 0, 0]) // => 100
   */
  export function hwb2ciede(hwb1: ArrayHWB, hwb2: ArrayHWB): NumberCIEDE;
  /**
   * @function hwb2contrast
   * @description Return the contrast ratio of 2 HWB colors
   * @param {ArrayHWB} hwb1
   * @param {ArrayHWB} hwb2
   * @returns {NumberContrast}
   * @example
   * hwb2contrast([0, 100, 0], [0, 0, 100]) // => 21
   */
  export function hwb2contrast(hwb1: ArrayHWB, hwb2: ArrayHWB): NumberContrast;
  /**
   * @function hwb2hex
   * @description Return a Hex color from an HWB color
   * @param {number} hwbH - Hue Angle (0 - 360)
   * @param {number} hwbW - Whiteness (0 - 100)
   * @param {number} hwbB - Blackness (0 - 100)
   * @returns {StringHex}
   * @example
   * hwb2hex(0, 0, 0) // => "#f00"
   */
  export function hwb2hex(hwbH: number, hwbW: number, hwbB: number): StringHex;
  /**
   * @function hwb2hsl
   * @description Return an HSV color from an HWB color
   * @param {number} hwbH - Hue Angle (0 - 360)
   * @param {number} hwbW - Whiteness (0 - 100)
   * @param {number} hwbB - Blackness (0 - 100)
   * @returns {ArrayHSL}
   * @example
   * hwb2hsl(0, 0, 0) // => [0, 0, 100]
   */
  export function hwb2hsl(hwbH: number, hwbW: number, hwbB: number): ArrayHSL;
  /**
   * @function hwb2hsv
   * @description Return an HSV color from an HWB color
   * @param {number} hwbH - Hue Angle (0 - 360)
   * @param {number} hwbW - Whiteness (0 - 100)
   * @param {number} hwbB - Blackness (0 - 100)
   * @returns {ArrayHSV}
   * @example
   * hwb2hsv(0, 0, 0) // => [0, 100, 100]
   */
  export function hwb2hsv(hwbH: number, hwbW: number, hwbB: number): ArrayHSV;
  /**
   * @function hwb2lab
   * @description Return a CIE LAB color from an HWB color
   * @param {number} hwbH - Hue Angle (0 - 360)
   * @param {number} hwbW - Whiteness (0 - 100)
   * @param {number} hwbB - Blackness (0 - 100)
   * @returns {ArrayLAB}
   * @example
   * hwb2lab(0, 0, 0) // => [54.29, 80.82, 69.88]
   */
  export function hwb2lab(hwbH: number, hwbW: number, hwbB: number): ArrayLAB;
  /**
   * @function hwb2lch
   * @description Return a CIE LCH color from an HWB color
   * @param {number} hwbH - Hue Angle (0 - 360)
   * @param {number} hwbW - Whiteness (0 - 100)
   * @param {number} hwbB - Blackness (0 - 100)
   * @returns {ArrayLCH}
   * @example
   * hwb2lch(0, 0, 0) // => [54.29, 106.84, 40.85]
   */
  export function hwb2lch(hwbH: number, hwbW: number, hwbB: number): ArrayLCH;
  /**
   * @function hwb2rgb
   * @description Return an RGB color from an HWB color
   * @param {number} hwbH - Hue Angle (0 - 360)
   * @param {number} hwbW - Whiteness (0 - 100)
   * @param {number} hwbB - Blackness (0 - 100)
   * @returns {ArrayRGB}
   * @example
   * hwb2rgb(0, 0, 0) // => [100, 0, 0]
   */
  export function hwb2rgb(hwbH: number, hwbW: number, hwbB: number): ArrayRGB;
  /**
   * @function hwb2xyz
   * @description Return an XYZ color from an HWB color
   * @param {number} hwbH - Hue Angle (0 - 360)
   * @param {number} hwbW - Whiteness (0 - 100)
   * @param {number} hwbB - Blackness (0 - 100)
   * @returns {ArrayXYZ}
   * @example
   * hwb2xyz(0, 0, 0) // => [41.25, 21.27, 1.93]
   */
  export function hwb2xyz(hwbH: number, hwbW: number, hwbB: number): ArrayXYZ;
  /**
   * @function keyword2ciede
   * @description Return the CIEDE2000 difference between 2 keyword colors
   * @param {StringKeyword} keyword1
   * @param {StringKeyword} keyword2
   * @returns {NumberCIEDE}.
   * @example
   * keyword2ciede('white', 'black') // => 100
   */
  export function keyword2ciede(
    keyword1: StringKeyword,
    keyword2: StringKeyword
  ): NumberCIEDE;
  /**
   * @function keyword2contrast
   * @description Return the contrast ratio of 2 keyword colors
   * @param {StringKeyword} keyword1
   * @param {StringKeyword} keyword2
   * @returns {NumberContrast}
   * @example
   * keyword2contrast('white', 'black') // => 21
   */
  export function keyword2contrast(
    keyword1: StringKeyword,
    keyword2: StringKeyword
  ): NumberContrast;
  /**
   * @function keyword2hex
   * @description Return an RGB color from a keyword color
   * @param {StringKeyword} keyword - CSS Color Keyword
   * @returns {string}
   * @example
   * keyword2hex('white') // => "#ffffff"
   */
  export function keyword2hex(keyword: StringKeyword): string;
  /**
   * @function keyword2hsl
   * @description Return an HSL color from a keyword color
   * @param {StringKeyword} keyword
   * @returns {ArrayHSL}
   * @example
   * keyword2hsl('white') // => [0, 0, 100]
   */
  export function keyword2hsl(keyword: StringKeyword): ArrayHSL;
  /**
   * @function keyword2hsv
   * @description Return an HSV color from a keyword color
   * @param {StringKeyword} keyword
   * @returns {ArrayHSV}
   * @example
   * keyword2hsv('white') // => [0, 0, 100]
   */
  export function keyword2hsv(keyword: StringKeyword): ArrayHSV;
  /**
   * @function keyword2hwb
   * @description Return an HWB color from a keyword color
   * @param {StringKeyword} keyword
   * @returns {ArrayHWB}
   * @example
   * keyword2hwb('red') // => [0, 0, 0]
   */
  export function keyword2hwb(keyword: StringKeyword): ArrayHWB;
  /**
   * @function keyword2lab
   * @description Return a CIE LAB color from a keyword color
   * @param {StringKeyword} keyword
   * @returns {ArrayLAB}
   * @example
   * keyword2lab('red') // => [54.29, 80.82, 69.88]
   */
  export function keyword2lab(keyword: StringKeyword): ArrayLAB;
  /**
   * @function keyword2lch
   * @description Return a CIE LCH color from a keyword color
   * @param {StringKeyword} keyword
   * @returns {ArrayLCH}
   * @example
   * keyword2lch('red') // => [54.29, 106.84, 40.85]
   */
  export function keyword2lch(keyword: StringKeyword): ArrayLCH;
  /**
   * @function keyword2rgb
   * @description Return an RGB color from a CSS keyword color
   * @param {StringKeyword} keyword
   * @returns {ArrayRGB}
   * @example
   * keyword2rgb('red') // => [100, 0, 0]
   */
  export function keyword2rgb(keyword: StringKeyword): ArrayRGB;
  /**
   * @function keyword2lch
   * @description Return an XYZ color from a keyword color
   * @param {StringKeyword} keyword
   * @returns {ArrayXYZ}
   * @example
   * keyword2lch('red') // => [41.25, 21.27, 1.93]
   */
  export function keyword2xyz(keyword: StringKeyword): ArrayXYZ;
  /**
   * @function lab2ciede
   * @description Return the CIEDE2000 difference between 2 CIE LAB colors (International Commission on Illumination, Delta E).
   * @param {[number,number,number]} lab1 - CIE LAB color
   * @param {[number,number,number]} lab2 - CIE LAB color
   * @returns {NumberCIEDE}
   * @example
   * lab2ciede([97.14, -21.56, 94.48], [0, 0, 0]) // => 100
   */
  export function lab2ciede(
    lab1: [number, number, number],
    lab2: [number, number, number]
  ): NumberCIEDE;
  /**
   * @function lab2contrast
   * @description Return the contrast ratio of 2 LAB colors
   * @param {ArrayLAB} lab1
   * @param {ArrayLAB} lab2
   * @returns {NumberContrast}
   * @example
   * lab2contrast([100, 0.003, -0.025], [0, 0, 0]) // => 21
   */
  export function lab2contrast(lab1: ArrayLAB, lab2: ArrayLAB): NumberContrast;
  /**
   * @function lab2hex
   * @description Return a Hex color from a CIE LAB color
   * @param {number} labL - CIE Lightness
   * @param {number} labA - Red/Green Coordinate
   * @param {number} labB - Yellow/Blue Coordinate
   * @returns {StringHex}
   * @example
   * lab2hex(54.29, 80.82, 69.88) // => "#f00"
   */
  export function lab2hex(labL: number, labA: number, labB: number): StringHex;
  /**
   * @function lab2hsl
   * @description Return a HSL color from a CIE LAB color
   * @param {number} labL - CIE Lightness
   * @param {number} labA - Red/Green Coordinate
   * @param {number} labB - Yellow/Blue Coordinate
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayHSL}
   * @example
   * lab2hsl(54.29, 80.82, 69.88) // => [0, 100, 50]
   */
  export function lab2hsl(
    labL: number,
    labA: number,
    labB: number,
    fallbackhue?: number | undefined
  ): ArrayHSL;
  /**
   * @function lab2hsv
   * @description Return an HSV color from a CIE LAB color
   * @param {number} labL - CIE Lightness
   * @param {number} labA - Red/Green Coordinate
   * @param {number} labB - Yellow/Blue Coordinate
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayHSV}
   * @example
   * lab2hsv(54.29, 80.82, 69.88) // => [0, 100, 100]
   */
  export function lab2hsv(
    labL: number,
    labA: number,
    labB: number,
    fallbackhue?: number | undefined
  ): ArrayHSV;
  /**
   * @function lab2hwb
   * @description Return an HWB color from a CIE LAB color
   * @param {number} labL - CIE Lightness
   * @param {number} labA - Red/Green Coordinate
   * @param {number} labB - Yellow/Blue Coordinate
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayHWB}
   * @example
   * lab2hwb(54.29, 80.82, 69.88) // => [0, 0, 0]
   */
  export function lab2hwb(
    labL: number,
    labA: number,
    labB: number,
    fallbackhue?: number | undefined
  ): ArrayHWB;
  /**
   * @function lab2lch
   * @description Return an LCH color from a LAB color
   * @param {number} labL - CIE Lightness
   * @param {number} labA - Red/Green Coordinate
   * @param {number} labB - Yellow/Blue Coordinate
   * @returns {ArrayLAB}
   * @example
   * lab2lch(54.29, 80.82, 69.88) // => [54.29, 106.84, 40.85]
   */
  export function lab2lch(labL: number, labA: number, labB: number): ArrayLAB;
  /**
   * @function lab2rgb
   * @description Return an RGB color from a CIE LAB color
   * @param {number} labL - CIE Lightness
   * @param {number} labA - Red/Green Coordinate
   * @param {number} labB - Yellow/Blue Coordinate
   * @returns {ArrayRGBA}
   * @example
   * lab2rgb(54.29, 80.82, 69.88) // => [100, 0, 0]
   */
  export function lab2rgb(labL: number, labA: number, labB: number): ArrayRGBA;
  /**
   * @function lab2xyz
   * @description Return an XYZ color from a LAB color
   * @param {number} labL - CIE Lightness
   * @param {number} labA - Red/Green Coordinate
   * @param {number} labB - Yellow/Blue Coordinate
   * @returns {ArrayXYZ}
   * @example
   * lab2xyz(54.29, 80.82, 69.88) // => 41.25, 21.27, 1.93
   */
  export function lab2xyz(labL: number, labA: number, labB: number): ArrayXYZ;
  /**
   * @function lch2ciede
   * @description Return the CIEDE2000 difference between 2 LCH colors
   * @param {ArrayLCH} lch1
   * @param {ArrayLCH} lch2
   * @returns {NumberCIEDE}.
   * @example
   * lch2ciede([100, 0.03, -82.2], [0, 0, 0]) // => 100
   */
  export function lch2ciede(lch1: ArrayLCH, lch2: ArrayLCH): NumberCIEDE;
  /**
   * @function lch2contrast
   * @description Return the contrast ratio of 2 LCH colors
   * @param {ArrayLCH} lch1
   * @param {ArrayLCH} lch2
   * @returns {NumberContrast}
   * @example
   * lch2contrast([100, 0.025, -82.2], [0, 0, 0]) // => 21
   */
  export function lch2contrast(lch1: ArrayLCH, lch2: ArrayLCH): NumberContrast;
  /**
   * @function lch2hex
   * @description Return a Hex color from a CIE LCH color
   * @param {number} lchL - CIE Lightness
   * @param {number} lchC - CIE Chroma
   * @param {number} lchH - CIE Hue Angle
   * @returns {StringHex}
   * @example
   * lch2hex(54.29, 106.84, 40.85) // => "#f00"
   */
  export function lch2hex(lchL: number, lchC: number, lchH: number): StringHex;
  /**
   * @function lch2hsl
   * @description Return an HSL from a CIE LCH color
   * @param {number} lchL - CIE Lightness
   * @param {number} lchC - CIE Chroma
   * @param {number} lchH - CIE Hue Angle
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayLCH}
   * @example
   * lch2hsl(54.29, 106.84, 40.85) // => [0, 100, 50]
   */
  export function lch2hsl(
    lchL: number,
    lchC: number,
    lchH: number,
    fallbackhue?: number | undefined
  ): ArrayLCH;
  /**
   * @function lch2hsv
   * @description Return an HSV color from a CIE LCH color
   * @param {number} lchL - CIE Lightness
   * @param {number} lchC - CIE Chroma
   * @param {number} lchH - CIE Hue Angle
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayHSV}
   * @example
   * lch2hsv(54.29, 106.84, 40.85) // => [0, 100, 100]
   */
  export function lch2hsv(
    lchL: number,
    lchC: number,
    lchH: number,
    fallbackhue?: number | undefined
  ): ArrayHSV;
  /**
   * @function lch2hwb
   * @description Return an HWB color from a CIE LCH color
   * @param {number} lchL - CIE Lightness
   * @param {number} lchC - CIE Chroma
   * @param {number} lchH - CIE Hue Angle
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayLCH}
   * @example
   * lch2hwb(54.29, 106.84, 40.85) // => [0, 0, 0]
   */
  export function lch2hwb(
    lchL: number,
    lchC: number,
    lchH: number,
    fallbackhue?: number | undefined
  ): ArrayLCH;
  /**
   * @function lch2lab
   * @description Return a LAB color from an LCH color
   * @param {number} lchL - CIE Lightness
   * @param {number} lchC - CIE Chroma
   * @param {number} lchH - CIE Hue Angle
   * @returns {ArrayLCH}
   * @example
   * lch2lab(54.29, 106.84, 40.85) // => [54.29, 80.82, 69.88]
   */
  export function lch2lab(lchL: number, lchC: number, lchH: number): ArrayLCH;
  /**
   * @function lch2rgb
   * @description Return an RGB color from a CIE LCH color
   * @param {number} lchL - CIE Lightness
   * @param {number} lchC - CIE Chroma
   * @param {number} lchH - CIE Hue
   * @returns {ArrayRGBA}
   * @example
   * lch2rgb(54.29, 106.84, 40.85) // => [100, 0, 0]
   */
  export function lch2rgb(lchL: number, lchC: number, lchH: number): ArrayRGBA;
  /**
   * @function lch2xyz
   * @description Return an XYZ color from a CIE LCH color
   * @param {number} lchL - CIE Lightness
   * @param {number} lchC - CIE Chroma
   * @param {number} lchH - CIE Hue Angle
   * @returns {ArrayXYZ}
   * @example
   * lch2xyz(54.29, 106.84, 40.85) // => [41.25, 21.27, 1.93]
   */
  export function lch2xyz(lchL: number, lchC: number, lchH: number): ArrayXYZ;
  /**
   * @function rgb2ciede
   * @description Return the CIEDE2000 difference between 2 RGB colors
   * @param {ArrayRGB} rgb1
   * @param {ArrayRGB} rgb2
   * @returns {NumberCIEDE}.
   * @example
   * rgb2ciede([100, 100, 100], [0, 0, 0]) // => 100
   */
  export function rgb2ciede(rgb1: ArrayRGB, rgb2: ArrayRGB): NumberCIEDE;
  /**
   * @function rgb2contrast
   * @description Return the contrast ratio of of RGB colors
   * @param {ArrayRGB} rgb1 - RGB Color Array
   * @param {ArrayRGB} rgb2 - RGB Color Array
   * @returns {NumberContrast}
   * @example
   * rgb2contrast([100, 0, 0], [0, 0, 0]) // => 5.252
   */
  export function rgb2contrast(rgb1: ArrayRGB, rgb2: ArrayRGB): NumberContrast;
  /**
   * @function rgb2hex
   * @description Return a HEX color from an RGB color
   * @param {number} rgbR - Red (0 - 100)
   * @param {number} rgbG - Green (0 - 100)
   * @param {number} rgbB - Blue (0 - 100)
   * @returns {StringHex}
   * @example
   * rgb2hex(100, 0, 0) // => "#ff0000"
   */
  export function rgb2hex(rgbR: number, rgbG: number, rgbB: number): StringHex;
  /**
   * @function rgb2hsl
   * @description Return a HSL color from an RGB color
   * @param {number} rgbR - red (0 - 100)
   * @param {number} rgbG - green (0 - 100)
   * @param {number} rgbB - blue (0 - 100)
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayHSL}
   * @example
   * rgb2hsl(0, 100, 100) // => [0, 100, 50]
   */
  export function rgb2hsl(
    rgbR: number,
    rgbG: number,
    rgbB: number,
    fallbackhue?: number | undefined
  ): ArrayHSL;
  /**
   * @function rgb2hsv
   * @description Return an HSV color from an RGB color
   * @param {number} rgbR - red (0 - 100)
   * @param {number} rgbG - green (0 - 100)
   * @param {number} rgbB - blue (0 - 100)
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayHSV}
   * @example
   * rgb2hsv(100, 0, 0) // => [0, 100, 100]
   */
  export function rgb2hsv(
    rgbR: number,
    rgbG: number,
    rgbB: number,
    fallbackhue?: number | undefined
  ): ArrayHSV;
  /**
   * @function rgb2hwb
   * @description Return an HWB color from an RGB color
   * @param {number} rgbR - Red (0 - 100)
   * @param {number} rgbG - Green (0 - 100)
   * @param {number} rgbB - Blue (0 - 100)
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayHWB}
   * @example
   * rgb2hwb(100, 0, 0) // => [0, 0, 0]
   */
  export function rgb2hwb(
    rgbR: number,
    rgbG: number,
    rgbB: number,
    fallbackhue?: number | undefined
  ): ArrayHWB;
  /**
   * @function rgb2lab
   * @description Return a CIE LAB color from an RGB color
   * @param {number} rgbR - Red (0 - 100)
   * @param {number} rgbG - Green (0 - 100)
   * @param {number} rgbB - Blue (0 - 100)
   * @returns {ArrayLAB}
   * @example
   * rgb2lab(100, 0, 0) // => [54.29, 80.82, 69.88]
   */
  export function rgb2lab(rgbR: number, rgbG: number, rgbB: number): ArrayLAB;
  /**
   * @function rgb2lch
   * @description Return a CIE LAB color from an RGB color
   * @param {number} rgbR - Red (0 - 100)
   * @param {number} rgbG - Green (0 - 100)
   * @param {number} rgbB - Blue (0 - 100)
   * @returns {ArrayLCH}
   * @example
   * rgb2lch(100, 0, 0) // => [54.29, 106.84, 40.85]
   */
  export function rgb2lch(rgbR: number, rgbG: number, rgbB: number): ArrayLCH;
  /**
   * @function rgb2xyz
   * @description Return an XYZ color from an RGB color
   * @param {number} rgbR - Red (0 - 100)
   * @param {number} rgbG - Green (0 - 100)
   * @param {number} rgbB - Blue (0 - 100)
   * @returns {ArrayXYZ}
   * @example
   * rgb2xyz(100, 0, 0) // => [41.25, 21.27, 1.93]
   */
  export function rgb2xyz(rgbR: number, rgbG: number, rgbB: number): ArrayXYZ;
  /**
   * @function xyz2ciede
   * @description Return the CIEDE2000 difference between 2 XYZ colors
   * @param {ArrayXYZ} xyz1
   * @param {ArrayXYZ} xyz2
   * @returns {NumberCIEDE}.
   * @example
   * xyz2ciede([95.05, 100, 108.88], [0, 0, 0]) // => 100
   */
  export function xyz2ciede(xyz1: ArrayXYZ, xyz2: ArrayXYZ): NumberCIEDE;
  /**
   * @function xyz2contrast
   * @description Return the contrast ratio of 2 XYZ colors
   * @param {ArrayXYZ} xyz1
   * @param {ArrayXYZ} xyz2
   * @returns {NumberContrast}
   * @example
   * xyz2contrast([95.05, 100, 108.88], [0, 0, 0]) // => 21
   */
  export function xyz2contrast(xyz1: ArrayXYZ, xyz2: ArrayXYZ): NumberContrast;
  /**
   * @function xyz2hex
   * @description Return a Hex color from an XYZ color
   * @param {number} xyzX - Chromaticity of X
   * @param {number} xyzY - Chromaticity of Y
   * @param {number} xyzZ - Chromaticity of Z
   * @returns {StringHex}
   * @example
   * xyz2hex(41.25, 21.27, 1.93) // => "#f00"
   */
  export function xyz2hex(xyzX: number, xyzY: number, xyzZ: number): StringHex;
  /**
   * @function xyz2hsl
   * @description Return an HSL color from an XYZ color
   * @param {number} xyzX - Chromaticity of X
   * @param {number} xyzY - Chromaticity of Y
   * @param {number} xyzZ - Chromaticity of Z
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayHSL}
   * @example
   * xyz2hsl(0, 100, 50) // => [41.25, 21.27, 1.93]
   */
  export function xyz2hsl(
    xyzX: number,
    xyzY: number,
    xyzZ: number,
    fallbackhue?: number | undefined
  ): ArrayHSL;
  /**
   * @function xyz2hsv
   * @description Return an XYZ color from an HSV color
   * @param {number} xyzX - Chromaticity of X
   * @param {number} xyzY - Chromaticity of Y
   * @param {number} xyzZ - Chromaticity of Z
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayHSV}
   * @example
   * xyz2hsv(41.25, 21.27, 1.93) // => [0, 100, 100]
   */
  export function xyz2hsv(
    xyzX: number,
    xyzY: number,
    xyzZ: number,
    fallbackhue?: number | undefined
  ): ArrayHSV;
  /**
   * @function xyz2hwb
   * @description Return an HWB color from an XYZ color
   * @param {number} xyzX - Chromaticity of X
   * @param {number} xyzY - Chromaticity of Y
   * @param {number} xyzZ - Chromaticity of Z
   * @param {number=} fallbackhue - Hue Fallback (0 - 360)
   * @returns {ArrayXYZ}
   * @example
   * xyz2hwb(0, 0, 0) // => [41.25, 21.27, 1.93]
   */
  export function xyz2hwb(
    xyzX: number,
    xyzY: number,
    xyzZ: number,
    fallbackhue?: number | undefined
  ): ArrayXYZ;
  /**
   * @function xyz2lab
   * @description Return an LAB color from a XYZ color
   * @param {number} xyzX - Chromaticity of X
   * @param {number} xyzY - Chromaticity of Y
   * @param {number} xyzZ - Chromaticity of Z
   * @returns {ArrayLAB}
   * @example
   * xyz2lab(41.25, 21.27, 1.93) // => [54.29, 80.82, 69.88]
   */
  export function xyz2lab(xyzX: number, xyzY: number, xyzZ: number): ArrayLAB;
  /**
   * @function xyz2lch
   * @description Return a CIE LCH color from an XYZ color
   * @param {number} xyzX - Chromaticity of X
   * @param {number} xyzY - Chromaticity of Y
   * @param {number} xyzZ - Chromaticity of Z
   * @returns {ArrayLCH}
   * @example
   * xyz2lch(41.25, 21.27, 1.93) // => [54.29, 106.84, 40.85]
   */
  export function xyz2lch(xyzX: number, xyzY: number, xyzZ: number): ArrayLCH;
  /**
   * @function xyz2rgb
   * @description Return an XYZ color from an RGB color
   * @param {number} xyzX - Chromaticity of X
   * @param {number} xyzY - Chromaticity of Y
   * @param {number} xyzZ - Chromaticity of Z
   * @returns {ArrayRGB}
   * @example
   * xyz2rgb(41.25, 21.27, 1.93) // => [100, 0, 0]
   */
  export function xyz2rgb(xyzX: number, xyzY: number, xyzZ: number): ArrayRGB;
}
