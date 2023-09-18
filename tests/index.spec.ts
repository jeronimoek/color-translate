import * as matchers from "jest-extended";
import { round } from "../dist/cjs/helper";
import ColorTranslator from "../dist/cjs/index";

expect.extend(matchers);

const redRgb = { r: 255, g: 0, b: 0 };
const redHex = { r: "FF", g: "00", b: "00", alpha: "FF" };
const redHsl = { h: 0, s: 100, l: 50 };
const redHwb = { h: 0, w: 0, b: 0 };
const redLab = { l: 54.29, a: 80.82, b: 69.88 };
const redLch = { l: 54.29, c: 106.84, h: 40.85 };
const redOklab = { l: 0.63, a: 0.22, b: 0.13, ok: true };
const redOklch = { l: 0.63, c: 0.26, h: 29.23, ok: true };

const redRgbString = `rgb(${redRgb.r} ${redRgb.g} ${redRgb.b})`;
const redRgbStringPercentage = `rgb(${redRgb.r / 2.55}% ${redRgb.g / 2.55}% ${
  redRgb.b / 2.55
}%)`;
const redRgbStringLegacy = `rgb(${redRgb.r}, ${redRgb.g}, ${redRgb.b})`;
const redRgbStringLegacyUnspaced = `rgb(${redRgb.r},${redRgb.g},${redRgb.b})`;
const redHslStringDeg = `hsl(${redHsl.h}deg ${redHsl.s}% ${redHsl.l}%)`;
const redHslStringTurn = `hsl(${redHsl.h / 360}turn ${redHsl.s}% ${redHsl.l}%)`;
const redHslStringRad = `hsl(${(redHsl.h / 360) * (2 * Math.PI)}rad ${
  redHsl.s
}% ${redHsl.l}%)`;
const redHslStringGrad = `hsl(${(redHsl.h / 360) * 400}grad ${redHsl.s}% ${
  redHsl.l
}%)`;

const redHexString = `#${redHex.r}${redHex.g}${redHex.b}`;
const redHslString = `hsl(${redHsl.h} ${redHsl.s}% ${redHsl.l}%)`;
const redHwbString = `hwb(${redHwb.h} ${redHwb.w}% ${redHwb.b}%)`;
const redLabString = `lab(${redLab.l} ${redLab.a} ${redLab.b})`;
const redLabStringPercentage = `lab(${redLab.l}% ${redLab.a / 1.25}% ${
  redLab.b / 1.25
}%)`;
const redLchString = `lch(${redLch.l} ${redLch.c} ${redLch.h})`;
const redLchStringPercentage = `lch(${redLch.l}% ${redLch.c / 1.5}% ${
  redLch.h
})`;
const redOklabString = `oklab(${redOklab.l} ${redOklab.a} ${redOklab.b})`;
const redOklabStringPercentage = `oklab(${redOklab.l * 100}% ${
  redOklab.a * 250
}% ${redOklab.b * 250}%)`;
const redOklchString = `oklch(${redOklch.l} ${redOklch.c} ${redOklch.h})`;
const redOklchStringPercentage = `oklch(${redOklch.l * 100}% ${
  redOklch.c * 250
}% ${redOklch.h})`;

const yellowRgb = { r: 255, g: 255, b: 0 };
const yellowRgbString = `rgb(${yellowRgb.r} ${yellowRgb.g} ${yellowRgb.b})`;
const yellowHex = { r: "FF", g: "FF", b: "00" };
const yellowHexString = `#${yellowHex.r}${yellowHex.g}${yellowHex.b}`;

const maroonHsl = { h: 0, s: 100, l: 20 };
const maroonHslString = `hsl(${maroonHsl.h} ${maroonHsl.s}% ${maroonHsl.l}%)`;
const maroonHwb = { h: 0, w: 0, b: 60 };
const maroonHwbString = `hwb(${maroonHwb.h} ${maroonHwb.w}% ${maroonHwb.b}%)`;

