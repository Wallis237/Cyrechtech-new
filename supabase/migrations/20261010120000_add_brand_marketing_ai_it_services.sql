INSERT INTO public.services (num, title, description, sort_order)
SELECT additions.num, additions.title, additions.description, additions.sort_order
FROM (VALUES
  ('08', 'Company Logo Design', 'Create a distinctive company logo that makes your business recognisable and gives your brand a clear visual foundation.', 8),
  ('09', 'Graphic Design', 'Design polished visual materials for your campaigns, products, and communications across print and digital channels.', 9),
  ('10', 'Business Card Design', 'Make a memorable first impression with professional business cards that reflect your brand and make it easy to connect.', 10),
  ('11', 'Social Media Marketing', 'Plan and create consistent social media content that helps your business engage the right audience and grow its community.', 11),
  ('12', 'Digital Marketing', 'Reach the right customers online with a practical digital marketing strategy shaped around your goals and budget.', 12),
  ('13', 'Brand Identity', 'Build a cohesive brand identity with a clear visual direction and reusable assets for every customer touchpoint.', 13),
  ('14', 'AI Solutions & Business Automation', 'Use practical AI tools and automation to reduce repetitive work and improve the way your business operates.', 14),
  ('15', 'Business IT Consultancy', 'Get clear, independent IT guidance to choose technology, plan improvements, and align systems with your business needs.', 15)
) AS additions(num, title, description, sort_order)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.services existing
  WHERE lower(existing.title) = lower(additions.title)
);
