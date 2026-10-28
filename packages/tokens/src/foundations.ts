import tokens from './tokens.json' with { type: 'json' };
/** sRGB preview for Figma/HEX. Canonical CSS retains the reference's wider-gamut OKLCH. */
export function colorToSrgb(value: string): { r: number; g: number; b: number; a: number } {
  if (value.startsWith('#')) {
    let hex = value.slice(1);
    if (hex.length === 3) hex = [...hex].map((x) => x + x).join('');
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1,
    };
  }
  const match = value.match(/^oklch\(([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+|none)\)$/);
  if (!match) throw Error('Unsupported reference color: ' + value);
  const lightness = Number(match[1]) / (match[2] ? 100 : 1);
  const chroma = Number(match[3]),
    angle = (Number(match[4] === 'none' ? 0 : match[4]) * Math.PI) / 180;
  const a = chroma * Math.cos(angle),
    b = chroma * Math.sin(angle);
  // CSS Color 4 OKLab → linear sRGB, then sRGB transfer and gamut clipping.
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const encode = (c: number) =>
    Math.min(1, Math.max(0, c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055));
  return {
    r: encode(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: encode(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: encode(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
    a: 1,
  };
}
export function colorToHex(value: string) {
  const { r, g, b, a } = colorToSrgb(value);
  return (
    '#' +
    [r, g, b, ...(a < 1 ? [a] : [])]
      .map((c) =>
        Math.round(c * 255)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}
export const colorSteps = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const;
export const paletteRamps = Object.entries(tokens.primitives.palette)
  .filter(
    (entry): entry is [string, Record<(typeof colorSteps)[number], string>] =>
      typeof entry[1] === 'object',
  )
  .map(([name, shades]) => ({
    name,
    shades: colorSteps.map((step) => ({
      step,
      value: shades[step],
      hex: colorToHex(shades[step]),
      variable: `--af-palette-${name}-${step}`,
      utility: `bg-af-${name}-${step}`,
    })),
  }));
export const typography = tokens.primitives.typography;
export const fontFamilies = {
  sans: {
    label: 'DM Sans',
    css: 'var(--af-font-sans), sans-serif',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    italic: true,
  },
  display: {
    label: 'Anybody',
    css: 'var(--af-font-display), sans-serif',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    italic: true,
  },
  mono: {
    label: 'Space Mono',
    css: 'var(--af-font-mono), monospace',
    weights: [400, 700],
    italic: true,
  },
  serif: {
    label: 'System serif · Georgia',
    css: 'var(--af-font-serif), "Times New Roman", serif',
    weights: [400, 700],
    italic: true,
  },
} as const;
