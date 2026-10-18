import { Link } from "react-router-dom";
import { Github, Linkedin, Facebook, Instagram, Mail, Phone } from "lucide-react";
import { socialLinks } from "@/lib/socialLinks";
import { useSiteText } from "@/hooks/useContent";
import { useNavLinks } from "./Navbar";
import { useLanguage } from "@/i18n/LanguageProvider";

const Footer = () => {
  const { t: siteText, settings } = useSiteText();
  const { t } = useLanguage();
  const navLinks = useNavLinks();
  const logoSrc = siteText('logo_image') || '/lovable-uploads/logo.jpg';
  const brandName = siteText('brand_name');
  const contactEmail = 'info@cyrechtech.com';
  const contactPhone = '+237671689878';
  const year = new Date().getFullYear();

  const socials = [
    { name: 'GitHub', icon: Github, href: settings?.github || socialLinks.github },
    { name: 'LinkedIn', icon: Linkedin, href: settings?.linkedin || socialLinks.linkedin },
    { name: 'Facebook', icon: Facebook, href: settings?.facebook || socialLinks.facebook },
    { name: 'Instagram', icon: Instagram, href: settings?.instagram || socialLinks.instagram },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border py-12 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 items-start sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3 font-display font-bold text-primary text-2xl tracking-tight uppercase">
              <img
                src={logoSrc}
                alt={`${brandName} logo`}
                onError={(event) => {
                  event.currentTarget.src = '/lovable-uploads/logo.jpg';
                  event.currentTarget.onerror = null;
                }}
                className="h-10 w-10 rounded-lg object-contain border border-border/50 bg-background/50"
              />
              <span>{brandName}</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t(siteText('footer_description'))}</p>
          </div>

          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-4">{t("Contact")}</div>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors w-fit">
                <Mail className="h-3.5 w-3.5" />{contactEmail}
              </a>
              <a href={`tel:${contactPhone}`} className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors w-fit">
                <Phone className="h-3.5 w-3.5" />{contactPhone}
              </a>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-4">{t(siteText('footer_socials_label'))}</div>
            <div className="flex flex-col gap-2">
              {socials.map(({ name, icon: Icon, href }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors w-fit">
                  <Icon className="h-3.5 w-3.5" />{name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-4">{t(siteText('footer_navigation_label'))}</div>
            <div className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-foreground hover:text-primary transition-colors w-fit">{l.name}</Link>
              ))}
            </div>
          </div>
        </div>

        <nav aria-label="Policies and legal" className="mt-10 border-t border-border pt-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {[
              { label: "Policies & Legal", to: "/legal/policies" },
              { label: "Privacy Statement", to: "/legal/privacy-policy" },
              { label: "Cookies", to: "/legal/cookie-policy" },
              { label: "Terms of Use", to: "/legal/terms-of-use" },
            ].map(({ label, to }, index) => (
              <li key={to} className="flex items-center gap-3">
                {index > 0 && <span aria-hidden="true" className="text-border">|</span>}
                <Link to={to} className="transition-colors hover:text-primary">{t(label)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground font-mono">
          <span>© {year} {t(siteText('footer_copyright'))}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
