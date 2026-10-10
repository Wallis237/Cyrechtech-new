import type { ServiceRow } from "@/hooks/useContent";

type AdditionalService = Omit<ServiceRow, "num" | "sort_order">;

export const ADDITIONAL_SERVICES: AdditionalService[] = [
  {
    id: "company-logo-design",
    title: "Company Logo Design",
    description: "Create a distinctive company logo that makes your business recognisable and gives your brand a clear visual foundation.",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Design polished visual materials for your campaigns, products, and communications across print and digital channels.",
  },
  {
    id: "business-card-design",
    title: "Business Card Design",
    description: "Make a memorable first impression with professional business cards that reflect your brand and make it easy to connect.",
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    description: "Plan and create consistent social media content that helps your business engage the right audience and grow its community.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Reach the right customers online with a practical digital marketing strategy shaped around your goals and budget.",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description: "Build a cohesive brand identity with a clear visual direction and reusable assets for every customer touchpoint.",
  },
  {
    id: "ai-business-automation",
    title: "AI Solutions & Business Automation",
    description: "Use practical AI tools and automation to reduce repetitive work and improve the way your business operates.",
  },
  {
    id: "business-it-consultancy",
    title: "Business IT Consultancy",
    description: "Get clear, independent IT guidance to choose technology, plan improvements, and align systems with your business needs.",
  },
];
