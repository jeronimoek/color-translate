import ColorTranslator from "../dist/cjs/index";

const redRgb = { r: 255, g: 0, b: 0 };
const blackHsl = { h: 0, s: 0, l: 0 };

describe("NPM Package", () => {
  it("should be defined", () => {
    expect(ColorTranslator).toBeDefined();
  });

  it("should be initialized", () => {
    const color = new ColorTranslator(redRgb);
    expect(color).toBeObject();
  });

  it("should return the same color", () => {
    const color = new ColorTranslator(redRgb);
    expect(color.rgb).toBeObject();
    expect(color.rgb.r).toEqual(redRgb.r);
    expect(color.rgb.g).toEqual(redRgb.g);
    expect(color.rgb.b).toEqual(redRgb.b);
    expect(color.rgb.a).toEqual(undefined);
  });

  it("should return the same color", () => {
    const color = new ColorTranslator(blackHsl);
    expect(color.hsl).toBeObject();
    expect(color.hsl.h).toEqual(blackHsl.h);
    expect(color.hsl.s).toEqual(blackHsl.s);
    expect(color.hsl.l).toEqual(blackHsl.l);
    expect(color.hsl.a).toEqual(undefined);
  });
});
