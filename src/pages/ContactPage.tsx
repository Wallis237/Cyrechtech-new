import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import { useLanguage } from "@/i18n/LanguageProvider";

const ContactPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="eyebrow">{t("Contact")}</p>
            <h1 className="mt-4 text-4xl font-display font-bold tracking-tight text-foreground md:text-6xl">
              {t("Let’s build something meaningful.")}
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              {t("Tell us about your next project, challenge, or vision and we’ll help shape the best path forward.")}
            </p>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
