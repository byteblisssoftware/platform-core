CREATE SCHEMA IF NOT EXISTS public;
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON SCHEMA public TO postgres, service_role;
CREATE OR REPLACE FUNCTION public.__ams_apply(sql text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $fn$ BEGIN EXECUTE sql; END; $fn$;
REVOKE ALL ON FUNCTION public.__ams_apply(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.__ams_apply(text) TO postgres, service_role, sandbox_exec;