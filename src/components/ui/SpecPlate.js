/**
 * The "rating plate" — mono-type spec strip like the nameplate on an AC unit.
 * items: [{ label, value }]
 */
export default function SpecPlate({ items = [], className = "" }) {
  return (
    <dl className={`specplate ${className}`}>
      {items.map(({ label, value }) => (
        <div className="specplate__cell" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
