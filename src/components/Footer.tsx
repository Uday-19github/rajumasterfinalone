import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const Footer = () => {
  const { sec } = useContent();
  const contactRow = sec("contact");
  const contactMeta = (contactRow?.meta as any) || {};

  const socials = [
    { Icon: Instagram, href: contactMeta.contactInstagram || "https://instagram.com/rajumaster_riseandshine" },
    { Icon: Facebook, href: contactMeta.contactFacebook || "https://facebook.com/rajumaster.riseandshine" },
    { Icon: Youtube, href: contactMeta.contactYoutube || "https://youtube.com/@rajumaster_riseandshine" },
    { 
      Icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ), 
      href: contactRow?.button_link || "https://wa.me/919908100855" 
    }
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container py-16 grid md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-glow">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg tracking-tight">RAJUMASTER'S</span>
              <span className="font-display text-sm text-primary tracking-[0.2em] -mt-1">RISE & SHINE</span>
            </div>
          </Link>
          <p className="text-muted-foreground text-sm">Where rhythm meets revolution. Hyderabad's boldest dance & fitness destination.</p>
        </div>

        <div>
          <h4 className="font-display text-xl mb-4 text-secondary">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition">Services</Link></li>
            <li><Link to="/about" className="hover:text-primary transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-4 text-secondary">Reach Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5" /> 
              {contactMeta.contactAddress || "3rd Floor, Plot no-4, Manikonda, Hyderabad 500089"}
            </li>
            <li className="flex gap-2">
              <Phone className="w-4 h-4 text-primary mt-0.5" /> 
              {contactMeta.contactPhone || "099081 00855"}
            </li>
            <li className="flex gap-2">
              <Mail className="w-4 h-4 text-primary mt-0.5" /> 
              {contactMeta.contactEmail || "hello@riseandshine.in"}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-4 text-secondary">Follow the Beat</h4>
          <div className="flex gap-3">
            {socials.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition"
              >
                <social.Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Rajumaster's Rise & Shine. All rhythm reserved.
      </div>
    </footer>
  );
};

export default Footer;
