// Types, holds, deletes, and moves to the next phrase — the hero's heartbeat.
// Reduced-motion users get the first phrase, static.
import { useEffect, useState } from "react";

export default function useTypewriter(
  words,
  { typeMs = 65, deleteMs = 32, holdMs = 2100 } = {}
) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [text, setText] = useState(reduced ? words[0] : "");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return undefined;
    const word = words[index % words.length];
    let timer;

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timer = setTimeout(() => {
        setText(deleting
          ? word.slice(0, text.length - 1)
          : word.slice(0, text.length + 1));
      }, deleting ? deleteMs : typeMs);
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, reduced, typeMs, deleteMs, holdMs]);

  return { text, done: !reduced };
}
