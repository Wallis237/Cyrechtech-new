import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalDocument = {
  title: string;
  eyebrow: string;
  introduction: string;
  sections: LegalSection[];
};

const documents: Record<string, LegalDocument> = {
  "/legal/policies": {
    title: "Policies & Legal",
    eyebrow: "Our policies",
    introduction:
      "These policies establish the general rules governing the use of this website and the services provided by Cyrech Tech. Please read them alongside our Privacy Statement, Cookies Policy, and Terms of Use.",
    sections: [
      { title: "Introduction", paragraphs: ["By visiting this website or engaging with our services, you agree to act lawfully, respectfully, and in line with the policies that apply to your use. Separate written proposals or agreements may add service-specific terms; where they conflict, the signed agreement governs that project."] },
      { title: "Company policies", paragraphs: ["We aim to work with integrity, communicate clearly, protect information entrusted to us, and deliver thoughtful digital and creative work. We follow applicable laws and handle client information according to our Privacy Statement."] },
      { title: "Acceptable use", paragraphs: ["Use the website only for lawful purposes. Do not attempt to disrupt, damage, gain unauthorized access to, or misuse the website, its systems, or another person's information. Do not submit unlawful, deceptive, abusive, infringing, or malicious material."] },
      { title: "Service standards", paragraphs: ["We work toward agreed objectives, reasonable quality standards, and clear communication. Scope, deliverables, milestones, review rounds, and launch dates are confirmed in the applicable proposal or project agreement; timelines may change when requirements or dependencies change."] },
      { title: "Client responsibilities", paragraphs: ["Clients should provide accurate project and contact details, identify a decision-maker, supply materials they have permission to use, give timely feedback, and meet agreed payment and approval deadlines. Delays in these responsibilities may affect delivery schedules."] },
      { title: "Intellectual property", paragraphs: ["Each party retains rights to materials it owned before a project. Ownership or licensing of project deliverables, source files, and third-party components will be described in the applicable written agreement. Unless agreed otherwise, we may identify completed work in our portfolio without disclosing confidential information."] },
      { title: "Communication and support", paragraphs: ["We respond to inquiries through the contact details published on this website during reasonable business hours. Ongoing support, response targets, and maintenance are included only when stated in a written service agreement."] },
      { title: "Booking and cancellation policies", paragraphs: ["A booking request submitted through the website is an inquiry, not confirmation of a project or reservation. We will contact you to discuss fit, availability, and next steps. Please contact us promptly to change or cancel a confirmed engagement; any applicable notice period or cancellation fee will be stated in the project agreement."] },
      { title: "Payments and refunds", paragraphs: ["Prices, currency, payment milestones, taxes, and any deposit are stated in the relevant proposal or agreement. Work begins when the agreed conditions are met. Refund eligibility, including treatment of completed work and non-refundable third-party costs, is governed by that agreement and applicable law."] },
      { title: "Third-party services", paragraphs: ["Projects and this website may rely on third-party platforms, hosting, software, or integrations. Those providers have their own terms and privacy practices; we are not responsible for services outside our reasonable control."] },
      { title: "Changes to policies", paragraphs: ["We may update these policies as our services or legal obligations change. The current version will be published here with its revision date. Continued use after an update means you acknowledge the revised policies, to the extent permitted by law."] },
      { title: "Contact information", paragraphs: ["For questions about these policies, email cyrechtech@gmail.com or call +237 671 689 878."] },
    ],
  },
  "/legal/privacy-policy": {
    title: "Privacy Statement",
    eyebrow: "Your information",
    introduction:
      "Cyrech Tech respects your privacy. This statement explains what information we may collect through our website and booking process, how we use it, and the choices available to you.",
    sections: [
      { title: "Information we collect", paragraphs: ["Depending on how you interact with us, we may collect your name, email address, phone number, company or business name, country, city, preferred contact method, selected service, requested dates, project title, description, objectives, requirements, budget, timeline, and other details you choose to provide. We may also receive technical information such as browser type, device details, pages visited, and basic diagnostic data."] },
      { title: "How information is collected", paragraphs: ["We collect information you enter into contact and booking forms, send to us by email or phone, or otherwise provide during a project. Technical data may be generated when your browser loads the website. Cookies or analytics are used only as described in the Cookies Policy and as enabled on the site."] },
      { title: "Why we collect and use it", paragraphs: ["We use information to respond to inquiries, understand project needs, assess and manage booking requests, communicate with you, prepare proposals, deliver and support services, maintain website security, improve our services, and meet legal or record-keeping obligations."] },
      { title: "Booking information", paragraphs: ["When you submit a booking request, the information you provide may be stored in our project-management or database systems and sent to our team by email so we can review and follow up. A request is not confirmed until we contact you and agree on the engagement."] },
      { title: "Storage and protection", paragraphs: ["We use service providers and reasonable administrative and technical safeguards to protect information. No method of online transmission or storage can be guaranteed completely secure. Access is limited to people and providers who need the information for the purposes described here."] },
      { title: "Sharing with service providers", paragraphs: ["We may share relevant information with providers that help us host the website, store or process booking requests, send messages, provide analytics, or deliver a project. Website form submissions, including contact inquiries, bookings, careers applications, reviews, and feedback, are sent to Web3Forms for email delivery to our team; bookings and applications may also be stored in our database systems, and other forms may use our email delivery service. We may also disclose information when required by law, to protect rights and security, or as part of a business transfer. We do not sell personal information."] },
      { title: "Cookies and analytics", paragraphs: ["Cookies and similar technologies may support essential website operation, remember preferences, and—if enabled—help us understand site performance. See our Cookies Policy for cookie categories and controls."] },
      { title: "Your rights and choices", paragraphs: ["You may ask us to access, correct, or delete personal information you provided, or object to certain processing where applicable. You can also choose not to provide optional information, though this may limit our ability to assess or respond to a request."] },
      { title: "Retention", paragraphs: ["We retain information for as long as reasonably necessary to respond to you, manage a project, keep appropriate business records, resolve disputes, and meet legal obligations. Retention periods depend on the nature and context of the information."] },
      { title: "Correction or deletion requests", paragraphs: ["To request access, correction, or deletion, email cyrechtech@gmail.com with enough detail for us to identify your request. We may need to verify your identity and may retain information where the law or a legitimate business record requires it."] },
      { title: "Contact us about privacy", paragraphs: ["For privacy questions or requests, email cyrechtech@gmail.com or call +237 671 689 878."] },
    ],
  },
  "/legal/cookie-policy": {
    title: "Cookies Policy",
    eyebrow: "Cookies & preferences",
    introduction:
      "This policy explains how Cyrech Tech may use cookies and similar technologies on this website and how you can manage them.",
    sections: [
      { title: "What cookies are", paragraphs: ["Cookies are small text files that a website may store on your device. Similar technologies, including browser storage, can remember settings or help a site operate between visits."] },
      { title: "Why we use cookies", paragraphs: ["Cookies can help pages load and function correctly, remember choices, improve usability, and—where analytics tools are enabled—help us understand how visitors use the website so we can improve it."] },
      { title: "Essential cookies", paragraphs: ["Essential technologies support core site functions, security, and navigation. The website may not work as intended if these are blocked."] },
      { title: "Functional and preference cookies", paragraphs: ["Functional technologies can remember choices such as language or other display preferences, helping make repeat visits more convenient."] },
      { title: "Analytics and performance cookies", paragraphs: ["If analytics or performance tools are enabled, they may collect aggregated information about page views, navigation, and errors. This helps us assess and improve website performance."] },
      { title: "How cookies improve your experience", paragraphs: ["Remembered preferences can reduce repeated setup, while usage information can help us improve content, navigation, and reliability."] },
      { title: "Third-party cookies", paragraphs: ["Embedded content, maps, social features, hosting, or analytics provided by third parties may set their own cookies or similar technologies. Their use is controlled by the relevant provider's privacy and cookie policies."] },
      { title: "Managing or disabling cookies", paragraphs: ["You can manage or clear cookies through your browser settings. Many browsers let you block cookies, remove existing cookies, or notify you before one is stored. Disabling certain cookies may affect some website functionality, saved preferences, or embedded third-party features."] },
      { title: "Changes to this policy", paragraphs: ["We may update this policy as our website or technology changes. Updates will be posted on this page with a revised Last Updated date."] },
      { title: "Contact", paragraphs: ["Questions about cookies can be sent to cyrechtech@gmail.com."] },
    ],
  },
  "/legal/terms-of-use": {
    title: "Terms of Use",
    eyebrow: "Website terms",
    introduction:
      "These Terms of Use govern access to and use of the Cyrech Tech website. By using the website, you agree to these terms. If you do not agree, please do not use the website.",
    sections: [
      { title: "Acceptance of the terms", paragraphs: ["These terms apply to visitors and users of this website. A separate written proposal or service agreement may apply to work we provide; if terms conflict, the project agreement controls that engagement."] },
      { title: "Use of the website", paragraphs: ["You may use the website to learn about our work, contact us, and submit genuine service inquiries. You must comply with applicable laws and these terms."] },
      { title: "User responsibilities", paragraphs: ["You are responsible for the accuracy of information you submit and for ensuring you have the right to share any files, content, or personal information included in your request. Do not submit confidential information unless it is necessary and appropriate to do so."] },
      { title: "Services provided", paragraphs: ["Cyrech Tech offers creative, design, software, and related digital services. Website descriptions are general information and do not guarantee a particular scope, result, or delivery date. Service details are agreed in writing for each project."] },
      { title: "Service bookings", paragraphs: ["Submitting a booking form is a request to discuss a potential engagement, not an accepted booking or binding service commitment. We will confirm availability, scope, timing, and any applicable terms with you directly."] },
      { title: "Project information", paragraphs: ["Information submitted about a project may be used to evaluate your request and communicate with you, as described in our Privacy Statement. Do not submit unlawful, infringing, malicious, or sensitive third-party information without authorization."] },
      { title: "Payments and pricing", paragraphs: ["Any prices shown or discussed are subject to confirmation in a written proposal. Payment terms, currency, taxes, and milestones will be stated in the applicable agreement."] },
      { title: "Cancellations and refunds", paragraphs: ["Cancellation terms and any refund rights depend on the written project agreement and applicable law. Contact us promptly if you need to change or cancel an engagement."] },
      { title: "Intellectual property and ownership", paragraphs: ["Unless otherwise stated, website text, design, graphics, branding, and other materials are owned by or licensed to Cyrech Tech and protected by applicable intellectual-property laws. You may not copy, modify, distribute, or commercially exploit them without prior written permission. Project deliverable ownership and licenses are governed by the relevant agreement."] },
      { title: "Prohibited activities", paragraphs: ["You must not interfere with website operation, probe or bypass security, introduce malware, scrape or harvest data without permission, impersonate another person, or use the website to violate another party's rights or the law."] },
      { title: "Third-party links and services", paragraphs: ["Links and integrations to third-party services are provided for convenience. We do not control and are not responsible for their content, availability, or terms. Your use of them is at your own discretion and subject to their policies."] },
      { title: "Limitation of liability", paragraphs: ["To the extent permitted by law, the website and its general information are provided without a guarantee that they will be uninterrupted, error-free, or suitable for every purpose. Nothing in these terms excludes liability that cannot legally be excluded."] },
      { title: "Service availability", paragraphs: ["We may update, suspend, or discontinue website features or content at any time. We do not guarantee uninterrupted access and are not responsible for interruptions outside our reasonable control."] },
      { title: "Changes to these terms", paragraphs: ["We may revise these terms by publishing an updated version on this page. The Last Updated date indicates when the page was most recently revised."] },
      { title: "Governing law", paragraphs: ["These terms are governed by the laws applicable in Cameroon, without limiting any mandatory consumer protections that apply to you. Any dispute will be handled by a competent court, subject to applicable law."] },
      { title: "Contact information", paragraphs: ["For questions about these terms, email cyrechtech@gmail.com or call +237 671 689 878."] },
    ],
  },
};

