type EmptyStateProps = {
  title: string;
  message: string;
};

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-20 text-center">
      <span className="h-px w-12 bg-brand-orange" aria-hidden />
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">Em breve</p>
      <h2 className="text-2xl font-light text-brand-navy sm:text-3xl">{title}</h2>
      <p className="text-base leading-relaxed text-slate-600">{message}</p>
    </div>
  );
}
