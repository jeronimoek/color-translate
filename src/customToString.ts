import { round } from "./helper";
import { Color, CustomOutput, StringOptions } from "./types";
import { remap } from "./utils";

export function customToString<T extends Color>(
  values: T,
  outputOptions: CustomOutput<T>,
  stringOptions: StringOptions
) {
  const {
    template,
    templateWithAlpha,
    values: valueProperties,
  } = outputOptions;

  const templateString =
    values.alpha !== 1 && values.alpha !== "FF" ? templateWithAlpha : template;

  const formattedValues = Object.entries(values).reduce(
    (acc, [key, valueRaw]) => {
      const valueKey = key as keyof T;
      let value = valueRaw as number | string;
      const properties = valueProperties[valueKey];
      if (properties) {
        if (typeof value === "number") {
          // is not HEX nor HEX_0X
          if (properties.from !== undefined && properties.to !== undefined) {
            value = remap(value, 0, 1, properties.from, properties.to);
          }

          const maxDigits = properties.maxDigits || stringOptions.maxDigits;
          value = round(value, maxDigits);
        }
        const formattedValue = properties.suffix
          ? `${value}${properties.suffix}`
          : value;

        acc[valueKey] = formattedValue;
      }
      return acc;
    },
    {} as Record<keyof T, string | number>
  );

  return Object.entries(formattedValues).reduce(
    (result, [key, value]) =>
      result.replace(new RegExp(`{{${key}}}`, "gi"), String(value)),
    templateString
  );
}
