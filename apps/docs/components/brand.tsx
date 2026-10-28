export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M10 4H30L36 10V30L30 36H10L4 30V10L10 4Z" fill="currentColor" />
        <path
          fillRule="evenodd"
          d="M10 30L17 10H23L30 30H24L22.5 25H17.5L16 30ZM19 20H21L20 16Z"
          fill="var(--af-semantic-canvas)"
        />
      </svg>
      {!compact && (
        <span>
          antiflex<span className="brand-ui">/ui</span>
        </span>
      )}
    </span>
  );
}
