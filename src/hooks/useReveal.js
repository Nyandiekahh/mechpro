// Scroll-choreography: elements rise in as they enter the viewport.
// Returns { ref, className, style } to spread onto any element.
// Respects prefers-reduced-motion (everything just appears).
import { useEffect, useRef, useState } from "react";

export default function useReveal(delay = 0) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return {
    ref,
    className: `reveal${inView ? " is-in" : ""}`,
    style: delay ? { transitionDelay: `${delay}ms` } : undefined,
  };
}
