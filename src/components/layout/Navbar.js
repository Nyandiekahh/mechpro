import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Icon from "../ui/Icon";
import navigation from "../../data/navigation";
import siteConfig from "../../data/siteConfig";

/** Sticky primary navigation with mobile drawer. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={close}>
          <span className="navbar__mark" aria-hidden="true"><Icon name="snowflake" size={20} stroke={2} /></span>
          <span className="navbar__name">
            {siteConfig.shortName}
            <em>{siteConfig.tagline}</em>
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
