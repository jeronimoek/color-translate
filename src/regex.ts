import { AngleUnit } from "./enum";

const wrap = (regex: string) => "(?:" + regex + ")";
const optionalWrap = (regex: string) => wrap(regex) + "?";
const orJoin = (...regexes: string[]) => wrap(regexes.map(wrap).join("|"));
const capture = (regex: string) => "(" + regex + ")";

// Color formats items

const start = "^";
const end = "$";
const open = /\(/.source;
const close = /\)/.source;
const sign = "[-+]";
const number = /\d+/.source;
const pointDecimal = /\./.source + number;
const decimal =
  sign + "?" + orJoin(number + optionalWrap(pointDecimal), pointDecimal);
const spacing = " *?";
const commaSeparator = ",";
const spaceSeparator = " +";
const alphaSeparator = "/";
const angleUnit = orJoin(
  ...Object.values(AngleUnit).filter((v) => v !== AngleUnit.NONE)
);
const hexaValue = /[\da-fA-F]/.source;

// Color formats names

const rgbName = capture("rgba?");
const hslName = capture("hsla?");
const hwbName = capture("hwb");
const labName = capture("lab");
const lchName = capture("lch");
const oklabName = capture("oklab");
const oklchName = capture("oklch");

// Color formats special decimals

const percentage = decimal + "%";
const decimalOrPercentage = decimal + "%?";
const angle = decimal + angleUnit + "?";

// Color formats alpha

const optionalAlphaLegacy = optionalWrap(
  spacing + commaSeparator + spacing + capture(decimal)
);
const optionalAlphaCurrent = optionalWrap(
  spacing + alphaSeparator + spacing + capture(decimal)
);

// Color formats template function

const colorWrap = (
  name: string,
  param1: string,
  param2: string,
  param3: string,
  legacy = false
) => {
  const separator = legacy
    ? spacing + commaSeparator + spacing
    : spaceSeparator;
  const alpha = legacy ? optionalAlphaLegacy : optionalAlphaCurrent;
  return (
    start +
    name +
    open +
    spacing +
    capture(param1) +
    separator +
    capture(param2) +
    separator +
    capture(param3) +
    alpha +
    spacing +
    close +
    end
  );
};

// Color formats

const hexSingle = new RegExp(capture(hexaValue).repeat(4) + "?").source;
const hexDouble = new RegExp(capture(hexaValue + hexaValue).repeat(4) + "?")
  .source;
const hex = new RegExp(
  start + capture("#") + orJoin(hexSingle, hexDouble) + end
);

const rgbLegacy = colorWrap(rgbName, decimal, decimal, decimal, true);
const rgbLegacyPercentage = colorWrap(
  rgbName,
  percentage,
  percentage,
  percentage,
  true
);
const rgbCurrent = colorWrap(rgbName, decimal, decimal, decimal);
const rgbCurrentPercentage = colorWrap(
  rgbName,
  percentage,
  percentage,
  percentage
);

const rgb = new RegExp(
  orJoin(rgbCurrent, rgbCurrentPercentage, rgbLegacy, rgbLegacyPercentage)
);

const hslLegacy = colorWrap(hslName, angle, percentage, percentage, true);
const hslCurrent = colorWrap(hslName, angle, percentage, percentage);

const hsl = new RegExp(orJoin(hslCurrent, hslLegacy));

const hwb = new RegExp(colorWrap(hwbName, angle, percentage, percentage));

const lab = new RegExp(
  colorWrap(
    labName,
    decimalOrPercentage,
    decimalOrPercentage,
    decimalOrPercentage
  )
);

const lch = new RegExp(
  colorWrap(lchName, decimalOrPercentage, decimalOrPercentage, angle)
);

const oklab = new RegExp(
  colorWrap(
    oklabName,
    decimalOrPercentage,
    decimalOrPercentage,
    decimalOrPercentage
  )
);

const oklch = new RegExp(
  colorWrap(oklchName, decimalOrPercentage, decimalOrPercentage, angle)
);

const color = new RegExp(
  orJoin(
    ...[hex, rgb, hsl, hwb, lab, lch, oklab, oklch].map((regex) => regex.source)
  )
);

export { hex, rgb, hsl, hwb, lab, lch, oklab, oklch, color };
