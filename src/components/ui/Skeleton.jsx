
export default function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-line rounded ${className}`} aria-hidden="true" />
  );
}
