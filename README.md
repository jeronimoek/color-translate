# Color Translator

This package allows translating colors among all valid css formats

## 🌐 Links

[Website](https://jeronimoek.github.io/color-translate-web/)

[Visual Studio Code Extension](https://github.com/jeronimoek/color-picker-universal)

[NPM](https://www.npmjs.com/package/color-translate)

[Github Repository](https://github.com/jeronimoek/color-translate)

## Installation

Using npm:

```shell
npm i color-translate
```

## Formats supported

All formats except "Named" accept an alpha value. (See [Formats specification](#formats-specification))

| Format | Example string             | Example obj                              |
| ------ | -------------------------- | ---------------------------------------- |
| HEX    | `'#FF6600'`                | -                                        |
| HEX 0x | `'0xFF6600'`               | -                                        |
| RGB    | `'rgb(255 100 0)'`         | `{ r: 255, g: 100, b: 0 }`               |
| HSL    | `'hsl(18 100% 50%)'`       | `{ h: 18, s: '100%', l: '50%' }`         |
| HWB    | `'hwb(18 6% 0.4%)'`        | `{ h: 18, w: '6%', w: '0.4%' }`          |
| LAB    | `'lab(61.6 61.3 66)'`      | `{ l: 61.6, a: 61.3, b: 66 }`            |
| LCH    | `'lch(60 91.5 44)'`        | `{ l: 60, c: 91.5, h: 44 }`              |
| OKLAB  | `'oklab(0.7 0.13 0.14)'`   | `{ l: 0.7, a: 0.13, b: 0.14, ok: true }` |
| OKLCH  | `'oklch(0.7 0.2 48)'`      | `{ l: 0.7, c: 0.2, h: 48, ok: true }`    |
| CMYK   | `'device-cmyk(0 0.5 1 0)'` | `{ c: 0, m: 0.5, y: 1, k: 0 }`           |
| A98    | `'color(a98-rgb 1 0.4 0)'` | `{ r: 1, g: 0.4, b: 0, a98: true }`      |
| Named  | `'orangered'`              | -                                        |

## Usage

The first step is to create a new ColorTranslator instance

```ts
import ColorTranslator from "color-translate";
const color = new ColorTranslator(<input>);
```

The input value has to be either a valid string or an object (See [Formats supported](#formats-supported))

```ts
const color = new ColorTranslator("rgb(255 100 0)");
const color2 = new ColorTranslator({ r: 255, g: 100, b: 0 });
```

### Example

```ts
import ColorTranslator from "color-translate";

const color = new ColorTranslator("hsl(0 100% 50%)");
color
  .updateRgb({ r: 127.5, b: 255, alpha: 0.4 })
  .updateOptions({ angleUnit: "grad" });

console.log(color.lch.l);
// 39.282796563892475

console.log(color.lch.toString());
// 'lch(39.28 121.27 342.22grad / 0.4)'

console.log(color.lch.toString({ angleUnit: "rad" }));
// 'lch(39.28 121.27 5.38rad / 0.4)'
```

### Methods

Once created the ColorTranslator instance, we can call these methods

| Method                 | Description                                                      | Example                                                                |
| ---------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| .\<format\>            | Returns a color object, containing it's values as properties     | `.rgb` = `{ r: 255, g: 100, b: 0 }`                                    |
| .\<format\>.toString() | Returns a string representation of the color in the given format | `.rgb.toString()` = `rgb(255, 100, 0)`                                 |
| .update\<format\>(...) | Updates specific properties in the given format                  | `.updateRgb({ r: 0 }).rgb` = `{ r: 0, g: 100, b: 0 }`                  |
| .options               | Returns the current options. (See [Options](#options))           | `.options` = `{ spaced: true, ... }`                                   |
| .updateOptions(...)    | Updates the given options. (See [Options](#options))             | `.updateOptions({ spaced: false }).options` = `{ spaced: false, ... }` |

### Options

| Option            | Description                                          | Default value |
| ----------------- | ---------------------------------------------------- | ------------- |
| angleUnit         | Angle unit                                           | `'none'`      |
| cacheInput        | Persist last input                                   | `false`       |
| legacy            | Legacy mode                                          | `true`        |
| limitToColorSpace | Clamp colors to format space                         | `true`        |
| maxDigits         | Round color values to a max number of decimal places | `2`           |
| spaced            | Space between string color values                    | `false`       |

### Formats specification

Here is a table with the standard presentations of each color format property (this follows closely the [W3C standards](https://www.w3.org/TR/css-color-4/))

| Color Format/s       | Property/ies        | Presentations                                                                | Examples                                           |
| -------------------- | ------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------- |
| _ALL FORMATS_        | alpha (default = 1) | Number/String 0-1, String Percentage                                         | 0.5, '0.5', '50%'                                  |
| RGB                  | r, g, b             | Number/String 0-255, String Percentage                                       | 123, '123', '50%'                                  |
| A98                  | r, g, b             | Number/String 0-1                                                            | 0.5, '0.5'                                         |
| HSL, HWB, LCH, OKLCH | h                   | Number/String 0-360, String Percentage, String Grad, String Rad, String Turn | 180, '180', '50%', '200grad', '3.14rad', '0.5turn' |
| HSL                  | s, l                | Number/String 0-1, String Percentage                                         | 0.5, '0.5', '50%'                                  |
| HWB                  | w, b                | Number/String 0-1, String Percentage                                         | 0.5, '0.5', '50%'                                  |
| LAB, LCH             | l                   | Number/String 0-100, String Percentage                                       | 50, '50', '50%'                                    |
| LAB                  | a, b                | Number/String -125 - 125, String Percentage -100% - 100%                     | -62.5, '-62.5', '-50%'                             |
| LCH                  | c                   | Number/String 0-150, String Percentage                                       | 75, '75', '50%'                                    |
| OKLAB, OKLCH         | l                   | Number/String 0-1, String Percentage                                         | 0.5, '0.5', '50%'                                  |
| OKLAB                | a, b                | Number/String -0.4 - 0.4, String Percentage -100% - 100%                     | -0.2, '-0.2', '-50%'                               |
| OKLCH                | c                   | Number/String 0-0.4, String Percentage                                       | 0.2, '0.2', '50%'                                  |
| CMYK                 | c, m, y, k          | Number/String 0-1, String Percentage                                         | 0.5, '0.5', '50%'                                  |
