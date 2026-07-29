// Counts "240+" up from 0 when started. Non-numeric values ("24/7") pass through.
import { useEffect, useState } from "react";

export default function useCountUp(value, started, durationMs = 1300) {
  const match = /^(\d+)([+%]?)$/.exec(String(value).replace(/,/g, ""));
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (target === null || !started) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      return undefined;
    }
    let frame;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setCurrent(Math.round(eased * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, started, durationMs]);

  if (target === null) return String(value); // e.g. "24/7"
  return `${current.toLocaleString()}${suffix}`;
}
