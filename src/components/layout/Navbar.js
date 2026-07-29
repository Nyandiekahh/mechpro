import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Icon from "../ui/Icon";
import navigation from "../../data/navigation";
import { LOGO_SRC } from "../../data/branding";
import { useSite } from "../../context/SiteContext";

/** Sticky primary navigation with mobile drawer. */
export default function Navbar() {
  const { config } = useSite();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={close}>
          <img className="navbar__logo" src={LOGO_SRC} alt="" />
          <span className="navbar__name">
            {config.shortName}
            <em>{config.tagline}</em>
          </span>
        </Link>

        <ul className={`navbar__links ${open ? "is-open" : ""}`}>
          {navigation.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={close}
                className={({ isActive }) => (isActive ? "is-active" : undefined)}
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="navbar__links-cta">
            <Link to="/request-quote" className="btn btn--solid" onClick={close}>
              <span>Request a quote</span><Icon name="arrow" size={16} />
            </Link>
          </li>
        </ul>

        <div className="navbar__right">
          <Link to="/request-quote" className="btn btn--solid navbar__cta">
            <span>Request a quote</span><Icon name="arrow" size={16} />
          </Link>
          <button
            className="navbar__toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} size={24} stroke={2} />
          </button>
        </div>
      </div>
    </nav>
  );
}