const fuchsiaLab = { l: 54.29, a: 80.82, b: 0 };
const fuchsiaLabString = `lab(${fuchsiaLab.l} ${fuchsiaLab.a} ${fuchsiaLab.b})`;
const fuchsiaLch = { l: 54.29, c: 106.84, h: 0 };
const fuchsiaLchString = `lch(${fuchsiaLch.l} ${fuchsiaLch.c} ${fuchsiaLch.h})`;
const fuchsiaOklab = { l: 0.63, a: 0.22, b: 0, ok: true };
const fuchsiaOklabString = `oklab(${fuchsiaOklab.l} ${fuchsiaOklab.a} ${fuchsiaOklab.b})`;
const fuchsiaOklch = { l: 0.63, c: 0.26, h: 0, ok: true };
const fuchsiaOklchString = `oklch(${fuchsiaOklch.l} ${fuchsiaOklch.c} 0.22)`; // Different value, same rgb color

describe("Class ColorTranslator", () => {
  it("should be defined", () => {
    expect(ColorTranslator).toBeDefined();
  });

  it("should be initialized", () => {
    const color = new ColorTranslator(redRgb);
    expect(color).toBeObject();
  });

  it("should have options property", () => {
    const color = new ColorTranslator(redRgb);
    expect(color.options).toBeObject();
  });
});

describe("Output object", () => {
  it("should return the same RGB color", () => {
    const color = new ColorTranslator(redRgb);
    expect(color.rgb).toBeObject();
    expect(round(color.rgb.r)).toEqual(redRgb.r);
    expect(round(color.rgb.g)).toEqual(redRgb.g);
    expect(round(color.rgb.b)).toEqual(redRgb.b);
    expect(round(color.rgb.alpha)).toEqual(1);
  });

  it("should return the same HEX color", () => {
    const color = new ColorTranslator(redRgb);
    expect(color.hex).toBeObject();
    expect(color.hex).toMatchObject(redHex);
  });

  it("should return the same HSL color", () => {
    const color = new ColorTranslator(redHsl);
    expect(color.hsl).toBeObject();
    expect(round(color.hsl.h)).toEqual(redHsl.h);
    expect(round(color.hsl.s)).toEqual(redHsl.s);
    expect(round(color.hsl.l)).toEqual(redHsl.l);
    expect(round(color.hsl.alpha)).toEqual(1);
  });

  it("should return the same HWB color", () => {
    const color = new ColorTranslator(redHwb);
    expect(color.hwb).toBeObject();
    expect(round(color.hwb.h)).toEqual(redHwb.h);
    expect(round(color.hwb.w)).toEqual(redHwb.w);
    expect(round(color.hwb.b)).toEqual(redHwb.b);
    expect(round(color.hwb.alpha)).toEqual(1);
  });

  it("should return the same LAB color", () => {
    const color = new ColorTranslator(redLab);
    expect(color.lab).toBeObject();
    expect(round(color.lab.l)).toEqual(redLab.l);
    expect(round(color.lab.a)).toEqual(redLab.a);
    expect(round(color.lab.b)).toEqual(redLab.b);
    expect(round(color.lab.alpha)).toEqual(1);
  });

  it("should return the same LCH color", () => {
    const color = new ColorTranslator(redLch);
    expect(color.lch).toBeObject();
    expect(round(color.lch.l)).toEqual(redLch.l);
    expect(round(color.lch.c)).toEqual(redLch.c);
    expect(round(color.lch.h)).toEqual(redLch.h);
    expect(round(color.lch.alpha)).toEqual(1);
  });

  it("should return the same OKLAB color", () => {
    const color = new ColorTranslator(redOklab);
    expect(color.oklab).toBeObject();
    expect(round(color.oklab.l)).toEqual(redOklab.l);
    expect(round(color.oklab.a)).toEqual(redOklab.a);
    expect(round(color.oklab.b)).toEqual(redOklab.b);
    expect(color.oklab.ok).toEqual(redOklab.ok);
    expect(round(color.oklab.alpha)).toEqual(1);
  });

  it("should return the same OKLCH color", () => {
    const color = new ColorTranslator(redOklch);
    expect(color.oklch).toBeObject();
    expect(round(color.oklch.l)).toEqual(redOklch.l);
    expect(round(color.oklch.c)).toEqual(redOklch.c);
    expect(round(color.oklch.h)).toEqual(redOklch.h);
    expect(color.oklch.ok).toEqual(redOklch.ok);
    expect(round(color.oklch.alpha)).toEqual(1);
  });
});

