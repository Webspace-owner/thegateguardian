
-- SEO sitewide + robots/sitemap settings
CREATE TABLE public.seo_settings (
  id integer NOT NULL DEFAULT 1 PRIMARY KEY,
  default_meta_title text NOT NULL DEFAULT 'The Gate Guardian',
  default_meta_description text NOT NULL DEFAULT '',
  default_og_image text,
  twitter_handle text,
  twitter_card text NOT NULL DEFAULT 'summary_large_image',
  canonical_base_url text NOT NULL DEFAULT 'https://thegateguardian.lovable.app',
  robots_txt text NOT NULL DEFAULT 'User-agent: *
Allow: /

Sitemap: https://thegateguardian.lovable.app/sitemap.xml',
  org_jsonld jsonb NOT NULL DEFAULT '{"@context":"https://schema.org","@type":"Organization","name":"The Gate Guardian"}'::jsonb,
  google_site_verification text,
  google_analytics_id text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (id = 1)
);
GRANT SELECT ON public.seo_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.seo_settings TO authenticated;
GRANT ALL ON public.seo_settings TO service_role;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read seo" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "staff write seo" ON public.seo_settings FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
INSERT INTO public.seo_settings (id) VALUES (1) ON CONFLICT DO NOTHING;
CREATE TRIGGER tg_seo_updated BEFORE UPDATE ON public.seo_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Custom pages with section builder
CREATE TABLE public.pages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  published boolean NOT NULL DEFAULT false,
  meta_title text,
  meta_description text,
  og_image text,
  canonical_url text,
  json_ld jsonb,
  noindex boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  show_in_nav boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pages TO authenticated;
GRANT ALL ON public.pages TO service_role;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read pages" ON public.pages FOR SELECT
  USING (published = true OR public.is_staff(auth.uid()));
CREATE POLICY "staff write pages" ON public.pages FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER tg_pages_updated BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.page_sections (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id uuid NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  type text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX page_sections_page_idx ON public.page_sections(page_id, sort_order);
GRANT SELECT ON public.page_sections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_sections TO authenticated;
GRANT ALL ON public.page_sections TO service_role;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read sections" ON public.page_sections FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.pages p WHERE p.id = page_id AND (p.published OR public.is_staff(auth.uid()))));
CREATE POLICY "staff write sections" ON public.page_sections FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER tg_sections_updated BEFORE UPDATE ON public.page_sections
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- SEO fields on existing content tables
ALTER TABLE public.industries
  ADD COLUMN IF NOT EXISTS meta_title text,
  ADD COLUMN IF NOT EXISTS meta_description text,
  ADD COLUMN IF NOT EXISTS og_image text;

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS meta_title text,
  ADD COLUMN IF NOT EXISTS meta_description text,
  ADD COLUMN IF NOT EXISTS og_image text;
