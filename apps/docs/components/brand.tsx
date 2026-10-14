export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M10 4H30L36 10V30L30 36H10L4 30V10L10 4Z" fill="currentColor" />
        <path d="M14 12H28V18H18V26H28V32H14L10 28V16L14 12Z" fill="var(--ch-semantic-canvas)" />
      </svg>
      {!compact && (
        <span>
          chamfer<span className="brand-ui">/ui</span>
        </span>
      )}
    </span>
  );
}