describe("Output string", () => {
  it("should return normal rgb string color", () => {
    const color = new ColorTranslator(redRgb);
    expect(color.rgb.toString()).toEqual(redRgbString);
  });

  it("should return legacy rgb string color", () => {
    const color = new ColorTranslator(redRgb);
    color.updateOptions({ legacy: true });
    expect(color.rgb.toString()).toEqual(redRgbStringLegacy);
  });

  it("should return unspaced rgb string color", () => {
    const color = new ColorTranslator(redRgb);
    color.updateOptions({ spaced: false });
    expect(color.rgb.toString()).toEqual(redRgbString);
  });

  it("should return legacy unspaced rgb string color", () => {
    const color = new ColorTranslator(redRgb);
    color.updateOptions({ legacy: true, spaced: false });
    expect(color.rgb.toString()).toEqual(redRgbStringLegacyUnspaced);
  });

  it("should return legacy unspaced rgb string color", () => {
    const color = new ColorTranslator(redRgb);
    expect(color.hsl.toString({ angleUnit: "turn" })).toEqual(redHslStringTurn);
    expect(color.hsl.toString({ angleUnit: "none" })).toEqual(redHslString);
    expect(color.hsl.toString({ angleUnit: "deg" })).toEqual(redHslStringDeg);
    expect(color.hsl.toString({ angleUnit: "rad" })).toEqual(redHslStringRad);
    expect(color.hsl.toString({ angleUnit: "grad" })).toEqual(redHslStringGrad);
  });

  it("should apply options", () => {
    const color = new ColorTranslator(redRgb, { legacy: true, spaced: false });
    expect(color.rgb.toString()).toEqual(redRgbStringLegacyUnspaced);
  });

  it("should apply .updateOptions() options", () => {
    const color = new ColorTranslator(redRgb);
    color.updateOptions({ legacy: true, spaced: false });
    expect(color.rgb.toString()).toEqual(redRgbStringLegacyUnspaced);
  });

  it("should apply .toString() options", () => {
    const color = new ColorTranslator(redRgb);
    expect(color.rgb.toString({ legacy: true, spaced: false })).toEqual(
      redRgbStringLegacyUnspaced
    );
  });

  it("should override options", () => {
    const color = new ColorTranslator(redRgb, { legacy: true });
    expect(color.rgb.toString()).toEqual(redRgbStringLegacy);

    color.updateOptions({ spaced: false });
    expect(color.rgb.toString()).toEqual(redRgbStringLegacyUnspaced);

    expect(color.rgb.toString({ spaced: true })).toEqual(redRgbStringLegacy);
  });

  it("should not persist .toString() options", () => {
    const color = new ColorTranslator(redRgb);
    expect(color.rgb.toString({ legacy: true, spaced: false })).toEqual(
      redRgbStringLegacyUnspaced
    );
    expect(color.rgb.toString()).toEqual(redRgbString);
  });
});

describe("Translate colors", () => {
  it("should translate from rgb to all formats", () => {
    const color = new ColorTranslator(redRgb);
    expect(color.rgb.toString()).toEqual(redRgbString);
    expect(color.hex.toString()).toEqual(redHexString);
    expect(color.hsl.toString()).toEqual(redHslString);
    expect(color.hwb.toString()).toEqual(redHwbString);
    expect(color.lab.toString()).toEqual(redLabString);
    expect(color.lch.toString()).toEqual(redLchString);
    expect(color.oklab.toString()).toEqual(redOklabString);
    expect(color.oklch.toString()).toEqual(redOklchString);
  });
});

