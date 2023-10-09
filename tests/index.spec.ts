import * as matchers from "jest-extended";
import { round } from "../src/helper";
import ColorTranslator from "../src/index";

expect.extend(matchers);

const redRgb = { r: 255, g: 0, b: 0 };
const redHex = { r: "FF", g: "00", b: "00", alpha: "FF" };
const redHsl = { h: 0, s: 1, l: 0.5 };
const redHwb = { h: 0, w: 0, b: 0 };
const redLab = { l: 54.29, a: 80.82, b: 69.88 };
const redLch = { l: 54.29, c: 106.84, h: 40.85 };
const redOklab = { l: 0.63, a: 0.22, b: 0.13, ok: true };
const redOklch = { l: 0.63, c: 0.26, h: 29.23, ok: true };
const redCmyk = { c: 0, m: 1, y: 1, k: 0 };

const redRgbString = `rgb(${redRgb.r} ${redRgb.g} ${redRgb.b})`;
const redRgbStringPercentage = `rgb(${redRgb.r / 2.55}% ${redRgb.g / 2.55}% ${
  redRgb.b / 2.55
}%)`;
const redRgbStringLegacy = `rgb(${redRgb.r}, ${redRgb.g}, ${redRgb.b})`;
const redRgbStringLegacyUnspaced = `rgb(${redRgb.r},${redRgb.g},${redRgb.b})`;
const redHslStringDeg = `hsl(${redHsl.h}deg ${redHsl.s * 100}% ${
  redHsl.l * 100
}%)`;
const redHslStringTurn = `hsl(${redHsl.h / 360}turn ${redHsl.s * 100}% ${
  redHsl.l * 100
}%)`;
const redHslStringRad = `hsl(${(redHsl.h / 360) * (2 * Math.PI)}rad ${
  redHsl.s * 100
}% ${redHsl.l * 100}%)`;
const redHslStringGrad = `hsl(${(redHsl.h / 360) * 400}grad ${
  redHsl.s * 100
}% ${redHsl.l * 100}%)`;

const redHexString = `#${redHex.r}${redHex.g}${redHex.b}`;
const redHex0xString = `0x${redHex.r}${redHex.g}${redHex.b}`;
const redHslString = `hsl(${redHsl.h} ${redHsl.s * 100}% ${redHsl.l * 100}%)`;
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
const redCmykString = `device-cmyk(${redCmyk.c} ${redCmyk.m} ${redCmyk.y} ${redCmyk.k})`;
const redCmykStringPercentage = `device-cmyk(${redCmyk.c * 100}% ${
  redCmyk.m * 100
}% ${redCmyk.y * 100}% ${redCmyk.k * 100}%)`;

const yellowRgb = { r: 255, g: 255, b: 0 };
const yellowRgbString = `rgb(${yellowRgb.r} ${yellowRgb.g} ${yellowRgb.b})`;
const yellowHex = { r: "FF", g: "FF", b: "00" };
const yellowHexString = `#${yellowHex.r}${yellowHex.g}${yellowHex.b}`;
const yellowHex0xString = `0x${yellowHex.r}${yellowHex.g}${yellowHex.b}`;

const maroonHsl = { h: 0, s: 1, l: 0.2 };
const maroonHslString = `hsl(${maroonHsl.h} ${maroonHsl.s * 100}% ${
  maroonHsl.l * 100
}%)`;
const maroonHwb = { h: 0, w: 0, b: 0.6 };
const maroonHwbString = `hwb(${maroonHwb.h} ${maroonHwb.w * 100}% ${
  maroonHwb.b * 100
}%)`;

const fuchsiaLab = { l: 54.29, a: 80.82, b: 0 };
const fuchsiaLabString = `lab(${fuchsiaLab.l} ${fuchsiaLab.a} ${fuchsiaLab.b})`;
const fuchsiaLch = { l: 54.29, c: 106.84, h: 0 };
const fuchsiaLchString = `lch(${fuchsiaLch.l} ${fuchsiaLch.c} ${fuchsiaLch.h})`;
const fuchsiaOklab = { l: 0.63, a: 0.22, b: 0, ok: true };
const fuchsiaOklabString = `oklab(${fuchsiaOklab.l} ${fuchsiaOklab.a} ${fuchsiaOklab.b})`;
const fuchsiaOklch = { l: 0.63, c: 0.26, h: 0, ok: true };
const fuchsiaOklchString = `oklch(${fuchsiaOklch.l} ${fuchsiaOklch.c} ${fuchsiaOklch.h})`;

