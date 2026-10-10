CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin' AND user_id = uid);
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin');
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  categories text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  demo_link text NOT NULL DEFAULT '',
  github_link text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are publicly viewable" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gallery is publicly viewable" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Admins manage gallery" ON public.gallery_items FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER gallery_updated_at BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  num text NOT NULL DEFAULT '01',
  title text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are publicly viewable" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins manage services" ON public.services FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  level integer NOT NULL DEFAULT 80,
  icon text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.skills TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.skills TO authenticated;
GRANT ALL ON public.skills TO service_role;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Skills are publicly viewable" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admins manage skills" ON public.skills FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.site_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  hero_title text NOT NULL DEFAULT '',
  hero_subtitle text NOT NULL DEFAULT '',
  about_text text NOT NULL DEFAULT '',
  contact_email text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  linkedin text NOT NULL DEFAULT '',
  github text NOT NULL DEFAULT '',
  facebook text NOT NULL DEFAULT '',
  instagram text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are publicly viewable" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_settings (id, hero_title, hero_subtitle, about_text, contact_email, location, linkedin, github, facebook, instagram)
VALUES (true,
 'Empowering Brands Through Creative Solutions',
 'From Cameroon to the world. I''m Tarshi Williams — a full-stack developer crafting high-performance digital experiences with a fusion of precision engineering and artistic mastery.',
 'Hello! I am Tarshi Williams, a passionate and ambitious individual from Cameroon with a dream of becoming a Software Engineer and Website Developer. My journey is a synthesis of Information Technology, Physics, and Chemistry.',
 'tarshiwilliams476@gmail.com',
 'Cameroon',
 'https://www.linkedin.com/in/tarshiwilliams',
 'https://github.com/Wallis237',
 'https://www.facebook.com/tarshi.william',
 'https://www.instagram.com/tarshiwilliams?igsh=YzkxczVjY29pcm42');

INSERT INTO public.services (num, title, sort_order) VALUES
 ('01','UI/UX Strategy',1),('02','Web Systems',2),('03','Game Architecture',3),('04','Cloud Solutions',4);

INSERT INTO public.skills (name, level, icon, sort_order) VALUES
 ('Python',90,'🐍',1),('JavaScript',85,'JS',2),('HTML / CSS',95,'◇',3),('Logic & Systems',88,'◆',4);

INSERT INTO public.gallery_items (title, category, image, sort_order) VALUES
 ('Nature Photography','Photography','https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80',1),
 ('Landscape','Photography','/lovable-uploads/e85332d2-9f30-40f5-9d44-f9bf93ebb34e.png',2),
 ('Brand Logo Design','Graphic Design','/lovable-uploads/3028df71-0167-4088-a78f-40507a4ea535.png',3),
 ('Website Mockup','Web Design','/lovable-uploads/355fa138-0d54-4077-ae28-5cca71cde6d5.png',4),
 ('Portrait','Photography','/lovable-uploads/66c21b98-7aa0-4de3-8254-61f261dc0c8d.png',5),
 ('Studio Shoot','Photography','https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80',6);

INSERT INTO public.projects (title, description, image, categories, tags, demo_link, github_link, featured, sort_order) VALUES
 ('E-Commerce Platform','A full-featured online store with payment processing and inventory management.','/lovable-uploads/bfecc9f4-5d72-4357-8d01-57d515ca89b0.png','{software,web}','{React,Tailwind,"Framer Motion"}','https://demoforcel.netlify.app/','https://github.com/Wallis237',true,1),
 ('Portfolio Website','Responsive portfolio website with animated sections and filtering gallery.','/lovable-uploads/033930a6-c382-4cc3-ba0e-9f3e9c7bfd31.png','{web}','{TypeScript}','https://demoforcel.netlify.app/','https://github.com/Wallis237',false,2),
 ('Photography Portfolio','Elegant photography showcase with lightbox gallery and smooth transitions.','/lovable-uploads/IMG-20250501-WA0034.jpg','{photography}','{React,GSAP}','https://demoforcel.netlify.app/','',false,3),
 ('Brand Identity Pack','Complete brand identity including logo, color palette, and marketing materials.','/lovable-uploads/Purple White Orange Modern Geometric Digital Marketing Training Banner_20250430_130331_0000.png','{design}','{Branding,Design}','https://demoforcel.netlify.app/','',false,4),
 ('Mobile Application','Cross-platform mobile app with user authentication and cloud synchronization.','/lovable-uploads/Screenshot_20250707-133307.png','{software}','{"React Native"}','https://casino-insight-guru.vercel.app/','',false,5),
 ('UI/UX Design System','Comprehensive design system with component library and usage guidelines.','/lovable-uploads/0d30ad6b-398e-41f3-81d9-091bcccc1dd0.png','{design,web}','{Figma,System}','https://demoforcel.netlify.app/','',false,6),
 ('Chat App','A full chat app where users create accounts and message each other with profile uploads.','/lovable-uploads/e85332d2-9f30-40f5-9d44-f9bf93ebb34e.png','{software,web}','{Realtime,React}','https://demoforcel.netlify.app/','https://github.com/Wallis237',false,7),
 ('Client Intake','A full-featured online questionnaire to help me understand client demands.','/lovable-uploads/3028df71-0167-4088-a78f-40507a4ea535.png','{software,web}','{Forms,TypeScript}','https://client-intake-silk.vercel.app/','https://github.com/Wallis237',false,8);