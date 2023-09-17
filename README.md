# Color Translator

This package allows translating colors between all valid css formats

## Installation

Using npm:

```shell
npm i color-translator
```

## Usage

```js
import ColorTranslator from "color-translator";

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

| Option | Description | Default value      |
| ------ | ----------- | ------------------ |
| this   | row info    | `'package.json'`   |
| is an  | row info    | `'README.md'`      |
| option | row info    | inputPath value \* |

## 🌐 Links

[NPM](https://www.npmjs.com/package/color-translator)

[Github Repository](https://github.com/jeronimoek/color-translator)
