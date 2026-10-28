'use client';
import { useState, type CSSProperties } from 'react';
import { Field, Input, NativeSelect, Checkbox } from '@antiflex/ui';
import { typography, fontFamilies } from '@antiflex/tokens/foundations';
import { Code } from './code';
type Family = keyof typeof fontFamilies;
type Size = keyof typeof typography.size;
type Leading = 'default' | keyof typeof typography.leading;
type Tracking = keyof typeof typography.tracking;
const weights = Object.entries(typography.weight);
export function TypographyFoundation() {
  const [sample, setSample] = useState('Build with clarity. 0123456789');
  const [family, setFamily] = useState<Family>('sans');
  const [size, setSize] = useState<Size>('base');
  const [weight, setWeight] = useState(400);
  const [leading, setLeading] = useState<Leading>('default');
  const [tracking, setTracking] = useState<Tracking>('normal');
  const [italic, setItalic] = useState(false);
  const [numeric, setNumeric] = useState('normal');
  const face = fontFamilies[family];
  const style: CSSProperties = {
    fontFamily: face.css,
    fontSize: `var(--af-typography-size-${size})`,
    fontWeight: weight,
    lineHeight:
      leading === 'default'
        ? `var(--af-typography-line-height-${size})`
        : `var(--af-typography-leading-${leading})`,
    letterSpacing: `var(--af-typography-tracking-${tracking})`,
    fontStyle: italic ? 'italic' : 'normal',
    fontVariantNumeric: numeric as CSSProperties['fontVariantNumeric'],
  };
  return (
    <>
      <Field label="Sample text">
        <Input value={sample} maxLength={160} onChange={(e) => setSample(e.target.value)} />
      </Field>
      <div className="foundation-type-controls">
        <Field label="Font family">
          <NativeSelect
            value={family}
            onChange={(e) => {
              const next = e.target.value as Family;
              setFamily(next);
              if (!(fontFamilies[next].weights as readonly number[]).includes(weight))
                setWeight(400);
              if (!fontFamilies[next].italic) setItalic(false);
            }}
          >
            {Object.entries(fontFamilies).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Font size">
          <NativeSelect value={size} onChange={(e) => setSize(e.target.value as Size)}>
            {Object.entries(typography.size).map(([key, value]) => (
              <option key={key} value={key}>
                {key} · {value}px
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Font weight">
          <NativeSelect value={weight} onChange={(e) => setWeight(Number(e.target.value))}>
            {weights.map(([key, value]) => (
              <option
                key={key}
                value={value}
                disabled={!(face.weights as readonly number[]).includes(value)}
              >
                {key} · {value}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Line height">
          <NativeSelect value={leading} onChange={(e) => setLeading(e.target.value as Leading)}>
            <option value="default">Size default · {typography['line-height'][size]}px</option>
            {Object.entries(typography.leading).map(([key, value]) => (
              <option key={key} value={key}>
                {key} · {value}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Letter spacing">
          <NativeSelect value={tracking} onChange={(e) => setTracking(e.target.value as Tracking)}>
            {Object.entries(typography.tracking).map(([key, value]) => (
              <option key={key} value={key}>
                {key} · {value}em
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Numeric figures">
          <NativeSelect value={numeric} onChange={(e) => setNumeric(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="tabular-nums">Tabular</option>
            <option value="proportional-nums">Proportional</option>
            <option value="lining-nums">Lining</option>
            <option value="oldstyle-nums">Oldstyle</option>
            <option value="diagonal-fractions">Diagonal fractions</option>
            <option value="stacked-fractions">Stacked fractions</option>
            <option value="ordinal">Ordinal</option>
            <option value="slashed-zero">Slashed zero</option>
          </NativeSelect>
        </Field>
        <label className="foundation-italic">
          <Checkbox
            checked={italic}
            disabled={!face.italic}
            onChange={(e) => setItalic(e.target.checked)}
          />
          Italic
        </label>
      </div>
      <div
        role="region"
        aria-label="Typography preview"
        tabIndex={0}
        className="foundation-type-preview"
      >
        <p style={style}>{sample || 'Aa'}</p>
      </div>
      <p className="foundation-status">
        {face.label} · {typography.size[size]}px /{' '}
        {leading === 'default'
          ? `${typography['line-height'][size]}px`
          : typography.leading[leading]}{' '}
        · {weight}. Scroll the preview to inspect oversized text. OpenType features depend on the
        chosen font.
      </p>
      <Code label="Typography CSS">{`.example {\n  font-family: ${face.css};\n  font-size: var(--af-typography-size-${size});\n  line-height: var(--af-typography-${leading === 'default' ? `line-height-${size}` : `leading-${leading}`});\n  font-weight: ${weight};\n  letter-spacing: var(--af-typography-tracking-${tracking});\n  font-style: ${italic ? 'italic' : 'normal'};\n  font-variant-numeric: ${numeric};\n}`}</Code>
    </>
  );
}

export function TypeScale() {
  return (
    <div className="foundation-type-scale">
      {Object.entries(typography.size).map(([name, size]) => (
        <div className="foundation-type-row" key={name}>
          <div>
            <code>text-af-{name}</code>
            <span>
              {size}px / {typography['line-height'][name as Size]}px
            </span>
          </div>
          <p
            style={{
              fontSize: `var(--af-typography-size-${name})`,
              lineHeight: `var(--af-typography-line-height-${name})`,
            }}
          >
            Aa
          </p>
        </div>
      ))}
    </div>
  );
}
