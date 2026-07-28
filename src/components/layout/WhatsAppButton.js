import Icon from "../ui/Icon";
import { whatsappLink } from "../../data/siteConfig";

/** Floating WhatsApp button — visible on every page, per the WRS. */
export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with MECHPRO on WhatsApp"
    >
      <Icon name="whatsapp" size={26} stroke={1.6} />
    </a>
  );
}
