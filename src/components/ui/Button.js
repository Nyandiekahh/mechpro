import { Link } from "react-router-dom";
import Icon from "./Icon";

/**
 * One button, three variants: "solid" (green), "ink" (charcoal), "ghost" (outline).
 * Renders a <Link> for internal `to`, an <a> for external `href`, else a <button>.
 */
export default function Button({
  to, href, onClick, children,
  variant = "solid", icon, type = "button", className = "",
}) {
  const cls = `btn btn--${variant} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} />}
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href)
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  return <button type={type} onClick={onClick} className={cls}>{inner}</button>;
}
