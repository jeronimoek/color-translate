// Value to range

export function rgbToRange(value: number) {
  const scale = 100 / 255;
  const scaled = value * scale;
  return scaled;
}

export function labABPercentageToRange(value: number) {
  const scale = 125 / 100;
  const scaled = value * scale;
  return scaled;
}

export function lchChromaPercentageToRange(value: number) {
  const scale = 150 / 100;
  const scaled = value * scale;
  return scaled;
}
