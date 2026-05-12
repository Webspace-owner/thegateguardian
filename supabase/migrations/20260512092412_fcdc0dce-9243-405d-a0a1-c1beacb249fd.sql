
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','editor'))
$$;

CREATE POLICY "users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Site settings (singleton)
CREATE TABLE public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  company_name TEXT NOT NULL DEFAULT 'The Gate Guardian',
  tagline TEXT NOT NULL DEFAULT 'Guarding Your Data, Safeguarding Your Future',
  hero_subtitle TEXT NOT NULL DEFAULT 'Empowering Security, Ensuring Trust',
  hero_image_url TEXT,
  about_title TEXT NOT NULL DEFAULT 'The Gate Guardian Group',
  about_body TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '+20 1555 555 7880',
  whatsapp TEXT NOT NULL DEFAULT '+201555557880',
  contact_email TEXT NOT NULL DEFAULT 'info@thegateguardian.com',
  address TEXT,
  logo_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT singleton CHECK (id = 1)
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "staff update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER tg_site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
INSERT INTO public.site_settings (id, about_body) VALUES (1, 'We hold extensive experience in consulting, training, coaching, and project management for large-scale initiatives. Capitalizing on our knowledge and partnerships with leading technology players, our solutions serve a diversity of industries — helping organizations cut complexity, increase utilization, maximize ROI, and beat time-to-market.');

-- Generic content table policy template
CREATE OR REPLACE FUNCTION public.staff_only_policy(tbl regclass)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', tbl);
  EXECUTE format('CREATE POLICY "public read" ON %s FOR SELECT USING (true)', tbl);
  EXECUTE format('CREATE POLICY "staff write" ON %s FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()))', tbl);
END; $$;

-- Industries
CREATE TABLE public.industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
SELECT public.staff_only_policy('public.industries');
INSERT INTO public.industries (name, icon, sort_order) VALUES
  ('Manufacturing','factory',1),('Financial Services','landmark',2),('Government','building-2',3),
  ('Commercial','store',4),('Oil & Gas','fuel',5),('Real Estate','building',6),
  ('Data Centers','server',7),('Educational Facilities','graduation-cap',8),('Shopping Malls','shopping-bag',9);

-- Scope items
CREATE TABLE public.scope_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
SELECT public.staff_only_policy('public.scope_items');
INSERT INTO public.scope_items (title, sort_order) VALUES
 ('Objectives of the work to be carried out',1),
 ('Description of work',2),
 ('Preliminary stage criteria',3),
 ('Design work criteria',4),
 ('Design drawings',5),
 ('Bill of quantities and cost estimate',6),
 ('Specifications and tender documents',7),
 ('Evaluation of tenders',8),
 ('Supervision of works & contract administration',9),
 ('Materials and workmanship',10),
 ('Submission of reports and schedules',11),
 ('Completion certificate and as-installed drawings',12),
 ('Project coordination',13),
 ('Remuneration procedure',14),
 ('Agreement',15),
 ('Work follow-up and project acceptance',16),
 ('Technology transfer / training programmes',17);

-- Gallery
CREATE TABLE public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
SELECT public.staff_only_policy('public.gallery_items');

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
SELECT public.staff_only_policy('public.testimonials');

-- Blog posts
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published" ON public.blog_posts FOR SELECT USING (published = true OR public.is_staff(auth.uid()));
CREATE POLICY "staff write blog" ON public.blog_posts FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER tg_blog_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Contact submissions
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone submit" ON public.contact_submissions FOR INSERT WITH CHECK (
  length(name) BETWEEN 1 AND 100
  AND length(email) BETWEEN 3 AND 255
  AND length(message) BETWEEN 1 AND 2000
);
CREATE POLICY "staff read submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff update submissions" ON public.contact_submissions FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "admin delete submissions" ON public.contact_submissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images','site-images', true) ON CONFLICT DO NOTHING;
CREATE POLICY "public read site-images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "staff upload site-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images' AND public.is_staff(auth.uid()));
CREATE POLICY "staff update site-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-images' AND public.is_staff(auth.uid()));
CREATE POLICY "staff delete site-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-images' AND public.is_staff(auth.uid()));
