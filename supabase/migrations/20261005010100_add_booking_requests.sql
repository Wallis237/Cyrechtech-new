ALTER TABLE public.services
ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '';

CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_title text NOT NULL CHECK (char_length(service_title) BETWEEN 1 AND 160),
  preferred_date date NOT NULL CHECK (preferred_date >= CURRENT_DATE),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  company_name text NOT NULL DEFAULT '' CHECK (char_length(company_name) <= 160),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 3 AND 40),
  country text NOT NULL CHECK (char_length(country) BETWEEN 1 AND 100),
  city text NOT NULL CHECK (char_length(city) BETWEEN 1 AND 100),
  preferred_contact_method text NOT NULL CHECK (preferred_contact_method IN ('WhatsApp', 'Phone', 'Email')),
  project_title text NOT NULL CHECK (char_length(project_title) BETWEEN 1 AND 180),
  project_description text NOT NULL CHECK (char_length(project_description) BETWEEN 1 AND 5000),
  objectives text NOT NULL CHECK (char_length(objectives) BETWEEN 1 AND 3000),
  requirements text NOT NULL DEFAULT '' CHECK (char_length(requirements) <= 3000),
  estimated_budget text NOT NULL DEFAULT '' CHECK (char_length(estimated_budget) <= 100),
  project_timeline text NOT NULL CHECK (char_length(project_timeline) BETWEEN 1 AND 160),
  additional_information text NOT NULL DEFAULT '' CHECK (char_length(additional_information) <= 3000),
  language text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'fr', 'es', 'de', 'pt')),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX booking_requests_created_at_idx
ON public.booking_requests (created_at DESC);

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.booking_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.booking_requests TO authenticated;

CREATE POLICY "Public may submit booking requests"
ON public.booking_requests FOR INSERT TO anon, authenticated
WITH CHECK (status = 'new');

CREATE POLICY "Admins manage booking requests"
ON public.booking_requests FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
