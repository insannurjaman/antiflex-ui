import { typography, fontFamilies } from '@antiflex/tokens/foundations';
import { TypographyFoundation, TypeScale } from '../../../../components/typography-foundation';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@antiflex/ui';
export const metadata = { title: 'Typography foundation' };
export default function TypographyPage() {
  return (
    <>
      <h1>A full range of expression.</h1>
      <p className="doc-lead">
        Thirteen sizes, nine weights, six line-height presets, and six tracking steps. Explore the
        scale with antiflex’s own type families.
      </p>
      <h2>Try the foundation</h2>
      <TypographyFoundation />
      <h2>Type scale</h2>
      <p>
        The reference scale runs from xs to 9xl, with a default line height for every size. Values
        use a 16px reference root; antiflex’s existing component and display sizes remain available.
      </p>
      <TypeScale />
      <h2>Font families</h2>
      <div className="foundation-font-list">
        {Object.entries(fontFamilies).map(([key, face]) => (
          <div key={key}>
            <code>font-{key}</code>
            <p style={{ fontFamily: face.css }}>Clear forms. Considered details.</p>
            <span>
              {face.label} · {face.weights.join(', ')}
              {face.italic ? ' · normal and italic' : ' · upright'}
            </span>
          </div>
        ))}
      </div>
      <p>
        DM Sans, Anybody, and Space Mono are self-hosted. Georgia is a system serif stack, with
        Times New Roman and the browser’s serif as fallbacks. The browser chooses the available
        system face. Space Mono and system serif expose regular/bold in the playground; Anybody
        supports upright and italic faces across the full weight scale. Font synthesis is disabled
        in the preview.
      </p>
      <h2>Weight, leading, tracking</h2>
      <div className="foundation-tables">
        {(
          [
            ['Weight', typography.weight, 'font-af-', ''],
            ['Leading', typography.leading, 'leading-af-', ''],
            ['Tracking', typography.tracking, 'tracking-af-', 'em'],
          ] as const
        ).map(([title, entries, prefix, unit]) => (
          <Table key={title}>
            <TableCaption>{title} reference</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Utility</TableHead>
                <TableHead scope="col">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(entries).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>
                    <code>
                      {prefix}
                      {key}
                    </code>
                  </TableCell>
                  <TableCell>
                    {value}
                    {unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
      </div>
      <h2>Use the scale with Tailwind</h2>
      <p>
        <code>text-af-xl font-af-bold leading-af-relaxed tracking-af-tight</code> combines size,
        weight, line height, and spacing. Palette classes such as <code>bg-af-blue-500</code> use
        the same reference source.
      </p>
      <h2>Compose the rest with native text utilities</h2>
      <p>
        Use Tailwind’s standard utilities for italic, alignment, case, decoration, lists, wrapping,
        truncation, clamping, indentation, smoothing, and OpenType features. These remain ordinary
        CSS capabilities; they are not additional antiflex component families.
      </p>
      <Table>
        <TableCaption>Typography composition guide</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Purpose</TableHead>
            <TableHead scope="col">Examples</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            [
              'Style and alignment',
              'italic, not-italic, text-start, text-center, text-end, text-justify',
            ],
            [
              'Case and decoration',
              'uppercase, lowercase, capitalize, normal-case, underline, overline, line-through, no-underline',
            ],
            [
              'Wrap and overflow',
              'text-wrap, text-nowrap, text-balance, text-pretty, truncate, text-ellipsis, line-clamp-3, break-words',
            ],
            [
              'Numeric features',
              'tabular-nums, proportional-nums, lining-nums, oldstyle-nums, ordinal, slashed-zero, diagonal-fractions, stacked-fractions',
            ],
            [
              'Lists and rhythm',
              'list-disc, list-decimal, list-inside, list-outside, indent-4, leading-6',
            ],
            [
              'Rendering and width',
              'antialiased, subpixel-antialiased, font-stretch-condensed (requires a suitable font)',
            ],
          ].map(([purpose, examples]) => (
            <TableRow key={purpose}>
              <TableCell>{purpose}</TableCell>
              <TableCell>{examples}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2>Use the right scale for the job</h2>
      <p>
        Large sizes and tight tracking are reference options, not defaults for interface text. Use
        readable body sizes, preserve heading semantics, and check your actual content at zoom and
        narrow widths. The complete scale is based on the{' '}
        <a href="https://tailwindcss.com/docs/font-size">Tailwind CSS typography reference</a>;
        antiflex’s component typography stays stable.
      </p>
    </>
  );
}
