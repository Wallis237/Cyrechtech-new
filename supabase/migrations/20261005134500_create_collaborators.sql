CREATE TABLE public.collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  occupation text NOT NULL DEFAULT '' CHECK (char_length(occupation) <= 160),
  country text NOT NULL DEFAULT '' CHECK (char_length(country) <= 100),
  biography text NOT NULL DEFAULT '' CHECK (char_length(biography) <= 2000),
  image text NOT NULL DEFAULT '' CHECK (char_length(image) <= 2048),
  profile_url text NOT NULL DEFAULT '' CHECK (char_length(profile_url) <= 2048),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX collaborators_sort_order_idx
ON public.collaborators (sort_order, name);

ALTER TABLE public.collaborators ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.collaborators TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.collaborators TO authenticated;

CREATE POLICY "Public may view collaborators"
ON public.collaborators FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins manage collaborators"
ON public.collaborators FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
