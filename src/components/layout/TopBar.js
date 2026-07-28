import Icon from "../ui/Icon";
import siteConfig from "../../data/siteConfig";

/** Slim information bar above the navigation — hours, location, contacts. */
export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__group">
          <span className="topbar__item"><Icon name="clock" size={14} /> {siteConfig.hours}</span>
          <span className="topbar__item topbar__item--hide-sm"><Icon name="pin" size={14} /> {siteConfig.address}</span>
        </div>
        <div className="topbar__group">
          <a className="topbar__item" href={`mailto:${siteConfig.emails.info}`}>
            <Icon name="mail" size={14} /> {siteConfig.emails.info}
          </a>
          <a className="topbar__item" href={siteConfig.phoneHref}>
            <Icon name="phone" size={14} /> {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
