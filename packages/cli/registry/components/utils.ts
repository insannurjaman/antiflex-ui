export type Size = 'sm' | 'md' | 'lg';

export const cx = (...values: (string | undefined | false)[]) => values.filter(Boolean).join(' ');
