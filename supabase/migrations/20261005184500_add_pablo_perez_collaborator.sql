INSERT INTO public.collaborators (
  name,
  occupation,
  country,
  biography,
  image,
  sort_order
)
SELECT
  'Pablo Perez',
  'Partner of Cyrech Tech',
  'Spain',
  'Works for the Commonwealth Organisation.',
  '/lovable-uploads/collaborator-pablo-perez.png',
  1
WHERE NOT EXISTS (
  SELECT 1
  FROM public.collaborators
  WHERE lower(name) = lower('Pablo Perez')
);
