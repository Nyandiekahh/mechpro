/**
 * The "rating plate" — mono-type spec strip like the nameplate on an AC unit.
 * items: [{ label, value }]. Items with an empty/falsy value are skipped —
 * real supplier data is often partial (e.g. no coverage figure yet), and an
 * empty cell looks broken rather than intentional.
 */
export default function SpecPlate({ items = [], className = "" }) {
  const visible = items.filter((item) => item.value !== undefined && item.value !== null && item.value !== "");
  if (visible.length === 0) return null;
  return (
    <dl className={`specplate ${className}`}>
      {visible.map(({ label, value }) => (
        <div className="specplate__cell" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
