'use client';
import { useState } from 'react';
import { Button, Field, Input, NativeSelect } from '@antiflex/ui';
import { paletteRamps, colorToHex } from '@antiflex/tokens/foundations';
type Format = 'variable' | 'oklch' | 'hex' | 'tailwind';
const bases = [
  { name: 'black', value: '#000' },
  { name: 'white', value: '#fff' },
  { name: 'transparent', value: '#00000000' },
];
export function ColorFoundation() {
  const [search, setSearch] = useState('');
  const [format, setFormat] = useState<Format>('variable');
  const blue = paletteRamps
    .find((ramp) => ramp.name === 'blue')!
    .shades.find((shade) => shade.step === '500')!;
  const [selected, setSelected] = useState<{
    name: string;
    step: string;
    value: string;
    variable: string;
    utility: string;
  }>({ ...blue, name: 'blue' });
  const [notice, setNotice] = useState('Select a swatch to inspect and copy its value.');
  const ramps = paletteRamps.filter((r) => r.name.includes(search.trim().toLowerCase()));
  function valueFor(item: typeof selected) {
    return format === 'variable'
      ? `var(${item.variable})`
      : format === 'hex'
        ? colorToHex(item.value)
        : format === 'tailwind'
          ? item.utility
          : item.value;
  }
  async function copy(item: typeof selected) {
    setSelected(item);
    try {
      await navigator.clipboard.writeText(valueFor(item));
      setNotice(
        `Copied ${item.name}${item.step ? ' ' + item.step : ''} as ${format === 'variable' ? 'CSS variable' : format.toUpperCase()}.`,
      );
    } catch {
      setNotice('Copy unavailable. Select and copy the value shown below.');
    }
  }
  return (
    <>
      <div className="foundation-toolbar">
        <Field label="Search palettes">
          <Input
            type="search"
            placeholder="Try blue, mist, or olive"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Field>
        <Field label="Copy format">
          <NativeSelect value={format} onChange={(e) => setFormat(e.target.value as Format)}>
            <option value="variable">CSS variable</option>
            <option value="oklch">OKLCH / source value</option>
            <option value="hex">HEX · sRGB preview</option>
            <option value="tailwind">Tailwind class</option>
          </NativeSelect>
        </Field>
      </div>
      <div className="foundation-inspector" aria-label="Selected color">
        <span
          className="foundation-inspector-swatch"
          style={{ background: `var(${selected.variable})` }}
          aria-hidden="true"
        />
        <div>
          <strong>
            {selected.name}
            {selected.step ? ` / ${selected.step}` : ''}
          </strong>
          <code data-testid="selected-color-value">{valueFor(selected)}</code>
        </div>
        <Button variant="secondary" size="sm" onClick={() => void copy(selected)}>
          Copy value
        </Button>
      </div>
      <p role="status" className="foundation-status">
        {notice}
      </p>
      <p className="foundation-count">
        {ramps.length} of {paletteRamps.length} palettes · 11 steps per palette
      </p>
      {ramps.length === 0 ? (
        <div className="foundation-empty">
          <h2>No palettes found</h2>
          <p>Try a color family such as red, sky, or slate.</p>
          <Button variant="secondary" onClick={() => setSearch('')}>
            Clear search
          </Button>
        </div>
      ) : (
        ramps.map((ramp) => (
          <section className="palette-ramp" key={ramp.name} aria-label={`${ramp.name} palette`}>
            <h2>{ramp.name}</h2>
            <div className="palette-steps">
              {ramp.shades.map((shade) => (
                <button
                  type="button"
                  key={shade.step}
                  className="palette-step"
                  aria-label={`Copy ${ramp.name} ${shade.step}`}
                  aria-pressed={selected.name === ramp.name && selected.step === shade.step}
                  onClick={() => void copy({ ...shade, name: ramp.name })}
                >
                  <span
                    className="palette-color"
                    style={{ background: `var(${shade.variable})` }}
                    aria-hidden="true"
                  />
                  <span>{shade.step}</span>
                </button>
              ))}
            </div>
          </section>
        ))
      )}
      <section className="palette-ramp" aria-label="Base colors">
        <h2>Base colors</h2>
        <div className="palette-bases">
          {bases.map((base) => (
            <button
              type="button"
              className="palette-step"
              key={base.name}
              aria-label={`Copy ${base.name}`}
              aria-pressed={selected.name === base.name}
              onClick={() =>
                void copy({
                  ...base,
                  step: '',
                  variable: `--af-palette-${base.name}`,
                  utility: `bg-af-${base.name}`,
                })
              }
            >
              <span
                className={`palette-color ${base.name === 'transparent' ? 'palette-color--transparent' : ''}`}
                style={{ backgroundColor: `var(--af-palette-${base.name})` }}
                aria-hidden="true"
              />
              <span>{base.name}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
