export default function KeyValue({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <p className="bg-zinc-100 rounded-lg px-2 py-0.5">
      <span className="">{label}:</span>{" "}
      <span className="font-semibold">{value}</span>
    </p>
  );
}
