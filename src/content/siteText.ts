// Registry of every editable text/image on the public site.
// Values are stored in site_settings.content (jsonb); these are the fallbacks.
export type TextFieldType = "text" | "textarea" | "image";
export interface TextField {
  key: string;
  label: string;
  def: string;
  type?: TextFieldType;
}
export interface TextGroup {
  title: string;
  fields: TextField[];
}

export const TEXT_GROUPS: TextGroup[] = [
  {
    title: "Brand, Header & Footer",
    fields: [
      { key: "brand_name", label: "Brand name", def: "Cyrech Tech" },
      { key: "logo_image", label: "Logo", def: "/__l5e/assets-v1/c70610f7-0655-441f-99bf-414607b65dd7/cyrech-tech-logo.png", type: "image" },
      { key: "nav_home", label: "Nav: Home", def: "Home" },
      { key: "nav_projects", label: "Nav: Projects", def: "Projects" },
      { key: "nav_services", label: "Nav: Services", def: "Services" },
      { key: "nav_about", label: "Nav: About", def: "About" },
      { key: "nav_contact", label: "Nav: Contact", def: "Contact" },
      { key: "nav_cta", label: "Header button", def: "Work With Us" },
      { key: "footer_description", label: "Footer description", def: "Building the future with precision, passion, and purpose from Cameroon.", type: "textarea" },
      { key: "footer_socials_label", label: "Footer socials heading", def: "Socials" },
      { key: "footer_navigation_label", label: "Footer navigation heading", def: "Navigate" },
      { key: "footer_copyright", label: "Footer copyright", def: "Cyrech Tech. Built with Precision." },
      { key: "footer_location", label: "Footer location", def: "Cameroon" },
    ],
  },
  {
    title: "Home page",
    fields: [
      { key: "availability_text", label: "Availability chip", def: "Available for new projects" },
      { key: "hero_heading", label: "Headline", def: "Empowering Brands Through" },
      { key: "hero_heading_accent", label: "Headline highlight", def: "Creative Solutions" },
      { key: "hero_subtitle", label: "Subtitle", def: "From Cameroon to the world. Cyrech Tech crafts high-performance digital experiences through precision engineering and artistic mastery.", type: "textarea" },
      { key: "hero_primary_cta", label: "Primary button", def: "Start Your Project" },
      { key: "hero_secondary_cta", label: "Secondary button", def: "View Portfolio" },
      { key: "stat1_value", label: "Stat 1 value", def: "2000+" },
      { key: "stat1_label", label: "Stat 1 label", def: "Global Reach" },
      { key: "stat2_value", label: "Stat 2 value", def: "3+" },
      { key: "stat2_label", label: "Stat 2 label", def: "Years Exp." },
      { key: "stat3_value", label: "Stat 3 value", def: "50+" },
      { key: "stat3_label", label: "Stat 3 label", def: "Projects" },
      { key: "stat4_value", label: "Stat 4 value", def: "100%" },
      { key: "stat4_label", label: "Stat 4 label", def: "Passion" },
      { key: "company_profile_label", label: "Company profile link", def: "Company Profile" },
      { key: "company_profile_link", label: "Company profile URL (optional)", def: "" },
    ],
  },
  {
    title: "Projects page",
    fields: [
      { key: "projects_eyebrow", label: "Projects eyebrow", def: "Selected Work" },
      { key: "projects_heading", label: "Projects heading", def: "Turning Ideas Into" },
      { key: "projects_heading_accent", label: "Projects heading highlight", def: "Masterpieces" },
      { key: "filter_all", label: "Filter: All", def: "All" },
      { key: "filter_software", label: "Filter: Software", def: "Software" },
      { key: "filter_web", label: "Filter: Web", def: "Web Dev" },
      { key: "filter_photography", label: "Filter: Photography", def: "Photography" },
      { key: "filter_design", label: "Filter: Design", def: "Design" },
      { key: "project_view_label", label: "Card 'View project' text", def: "View Project" },
      { key: "project_code_label", label: "Card 'Code' text", def: "Code" },
      { key: "gallery_eyebrow", label: "Gallery eyebrow", def: "Gallery" },
      { key: "gallery_heading", label: "Gallery heading", def: "Visual" },
      { key: "gallery_heading_accent", label: "Gallery heading highlight", def: "Chronicles" },
      { key: "gallery_intro", label: "Gallery intro", def: "A curated collection of photography and design work — moments captured, brands crafted.", type: "textarea" },
    ],
  },
  {
    title: "Services page",
    fields: [
      { key: "services_eyebrow", label: "Eyebrow", def: "What We Do" },
      { key: "services_heading", label: "Heading", def: "Comprehensive Digital" },
      { key: "services_heading_accent", label: "Heading highlight", def: "Excellence" },
      { key: "services_intro", label: "Intro", def: "A range of creative and digital services designed to help your brand stand out in an increasingly competitive digital landscape.", type: "textarea" },
      { key: "service_book_label", label: "Service 'Book' text", def: "Book this service" },
      { key: "toolkit_heading", label: "Toolkit heading", def: "Current Toolkit" },
      { key: "toolkit_intro", label: "Toolkit intro", def: "The technologies we use and continually master across the IT landscape.", type: "textarea" },
      { key: "proficiency_label", label: "Proficiency label", def: "Proficiency" },
    ],
  },
  {
    title: "About page",
    fields: [
      { key: "about_location_label", label: "Location chip", def: "Based in Cameroon" },
      { key: "about_heading", label: "Heading line 1", def: "Driven by Logic," },
      { key: "about_heading_2", label: "Heading line 2", def: "Defined by Creativity." },
      { key: "about_text", label: "About text", def: "Cyrech Tech is a passionate and ambitious creative technology brand from Cameroon, focused on software engineering and website development. Our journey brings together Information Technology, Physics, and Chemistry.", type: "textarea" },
      { key: "about_traits", label: "Traits (comma separated)", def: "Tech Enthusiast, Innovation Lover, Software Aspirant" },
      { key: "about_image", label: "About image", def: "/lovable-uploads/ichebe.jpg", type: "image" },
      { key: "team_eyebrow", label: "Team eyebrow", def: "The People Behind Cyrech Tech" },
      { key: "team_heading", label: "Team heading", def: "Meet the Team" },
      { key: "team_intro", label: "Team intro", def: "A multidisciplinary team combining leadership, project direction, people development, and engineering expertise.", type: "textarea" },
      { key: "journey_heading", label: "Journey heading", def: "The IT Journey" },
      { key: "profile_label", label: "Profile label", def: "Profile" },
      { key: "profile_heading", label: "Profile heading", def: "Loving, Ambitious, and Constantly Learning." },
      { key: "profile_text", label: "Profile text", def: "Dedicated to achieving goals and making an impact in the IT world. We believe the intersection of hard science and software logic is where the future is built.", type: "textarea" },
      { key: "growth_label", label: "Growth badge", def: "Continuous Growth Mindset" },
      { key: "interests_label", label: "Interests label", def: "Interests" },
      { key: "interests", label: "Interests (comma separated)", def: "Game Design, Physics Simulations, Full-stack Dev" },
      { key: "competition_title", label: "Competition title", def: "IT Competitions" },
      { key: "competition_text", label: "Competition text", def: "Solving real-world problems through logic." },
      { key: "competition_image_src", label: "Competition image", def: "/__l5e/assets-v1/19926d57-a3a8-4c0d-9044-2dcfb40728ff/tech-competition.jpg", type: "image" },
      { key: "short_goals_label", label: "Short-term label", def: "Short-term Goals" },
      { key: "short_goals_text", label: "Short-term text", def: "Master programming languages like Python, Java, C++, and JavaScript. Build and host functional applications that showcase technical mastery.", type: "textarea" },
      { key: "long_goals_label", label: "Long-term label", def: "Long-term Goals" },
      { key: "long_goals_text", label: "Long-term text", def: "Become a professional software engineering team, create impactful software, and inspire others in Cameroon to embrace ICT innovation.", type: "textarea" },
    ],
  },
  {
    title: "Contact & Booking page",
    fields: [
      { key: "contact_banner_heading", label: "Banner heading", def: "Let’s Build the Future Together." },
      { key: "contact_banner_text", label: "Banner text", def: "We’re excited to connect with like-minded people, share ideas, and work on projects that make a difference.", type: "textarea" },
      { key: "contact_email_cta", label: "Email button", def: "Email Us" },
      { key: "contact_social_cta", label: "Social button", def: "Follow Our Journey" },
      { key: "contact_eyebrow", label: "Eyebrow", def: "Get In Touch" },
      { key: "contact_heading", label: "Heading", def: "Let’s craft your" },
      { key: "contact_heading_accent", label: "Heading highlight", def: "digital future today." },
      { key: "contact_intro", label: "Intro", def: "Whether you have a specific project in mind or just want to chat about the latest in tech, we’re always open to new connections and collaborations.", type: "textarea" },
      { key: "contact_email_label", label: "Email label", def: "Email Us" },
      { key: "contact_phone_label", label: "Phone label", def: "Call Us" },
      { key: "contact_location_label", label: "Location label", def: "Location" },
      { key: "booking_eyebrow", label: "Form eyebrow", def: "Book a Service" },
      { key: "booking_heading", label: "Form heading", def: "Let’s plan your next project." },
      { key: "booking_name_label", label: "Name label", def: "Your Name" },
      { key: "booking_email_label", label: "Email label (form)", def: "Email Address" },
      { key: "booking_phone_label", label: "Phone label (form)", def: "Phone Number" },
      { key: "booking_service_label", label: "Service label", def: "Service" },
      { key: "booking_date_label", label: "Date label", def: "Preferred Date" },
      { key: "booking_message_label", label: "Message label", def: "Project Details" },
      { key: "booking_message_placeholder", label: "Message placeholder", def: "Tell us about your project..." },
      { key: "booking_submit_label", label: "Submit button", def: "Send Booking Request" },
      { key: "booking_toast", label: "Confirmation message", def: "Your email app has opened with the booking request ready to send." },
    ],
  },
];

export const TEXT_DEFAULTS: Record<string, string> = Object.fromEntries(
  TEXT_GROUPS.flatMap((g) => g.fields.map((f) => [f.key, f.def]))
);