const magentaCmyk = { c: 0, m: 1, y: 0, k: 0 };
const magentaCmykString = `device-cmyk(${magentaCmyk.c} ${magentaCmyk.m} ${magentaCmyk.y} ${magentaCmyk.k})`;

const alpha = 0.5;

const redRgbStringAlpha = `rgba(${redRgb.r} ${redRgb.g} ${redRgb.b} / ${alpha})`;
const redRgbStringAlphaPercentage = `rgba(${redRgb.r} ${redRgb.g} ${
  redRgb.b
} / ${alpha * 100}%)`;

const hexAlpha = "88";

const redHexStringShortAlpha = `#${redHex.r[0]}${redHex.g[0]}${redHex.b[0]}${hexAlpha[0]}`;
const redHex0xStringShortAlpha = `0x${redHex.r[0]}${redHex.g[0]}${redHex.b[0]}${hexAlpha[0]}`;
const redHexStringAlpha = `#${redHex.r}${redHex.g}${redHex.b}${hexAlpha}`;
const redHex0xStringAlpha = `0x${redHex.r}${redHex.g}${redHex.b}${hexAlpha}`;

const redHslStringAlpha = `hsla(${redHsl.h} ${redHsl.s * 100}% ${
  redHsl.l * 100
}% / ${alpha})`;
const redHslStringAlphaPercentage = `hsla(${redHsl.h} ${redHsl.s * 100}% ${
  redHsl.l * 100
}% / ${alpha * 100}%)`;
const redHslStringLegacyAlpha = `hsla(${redHsl.h}, ${redHsl.s * 100}%, ${
  redHsl.l * 100
}%, ${alpha})`;

const redOklabExceeded = "oklab(0.65 0.26 0.15)";

