INSERT INTO public.team_members (name, role, description, image, sort_order)
SELECT
  'Sufeu Tallla Grace',
  'Client Experience & Technology Officer',
  'Combines client support with technology-driven solutions to enhance customer satisfaction, resolve issues, and build lasting relationships.',
  '/lovable-uploads/team-sufeu-tallla-grace.png',
  6
WHERE NOT EXISTS (
  SELECT 1
  FROM public.team_members
  WHERE lower(trim(name)) IN (lower('Sufeu Talla Grace'), lower('Sufeu Tallla Grace'))
);
