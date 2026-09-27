
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-brand-btn-bg text-brand-btn-text px-4 py-2 rounded font-medium"
    >
      Skip to content
    </a>
  );
}
