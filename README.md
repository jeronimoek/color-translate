# Color Translator

This package allows translating colors among all valid css formats

## Installation

Using npm:

```shell
npm i color-translate
```

## Usage

```js
import ColorTranslator from "color-translate";

const color = new ColorTranslator("hsl(0 100% 50%)");
color.updateRgb({ r: 127.5, b: 255 });
color.updateRgb({ alpha: 0.4 });
color.updateOptions({ angleUnit: "grad" });

console.log(color.lch.l);
// 39.282796563892475

console.log(color.lch.toString());
// "lch(39.28 121.27 -57.78grad / 0.4)"

console.log(color.lch.toString({ legacy: true }));
// "lch(39.28, 121.27, -57.78grad, 0.4)"
```

### Options:

| Option            | Description                                          | Default value |
| ----------------- | ---------------------------------------------------- | ------------- |
| angleUnit         | Angle unit                                           | `'none'`      |
| cacheInput        | Persist last input                                   | `false`       |
| legacy            | Legacy mode                                          | `true`        |
| limitToColorSpace | Clamp colors to format space                         | `true`        |
| maxDigits         | Round color values to a max number of decimal places | `2`           |
| spaced            | Space between string color values                    | `false`       |

## 🌐 Links

[NPM](https://www.npmjs.com/package/color-translate)

[Github Repository](https://github.com/jeronimoek/color-translate)
