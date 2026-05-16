export function GlassCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-4xl border border-black/5 bg-white p-6 shadow-sm">
      <p className="text-sm text-black/50">
        {title}
      </p>

      <h3 className="mt-4 text-2xl font-semibold tracking-tight break-all">
        {value}
      </h3>
    </div>
  );
}