import Icon from "../ui/Icon";
import { useSite } from "../../context/SiteContext";
import { trackClick } from "../../api/trackClick";

/** Floating WhatsApp button — visible on every page, per the WRS. */
export default function WhatsAppButton() {
  const { wa } = useSite();
  return (
    <a
      className="whatsapp-float"
      href={wa()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with MECHPRO on WhatsApp"
      onClick={() => trackClick("whatsapp")}
    >
      <Icon name="whatsapp" size={26} stroke={1.6} />
    </a>
  );
}
