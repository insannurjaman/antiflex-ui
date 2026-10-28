'use client';
import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx, type Size } from './utils';
export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  src?: string;
  alt: string;
  fallback?: ReactNode;
  size?: Size;
}
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, fallback, size = 'md', className, ...props },
  ref,
) {
  const [image, setImage] = useState<{ src: string; status: 'loaded' | 'failed' }>();
  const loaded = !!src && image?.src === src && image.status === 'loaded';
  const failed = !!src && image?.src === src && image.status === 'failed';
  const initials =
    alt
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || '?';
  return (
    <span
      {...props}
      ref={ref}
      role="img"
      aria-label={alt}
      className={cx('af-avatar', `af-avatar--${size}`, className)}
      data-loaded={loaded || undefined}
    >
      <span aria-hidden="true">{fallback ?? initials}</span>
      {src && !failed && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          onLoad={() => setImage({ src, status: 'loaded' })}
          onError={() => setImage({ src, status: 'failed' })}
        />
      )}
    </span>
  );
});
