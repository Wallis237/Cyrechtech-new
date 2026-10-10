CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 3 AND 40),
  location text NOT NULL CHECK (char_length(location) BETWEEN 2 AND 160),
  opportunity_type text NOT NULL CHECK (opportunity_type IN ('Employment', 'Commission-based work')),
  service_title text NOT NULL CHECK (char_length(service_title) BETWEEN 1 AND 160),
  experience text NOT NULL CHECK (char_length(experience) BETWEEN 1 AND 80),
  availability text NOT NULL DEFAULT '' CHECK (char_length(availability) <= 120),
  portfolio_url text NOT NULL DEFAULT '' CHECK (char_length(portfolio_url) <= 2048),
  message text NOT NULL CHECK (char_length(message) BETWEEN 20 AND 3000),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX job_applications_created_at_idx
ON public.job_applications (created_at DESC);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.job_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.job_applications TO authenticated;

CREATE POLICY "Public may submit job applications"
ON public.job_applications FOR INSERT TO anon, authenticated
WITH CHECK (status = 'new');

CREATE POLICY "Admins manage job applications"
ON public.job_applications FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
