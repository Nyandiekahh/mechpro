/**
 * The signature divider — a thermostat-scale ruler of tick marks.
 * Pure CSS (background gradient); this component just places it.
 */
export default function TickRule({ className = "" }) {
  return <div className={`tickrule ${className}`} aria-hidden="true" />;
}