const legalLinks = [
  { label: "Policies & Legal", to: "/legal/policies" },
  { label: "Privacy Statement", to: "/legal/privacy-policy" },
  { label: "Cookies", to: "/legal/cookie-policy" },
  { label: "Terms of Use", to: "/legal/terms-of-use" },
];

const LegalPage = () => {
  const { pathname } = useLocation();
  const document = documents[pathname] ?? documents["/legal/policies"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="container relative mx-auto px-6 py-16 md:py-24">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <p className="eyebrow mt-10 block">{document.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight md:text-6xl">{document.title}</h1>
            <p className="mt-5 text-sm text-muted-foreground">Last Updated: October 5, 2026</p>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{document.introduction}</p>
          </div>
        </section>

        <div className="container mx-auto grid gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-16 md:py-16">
          <article className="min-w-0 max-w-3xl space-y-9">
            {document.sections.map((section) => (
              <section key={section.title} className="scroll-mt-28">
                <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">{paragraph}</p>
                ))}
              </section>
            ))}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold">Need more information?</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Our team is happy to help with questions about our policies, privacy, or services.</p>
              <Link to="/contact" className="btn-lime mt-5 inline-flex">
                Contact our team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          <aside className="h-fit rounded-2xl border border-border bg-card/50 p-5 md:sticky md:top-28">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider">Legal pages</h2>
            <nav aria-label="Legal pages" className="mt-4 flex flex-col gap-1">
              {legalLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  aria-current={pathname === to ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-primary ${pathname === to ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
