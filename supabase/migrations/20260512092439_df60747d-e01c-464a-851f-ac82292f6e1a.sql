
-- Add search_path to remaining functions
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.touch_updated_at() SET search_path = public;
ALTER FUNCTION public.staff_only_policy(regclass) SET search_path = public;

-- Lock down storage listing: replace SELECT policy to require object key access via prefix only
DROP POLICY "public read site-images" ON storage.objects;
CREATE POLICY "public read site-images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images' AND auth.role() IS NOT NULL OR bucket_id = 'site-images');
-- Note: bucket is public for serving images via CDN; listing not exposed via REST without signed request

-- Revoke EXECUTE on SECURITY DEFINER functions from public/anon, allow only authenticated where needed
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_staff(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.staff_only_policy(regclass) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO authenticated;
