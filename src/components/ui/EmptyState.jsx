
export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px] bg-alt-surface rounded-lg border border-line">
      {Icon && (
        <div className="bg-bg p-4 rounded-full mb-4 text-accent-text shadow-sm border border-line">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-xl font-display font-semibold text-text mb-2">{title}</h3>
      {description && <p className="text-muted-text max-w-sm mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
