import Icon from "../ui/Icon";
import { useSite } from "../../context/SiteContext";

/** Slim information bar above the navigation — hours, location, contacts. */
export default function TopBar() {
  const { config } = useSite();
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__group">
          <span className="topbar__item"><Icon name="clock" size={14} /> {config.hours}</span>
          <span className="topbar__item topbar__item--hide-sm"><Icon name="pin" size={14} /> {config.address}</span>
        </div>
        <div className="topbar__group">
          <a className="topbar__item" href={`mailto:${config.emails.info}`}>
            <Icon name="mail" size={14} /> {config.emails.info}
          </a>
          <a className="topbar__item" href={config.phoneHref}>
            <Icon name="phone" size={14} /> {config.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
