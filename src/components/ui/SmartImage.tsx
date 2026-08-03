/* ============================================================
   SmartImage — image with aspect-ratio placeholder to avoid
   layout shift; defers off-screen loads via the native
   loading="lazy" attribute.
   ============================================================ */

import { memo } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  /** Intrinsic aspect ratio, e.g. "16 / 9" */
  ratio?: string;
  eager?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const SmartImage = memo(function SmartImage({
  src,
  alt,
  width,
  height,
  className = '',
  ratio,
  eager = false,
  sizes,
}: SmartImageProps) {
  const aspectStyle =
    ratio ??
    (width && height ? `${width} / ${height}` : undefined);

  return (
    <div
      className={['smart-image', className].filter(Boolean).join(' ')}
      style={aspectStyle ? { aspectRatio: aspectStyle } : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        width={width}
        height={height}
      />
    </div>
  );
});
