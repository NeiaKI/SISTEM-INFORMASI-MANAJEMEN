interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  theme?: "mahasiswa" | "dosen";
}

export function EmptyState({ icon = "📭", title, description, action, theme = "mahasiswa" }: EmptyStateProps) {
  const isDosen = theme === "dosen";
  return (
    <div className={`border rounded-[14px] p-12 text-center ${isDosen ? "bg-paper border-border" : "bg-mhs-card border-mhs-border"}`}>
      <div className="text-4xl mb-3">{icon}</div>
      <div className={`font-semibold text-[15px] ${isDosen ? "text-ink" : "text-mhs-text"}`}>{title}</div>
      {description && (
        <div className={`text-[13px] mt-1.5 leading-relaxed max-w-sm mx-auto ${isDosen ? "text-muted" : "text-mhs-muted"}`}>
          {description}
        </div>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