describe("Update colors", () => {
  it("should update rgb", () => {
    const color = new ColorTranslator(redRgb);
    color.updateRgb({ g: yellowRgb.g });
    expect(color.rgb.toString()).toEqual(yellowRgbString);
    expect(color.hex.toString()).toEqual(yellowHexString);
  });

  it("should update hsl", () => {
    const color = new ColorTranslator(redHsl);
    color.updateHsl({ l: maroonHsl.l });
    expect(color.hsl.toString()).toEqual(maroonHslString);
  });

  it("should update hwb", () => {
    const color = new ColorTranslator(redHwb);
    color.updateHwb({ b: maroonHwb.b });
    expect(color.hwb.toString()).toEqual(maroonHwbString);
  });

  it("should update lab", () => {
    const color = new ColorTranslator(redLab);
    color.updateLab({ b: fuchsiaLab.b });
    expect(color.lab.toString()).toEqual(fuchsiaLabString);
  });

  it("should update lch", () => {
    const color = new ColorTranslator(redLch);
    color.updateLch({ h: fuchsiaLch.h });
    expect(color.lch.toString()).toEqual(fuchsiaLchString);
  });

  it("should update oklab", () => {
    const color = new ColorTranslator(redOklab);
    color.updateOklab({ b: fuchsiaOklab.b });
    expect(color.oklab.toString()).toEqual(fuchsiaOklabString);
  });

  it("should update oklch", () => {
    const color = new ColorTranslator(redOklch);
    color.updateOklch({ h: fuchsiaOklch.h });
    expect(color.oklch.toString()).toEqual(fuchsiaOklchString);
  });
});

describe("Input string", () => {
  it("should return the same rgb string color", () => {
    const color = new ColorTranslator(redRgbString);
    expect(color.rgb.toString()).toEqual(redRgbString);
  });

  it("should return the same rgb string color (percentage)", () => {
    const color = new ColorTranslator(redRgbStringPercentage);
    expect(color.rgb.toString()).toEqual(redRgbString);
  });

  it("should return the same hex string color", () => {
    const color = new ColorTranslator(redHexString);
    expect(color.hex.toString()).toEqual(redHexString);
  });

  it("should return the same hsl string color", () => {
    const color = new ColorTranslator(redHslString);
    expect(color.hsl.toString()).toEqual(redHslString);
  });

  it("should return the same hsl string color (grad)", () => {
    const color = new ColorTranslator(redHslStringGrad);
    expect(color.hsl.toString()).toEqual(redHslString);
  });

  it("should return the same hsl string color (deg)", () => {
    const color = new ColorTranslator(redHslStringDeg);
    expect(color.hsl.toString()).toEqual(redHslString);
  });

  it("should return the same hsl string color (rad)", () => {
    const color = new ColorTranslator(redHslStringRad);
    expect(color.hsl.toString()).toEqual(redHslString);
  });

  it("should return the same hsl string color (turn)", () => {
    const color = new ColorTranslator(redHslStringTurn);
    expect(color.hsl.toString()).toEqual(redHslString);
  });

  it("should return the same hwb string color", () => {
    const color = new ColorTranslator(redHwbString);
    expect(color.hwb.toString()).toEqual(redHwbString);
  });

  it("should return the same lab string color", () => {
    const color = new ColorTranslator(redLabString);
    expect(color.lab.toString()).toEqual(redLabString);
  });

  it("should return the same lab string color (percentage)", () => {
    const color = new ColorTranslator(redLabStringPercentage);
    expect(color.lab.toString()).toEqual(redLabString);
  });

  it("should return the same lch string color", () => {
    const color = new ColorTranslator(redLchString);
    expect(color.lch.toString()).toEqual(redLchString);
  });

  it("should return the same lch string color (percentage)", () => {
    const color = new ColorTranslator(redLchStringPercentage);
    expect(color.lch.toString()).toEqual(redLchString);
  });

  it("should return the same oklab string color", () => {
    const color = new ColorTranslator(redOklabString);
    expect(color.oklab.toString()).toEqual(redOklabString);
  });

  it("should return the same oklab string color (percentage)", () => {
    const color = new ColorTranslator(redOklabStringPercentage);
    expect(color.oklab.toString()).toEqual(redOklabString);
  });

  it("should return the same oklch string color", () => {
    const color = new ColorTranslator(redOklchString);
    expect(color.oklch.toString()).toEqual(redOklchString);
  });

  it("should return the same oklch string color (percentage)", () => {
    const color = new ColorTranslator(redOklchStringPercentage);
    expect(color.oklch.toString()).toEqual(redOklchString);
  });
});
