// ------------------------------------------------------------------
// ChatWidget — the MECHPRO assistant.
// Rule-based, powered by live CMS data, with a guided quotation flow
// that files a real RFQ (source: chatbot) and returns the reference.
// ------------------------------------------------------------------
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import { useSite } from "../../context/SiteContext";
import { useApi, useApiAll } from "../../api/hooks";
import { apiPost } from "../../api/client";
import fallbackServices from "../../data/services";
import fallbackProducts from "../../data/products";
import { FLOW_STEPS, greeting, think } from "./brain";

const STORE_KEY = "mechpro-chat-v1";

let idCounter = 0;
const msg = (from, body) => ({ id: `m${Date.now()}-${idCounter++}`, from, ...body });

export default function ChatWidget() {
  const site = useSite();
  const { config, wa } = site;
  const { data: services } = useApi("/api/services/", fallbackServices);
  const { data: products } = useApiAll("/api/products/", fallbackProducts);
  const { data: faqs } = useApi("/api/faqs/", []);

  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || []; }
    catch { return []; }
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [flow, setFlow] = useState(null); // { step, answers }
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const knowledge = useMemo(() => ({ config, services, products, faqs }),
    [config, services, products, faqs]);

  // Persist + autoscroll
  useEffect(() => {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(messages.slice(-60))); } catch {}
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, open]);

  // A gentle teaser bubble after a few seconds, once per session
  useEffect(() => {
    if (open || messages.length > 0) return undefined;
    const t = setTimeout(() => setTeaser(true), 6000);
    return () => clearTimeout(t);
  }, [open, messages.length]);

  const pushBot = useCallback((body, delay = 550) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, msg("bot", body)]);
    }, delay + Math.random() * 350);
  }, []);

  const openChat = () => {
    setOpen(true);
    setTeaser(false);
    if (messages.length === 0) pushBot(greeting(config), 400);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 250);
  };

  // ---------- guided RFQ flow ----------
  const startFlow = useCallback(() => {
    const step = FLOW_STEPS[0];
    setFlow({ step: 0, answers: {} });
    pushBot({ text: step.prompt, chips: step.chips });
  }, [pushBot]);

  const stepChips = useCallback((step) => {
    if (step.chipsFrom === "services") return services.map((s) => s.name);
    return step.chips;
  }, [services]);

  const advanceFlow = useCallback(async (value) => {
    const current = FLOW_STEPS[flow.step];
    if (current.validate) {
      const ok = current.validate(current.key === "phone" ? value : { ...flow.answers, [current.key]: value });
      if (current.key === "phone" && current.validate(value) !== true) {
        pushBot({ text: current.validate(value) });
        return;
      }
      if (current.key !== "phone" && ok !== true) {
        pushBot({ text: ok });
        return;
      }
    }
    const answers = { ...flow.answers,
      [current.key]: current.optional && /^skip$/i.test(value.trim()) ? "" : value };
    const nextIndex = flow.step + 1;

    if (nextIndex < FLOW_STEPS.length) {
      const next = FLOW_STEPS[nextIndex];
      setFlow({ step: nextIndex, answers });
      const prompt = typeof next.prompt === "function" ? next.prompt(answers) : next.prompt;
      pushBot({ text: prompt, chips: stepChips(next) });
      return;
    }

    // Flow complete → file the RFQ
    setFlow(null);
    pushBot({ text: "Perfect, filing that with the engineering team now…" }, 300);
    try {
      const res = await apiPost("/api/rfq/", {
        fullName: answers.fullName, phone: answers.phone, county: answers.county,
        service: answers.service, message: answers.message, source: "chatbot",
      });
      if (res.ok) {
        pushBot({
          reference: res.data.reference,
          text: `Done! Your reference is below. An engineer responds within 24 working hours${answers.message ? "" : ", and they'll ask for the details when they call"}. Anything else?`,
          quick: ["Our services", "Find a product", "Talk to a human"],
        }, 900);
      } else {
        throw new Error("bad status");
      }
    } catch {
      pushBot({
        text: "I couldn't reach our system just now, but let's not lose this. Send it straight to the team on WhatsApp:",
        actions: [{ label: "Send via WhatsApp", href: wa(
          `QUOTATION REQUEST (chat)\nName: ${answers.fullName}\nPhone: ${answers.phone}\nCounty: ${answers.county}\nService: ${answers.service}\n${answers.message ? `Details: ${answers.message}` : ""}`
        ) }],
      }, 700);
    }
  }, [flow, pushBot, wa, stepChips]);

  // ---------- send handler ----------
  const send = (raw) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((m) => [...m, msg("user", { text })]);
    setInput("");

    if (flow) {
      if (/^(cancel|stop|never ?mind|forget it|exit)$/i.test(text)) {
        setFlow(null);
        pushBot({ text: "No problem, cancelled. What else can I help with?", quick: ["Get a quotation", "Our services", "Size my room"] }, 350);
        return;
      }
      advanceFlow(text);
      return;
    }

    // quick-reply intents that map to actions
    if (/^get a quotation$/i.test(text)) { startFlow(); return; }
    if (/^size my room$/i.test(text)) {
      pushBot({ text: "Tell me the room in metres or feet, something like \"4m by 5m\" or \"18 sqm\", and I'll give you a starting BTU range." }, 350);
      return;
    }
    if (/^browse all products$/i.test(text)) {
      pushBot({ text: "Here you go, search and filters included:", actions: [{ label: "Open the catalogue", to: "/products" }] });
      return;
    }

    const reply = think(text, knowledge);
    if (reply.startFlow) {
      pushBot({ text: reply.text }, 450);
      setTimeout(startFlow, 1200);
      return;
    }
    pushBot(reply);
  };

  const resetChat = () => {
    setMessages([]);
    setFlow(null);
    try { sessionStorage.removeItem(STORE_KEY); } catch {}
    pushBot(greeting(config), 350);
  };

  return (
    <>
      {/* ---- launcher ---- */}
      {teaser && !open && (
        <button className="chat-teaser" onClick={openChat}>
          <span>Need a quote or quick advice? I'm here.</span>
        </button>
      )}
      <button
        className={`chat-launcher ${open ? "is-open" : ""}`}
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? "Close chat" : "Chat with the MECHPRO assistant"}
      >
        <Icon name={open ? "close" : "chat"} size={26} stroke={1.8} />
      </button>

      {/* ---- panel ---- */}
      {open && (
        <section className="chat-panel" role="dialog" aria-label="MECHPRO assistant"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
          <header className="chat-panel__head">
            <div>
              <p className="chat-panel__title">{config.shortName} Assistant</p>
              <p className="chat-panel__status"><span className="dot" /> Online · replies instantly</p>
            </div>
            <div className="chat-panel__head-actions">
              <button onClick={resetChat} aria-label="Restart conversation" title="Restart">
                <Icon name="refresh" size={17} />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <Icon name="close" size={19} />
              </button>
            </div>
          </header>

          <div className="chat-panel__list" ref={listRef} aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`chat-msg chat-msg--${m.from}`}>
                {m.text && <p className="chat-msg__bubble">{m.text}</p>}
                {m.reference && (
                  <p className="chat-msg__reference">
                    <span>Reference number</span>
                    <strong>{m.reference}</strong>
                  </p>
                )}
                {m.actions && (
                  <div className="chat-msg__actions">
                    {m.actions.map((a) =>
                      a.to ? (
                        <Link key={a.label} to={a.to} className="chat-action" onClick={() => setOpen(false)}>
                          {a.label} <Icon name="arrow" size={14} />
                        </Link>
                      ) : (
                        <a key={a.label} className="chat-action"
                          href={a.href === "wa" ? wa() : a.href}
                          target={String(a.href).startsWith("http") || a.href === "wa" ? "_blank" : undefined}
                          rel="noreferrer">
                          {a.label} <Icon name="arrow" size={14} />
                        </a>
                      ))}
                  </div>
                )}
                {(m.quick || m.chips) && (
                  <div className="chat-msg__quick">
                    {(m.quick || m.chips).map((q) => (
                      <button key={q} onClick={() => send(q)}>{q}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="chat-msg chat-msg--bot">
                <p className="chat-msg__bubble chat-typing" aria-label="Assistant is typing">
                  <span /><span /><span />
                </p>
              </div>
            )}
          </div>

          <form className="chat-panel__input"
            onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={flow ? "Type your answer…" : "Ask about services, units, quotes…"}
              aria-label="Message the assistant"
            />
            <button type="submit" aria-label="Send message">
              <Icon name="send" size={18} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
