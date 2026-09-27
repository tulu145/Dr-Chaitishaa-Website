export default function RouteSkeleton() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-bg text-text">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-text border-t-transparent"></div>
        <p className="text-sm text-muted-text" aria-live="polite">Loading...</p>
      </div>
    </div>
  )
}
