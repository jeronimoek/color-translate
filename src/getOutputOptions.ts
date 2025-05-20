import { defaultOutputOptions } from "./constants";
import { mergeDeep } from "./helper";
import { CustomOutputs, RecursivePartial, StringOptions } from "./types";

export function getOutputOptions(
  stringOptions: RecursivePartial<StringOptions> = {},
  type: keyof CustomOutputs
) {
  return mergeDeep(defaultOutputOptions[type])(
    stringOptions.customOutputs?.[type] || {}
  );
}
