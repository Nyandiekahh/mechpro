// Hand-drawn icon set — one component, no icon library dependency.
// Usage: <Icon name="snowflake" size={22} />
const paths = {
  snowflake: "M12 2v20M4.9 5.5l14.2 13M19.1 5.5l-14.2 13M12 2l-2.5 2.5M12 2l2.5 2.5M12 22l-2.5-2.5M12 22l2.5-2.5M4.9 5.5L4.5 9M4.9 5.5L8.4 5M19.1 5.5l.4 3.5M19.1 5.5L15.6 5M4.9 18.5L4.5 15M4.9 18.5l3.5.5M19.1 18.5l.4-3.5M19.1 18.5l-3.5.5",
  fan: "M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M12 10c0-4 -1.5-6 -4-6c-2 0-3 1.5-3 3c0 2.5 3 3.5 7 3M14 12c4 0 6-1.5 6-4c0-2-1.5-3-3-3c-2.5 0-3.5 3-3 7M12 14c0 4 1.5 6 4 6c2 0 3-1.5 3-3c0-2.5-3-3.5-7-3M10 12c-4 0-6 1.5-6 4c0 2 1.5 3 3 3c2.5 0 3.5-3 3-7",
  ruler: "M3 17L17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2",
  clipboard: "M9 4h6v3H9zM9 4a2 2 0 0 0-4 1v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-4-1M8.5 12h7M8.5 16h5",
  bolt: "M13 2L4 14h6l-1 8l9-12h-6z",
  building: "M4 21h16M6 21V5l6-3v19M12 21V8l6 3v10M9 8h.01M9 12h.01M9 16h.01M15 13h.01M15 17h.01",
  calendar: "M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 3v4M16 3v4M4 10h16",
  engineer: "M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM8 6h8M12 2v2M5 21c0-3.5 3-6 7-6s7 2.5 7 6",
  leaf: "M6 20c8 0 13-5 13-14c-9 0-14 5-14 13M6 20c0-6 4-10 9-11",
  shield: "M12 2l8 3v6c0 5-3.5 9-8 11c-4.5-2-8-6-8-11V5zM9 12l2 2l4-4",
  wrench: "M14 6a4 4 0 0 1 5.6-3.7L16.5 5.4l2.1 2.1l3.1-3.1A4 4 0 0 1 18 10c-.5 0-1-.1-1.4-.2L7 19.4A2 2 0 1 1 4.6 17l9.6-9.6C14.1 7 14 6.5 14 6z",
  clock: "M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18zM12 7v5l3.5 2",
  map: "M12 21s-6-5.5-6-10a6 6 0 1 1 12 0c0 4.5-6 10-6 10zM12 13a2 2 0 1 0 0-4a2 2 0 0 0 0 4z",
  home: "M4 11l8-7l8 7M6 10v10h12V10M10 20v-6h4v6",
  cross: "M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z",
  bed: "M3 18V8M3 12h18v6M3 15h18M7 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4z",
  flame: "M12 22c4 0 7-2.7 7-7c0-3-2-5.5-3.5-7C15 10 14 11 13 11c0-3-1-6-4-8c.5 3-.7 5-2.3 7C5 12 5 13.5 5 15c0 4.3 3 7 7 7zM12 22c-2 0-3.5-1.5-3.5-3.5c0-1.8 1.4-3 2.5-4.5c1.8 1.5 4.5 2.5 4.5 4.5S14 22 12 22z",
  book: "M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zM4 19V5M20 15H6a2 2 0 0 0-2 2",
  factory: "M3 21V10l6 4v-4l6 4V7l6-2v16zM7 17h.01M12 17h.01M17 17h.01",
  box: "M12 2l9 5v10l-9 5l-9-5V7zM12 12l9-5M12 12L3 7M12 12v10",
  server: "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01",
  phone: "M5 3h4l2 5l-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2z",
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3.5 6.5L12 13l8.5-6.5",
  pin: "M12 21s-6-5.5-6-10a6 6 0 1 1 12 0c0 4.5-6 10-6 10zM12 13a2 2 0 1 0 0-4a2 2 0 0 0 0 4z",
  arrow: "M4 12h15M13 6l6 6l-6 6",
  check: "M4 12.5L9.5 18L20 6",
  star: "M12 2.5l2.9 6l6.6.9l-4.8 4.6l1.2 6.5L12 17.4l-5.9 3.1l1.2-6.5L2.5 9.4l6.6-.9z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  whatsapp: "M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3zM8.7 8.2c.2-.5.5-.5.7-.5h.6c.2 0 .4 0 .6.5c.2.5.7 1.8.8 1.9c.1.2.1.3 0 .5c-.1.2-.2.4-.4.6c-.2.2-.4.4-.2.7c.2.3.9 1.4 1.9 2.2c1.3 1.1 2.3 1.4 2.6 1.5c.3.1.5.1.7-.1c.2-.2.8-.9 1-1.2c.2-.3.4-.2.7-.1c.3.1 1.8.8 2.1 1c.3.2.5.2.6.4c.1.2.1.9-.2 1.7",
  search: "M11 18a7 7 0 1 0 0-14a7 7 0 0 0 0 14zM16 16l5 5",
};

export default function Icon({ name, size = 22, stroke = 1.7, className = "" }) {
  const d = paths[name] || paths.check;
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
