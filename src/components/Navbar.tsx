import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from './ThemeToggle';
import { useSiteText } from '@/hooks/useContent';
import { useLanguage, type Language } from "@/i18n/LanguageProvider";

export const useNavLinks = () => {
  const { t: siteText } = useSiteText();
  const { t } = useLanguage();
  return [
    { name: t(siteText('nav_home')), to: '/' },
    { name: t(siteText('nav_projects')), to: '/projects' },
    { name: t(siteText('nav_services')), to: '/services' },
    { name: t("Careers"), to: '/careers' },
    { name: t(siteText('nav_about')), to: '/about' },
    { name: t("Team"), to: '/team' },
    { name: t("Collaborations"), to: '/collaborations' },
    { name: t(siteText('nav_contact')), to: '/contact' },
  ];
};

const Navbar = () => {
  const { t: siteText } = useSiteText();
  const { language, setLanguage } = useLanguage();
  const { t } = useLanguage();
  const navLinks = useNavLinks();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const logoSrc = siteText('logo_image') || '/lovable-uploads/logo.jpg';
  const brandName = siteText('brand_name');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || open ? 'bg-background/85 backdrop-blur-xl border-b border-border/60' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link key={pathname} to="/" className="brand-turn flex items-center gap-3">
            <img
              src={logoSrc}
              alt={`${brandName} logo`}
              onError={(event) => {
                event.currentTarget.src = '/lovable-uploads/logo.jpg';
                event.currentTarget.onerror = null;
              }}
              className="h-9 w-9 rounded-lg object-contain border border-border/50 bg-background/50"
            />
            <span className="font-display font-bold text-primary text-xl tracking-tight uppercase">
              {brandName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {l.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <div className="hidden sm:block"><ThemeToggle /></div>
            <Link to="/contact" className="hidden md:inline-flex btn-lime !py-2 !px-5 text-sm">{t(siteText('nav_cta'))}</Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-border text-foreground"
              aria-label={t("Toggle menu")}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-[36rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col py-4 px-6 gap-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) => `py-3 text-base font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {l.name}
            </NavLink>
          ))}
          <label className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
            {t("Language")}
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </label>
          <Link to="/contact" className="btn-lime mt-3 self-start">{t(siteText('nav_cta'))}</Link>
        </nav>
      </div>
    </header>
  );
};

const LanguageSelector = ({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
}) => {
  const { t } = useLanguage();
  return (
    <select
      aria-label={t("Select language")}
      value={language}
      onChange={(event) => setLanguage(event.target.value as Language)}
      className="h-9 rounded-full border border-border bg-background px-3 text-xs font-semibold text-foreground outline-none transition hover:border-primary focus:ring-2 focus:ring-primary/30"
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
      <option value="de">Deutsch</option>
      <option value="pt">Português</option>
    </select>
  );
};

export default Navbar;