const blackCmyk = { c: 0, m: 0, y: 0, k: 1 };
const blackCmykString = `device-cmyk(${blackCmyk.c} ${blackCmyk.m} ${blackCmyk.y} ${blackCmyk.k})`;

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

  it("should return the same HEX 0x color", () => {
    const color = new ColorTranslator(redRgb);
    expect(color.hex0x).toBeObject();
    expect(color.hex0x).toMatchObject(redHex);
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

  it("should return the same CMYK color", () => {
    const color = new ColorTranslator(redCmyk);
    expect(color.cmyk).toBeObject();
    expect(round(color.cmyk.c)).toEqual(redCmyk.c);
    expect(round(color.cmyk.m)).toEqual(redCmyk.m);
    expect(round(color.cmyk.y)).toEqual(redCmyk.y);
    expect(round(color.cmyk.k)).toEqual(redCmyk.k);
    expect(round(color.cmyk.alpha)).toEqual(1);
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

  it("should return correct hsl hue units", () => {
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
    expect(color.hex0x.toString()).toEqual(redHex0xString);
    expect(color.hsl.toString()).toEqual(redHslString);
    expect(color.hwb.toString()).toEqual(redHwbString);
    expect(color.lab.toString()).toEqual(redLabString);
    expect(color.lch.toString()).toEqual(redLchString);
    expect(color.oklab.toString()).toEqual(redOklabString);
    expect(color.oklch.toString()).toEqual(redOklchString);
    expect(color.cmyk.toString()).toEqual(redCmykString);
  });
});

describe("Update colors", () => {
  it("should update rgb", () => {
    const color = new ColorTranslator(redRgb);
    color.updateRgb({ g: yellowRgb.g });
    color.updateRgb({});
    expect(color.rgb.toString()).toEqual(yellowRgbString);
    expect(color.hex.toString()).toEqual(yellowHexString);
    expect(color.hex0x.toString()).toEqual(yellowHex0xString);
  });

  it("should update hsl", () => {
    const color = new ColorTranslator(redHsl);
    color.updateHsl({ l: maroonHsl.l });
    color.updateHsl({});
    expect(color.hsl.toString()).toEqual(maroonHslString);
  });

  it("should update hwb", () => {
    const color = new ColorTranslator(redHwb);
    color.updateHwb({ b: maroonHwb.b });
    color.updateHwb({});
    expect(color.hwb.toString()).toEqual(maroonHwbString);
  });

  it("should update lab", () => {
    const color = new ColorTranslator(redLab);
    color.updateLab({ b: fuchsiaLab.b });
    color.updateLab({});
    expect(color.lab.toString()).toEqual(fuchsiaLabString);
  });

  it("should update lch", () => {
    const color = new ColorTranslator(redLch);
    color.updateLch({ h: fuchsiaLch.h });
    color.updateLch({});
    expect(color.lch.toString()).toEqual(fuchsiaLchString);
  });

  it("should update oklab", () => {
    const color = new ColorTranslator(redOklab);
    color.updateOklab({ b: fuchsiaOklab.b });
    color.updateOklab({});
    expect(color.oklab.toString()).toEqual(fuchsiaOklabString);
  });

  it("should update oklch", () => {
    const color = new ColorTranslator(redOklch);
    color.updateOklch({ h: fuchsiaOklch.h });
    color.updateOklch({});
    expect(color.oklch.toString()).toEqual(fuchsiaOklchString);
  });

  it("should update cmyk", () => {
    const color = new ColorTranslator(redCmyk);
    color.updateCmyk({ y: magentaCmyk.y });
    color.updateCmyk({});
    expect(color.cmyk.toString()).toEqual(magentaCmykString);
  });
});

describe("Input string", () => {
  it("should throw error", () => {
    expect(() => {
      new ColorTranslator("abcdefg");
    }).toThrow();
  });

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

  it("should return the same hex 0x string color", () => {
    const color = new ColorTranslator(redHex0xString);
    expect(color.hex0x.toString()).toEqual(redHex0xString);
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

  it("should return the same cmyk string color", () => {
    const color = new ColorTranslator(redCmykString);
    expect(color.cmyk.toString()).toEqual(redCmykString);
  });

  it("should return the same cmyk string color (percentage)", () => {
    const color = new ColorTranslator(redCmykStringPercentage);
    expect(color.cmyk.toString()).toEqual(redCmykString);
  });
});

describe("Alpha input", () => {
  it("should match alpha value rgb property", () => {
    const color = new ColorTranslator(redRgbStringAlpha);
    expect(color.rgb.alpha).toEqual(alpha);
  });

  it("should match alpha value rgb", () => {
    const color = new ColorTranslator(redRgbStringAlpha);
    expect(color.rgb.toString()).toEqual(redRgbStringAlpha);
  });

  it("should match alpha value rgb percentage", () => {
    const color = new ColorTranslator(redRgbStringAlphaPercentage);
    expect(color.rgb.toString()).toEqual(redRgbStringAlpha);
  });

  it("should match alpha value hex property", () => {
    const color = new ColorTranslator(redHexStringAlpha);
    expect(color.hex.alpha).toEqual(hexAlpha);
  });

  it("should match alpha value hex", () => {
    const color = new ColorTranslator(redHexStringAlpha);
    expect(color.hex.toString()).toEqual(redHexStringAlpha);
  });

  it("should match alpha value hex short", () => {
    const color = new ColorTranslator(redHexStringShortAlpha);
    expect(color.hex.toString()).toEqual(redHexStringAlpha);
  });

  it("should match alpha value hex 0x property", () => {
    const color = new ColorTranslator(redHex0xStringAlpha);
    expect(color.hex0x.alpha).toEqual(hexAlpha);
  });

  it("should match alpha value hex 0x", () => {
    const color = new ColorTranslator(redHex0xStringAlpha);
    expect(color.hex0x.toString()).toEqual(redHex0xStringAlpha);
  });

  it("should match alpha value hex 0x short", () => {
    const color = new ColorTranslator(redHex0xStringShortAlpha);
    expect(color.hex0x.toString()).toEqual(redHex0xStringAlpha);
  });

  it("should match alpha value hsl property", () => {
    const color = new ColorTranslator(redHslStringAlpha);
    expect(color.hsl.alpha).toEqual(alpha);
  });

  it("should match alpha value hsl", () => {
    const color = new ColorTranslator(redHslStringAlpha);
    expect(color.hsl.toString()).toEqual(redHslStringAlpha);
  });

  it("should match alpha value hsl percentage", () => {
    const color = new ColorTranslator(redHslStringAlphaPercentage);
    expect(color.hsl.toString()).toEqual(redHslStringAlpha);
  });

  it("should match alpha value hsl legacy", () => {
    const color = new ColorTranslator(redHslStringLegacyAlpha);
    expect(color.hsl.toString()).toEqual(redHslStringAlpha);
  });
});

describe("Clamp output", () => {
  const color = new ColorTranslator(redOklabExceeded);

  it("should not clamp rgb output", () => {
    expect(color.rgb.toString({ limitToColorSpace: false })).toEqual(
      "rgb(279.45 -135.76 -83.7)"
    );
  });

  it("should clamp rgb output", () => {
    expect(color.rgb.toString()).toEqual("rgb(255 0 0)");
  });

  it("should not clamp hsl output", () => {
    expect(color.hsl.toString({ limitToColorSpace: false })).toEqual(
      "hsl(352.48 288.95% 28.18%)"
    );
  });

  it("should clamp hsl output", () => {
    expect(color.hsl.toString()).toEqual("hsl(352.48 100% 28.18%)");
  });

  it("should not clamp hwb output", () => {
    expect(color.hwb.toString({ limitToColorSpace: false })).toEqual(
      "hwb(352.48 -53.24% -9.59%)"
    );
  });

  it("should clamp hwb output", () => {
    expect(color.hwb.toString()).toEqual("hwb(352.48 0% 0%)");
  });

  it("should not clamp lab output", () => {
    expect(color.lab.toString({ limitToColorSpace: false })).toEqual(
      "lab(56.39 94.37 106.63)"
    );
  });

  it("should clamp lab output (no effect)", () => {
    expect(color.lab.toString()).toEqual("lab(56.39 94.37 106.63)");
  });

  it("should not clamp lch output", () => {
    expect(color.lch.toString({ limitToColorSpace: false })).toEqual(
      "lch(56.39 142.39 48.49)"
    );
  });

  it("should clamp lch output (no effect)", () => {
    expect(color.lch.toString()).toEqual("lch(56.39 142.39 48.49)");
  });

  it("should not clamp hex output", () => {
    expect(color.hex.toString({ limitToColorSpace: false })).toEqual(
      "#117-88-54"
    );
  });

  it("should clamp hex output", () => {
    expect(color.hex.toString()).toEqual("#FF0000");
  });

  it("should not clamp hex 0x output", () => {
    expect(color.hex0x.toString({ limitToColorSpace: false })).toEqual(
      "0x117-88-54"
    );
  });

  it("should clamp hex 0x output", () => {
    expect(color.hex0x.toString()).toEqual("0xFF0000");
  });

  it("should not clamp oklab output", () => {
    expect(color.oklab.toString({ limitToColorSpace: false })).toEqual(
      "oklab(0.65 0.26 0.15)"
    );
  });

  it("should clamp oklab output (no effect)", () => {
    expect(color.oklab.toString()).toEqual("oklab(0.65 0.26 0.15)");
  });

  it("should not clamp oklch output", () => {
    expect(color.oklch.toString({ limitToColorSpace: false })).toEqual(
      "oklch(0.65 0.3 29.98)"
    );
  });

  it("should clamp oklch output (no effect)", () => {
    expect(color.oklch.toString()).toEqual("oklch(0.65 0.3 29.98)");
  });

  it("should not clamp cmyk output", () => {
    expect(color.cmyk.toString({ limitToColorSpace: false })).toEqual(
      "device-cmyk(0 1.49 1.3 -0.1)"
    );
  });

  it("should clamp cmyk output", () => {
    expect(color.cmyk.toString()).toEqual("device-cmyk(0 1 1 0)");
  });
});

describe("Cmyk black support", () => {
  it("should not clamp rgb output", () => {
    const color = new ColorTranslator(blackCmyk);
    expect(color.cmyk.toString()).toEqual(blackCmykString);
  });
});
