CREATE OR REPLACE FUNCTION public.__ams_apply(sql text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $fn$ BEGIN EXECUTE sql; END; $fn$;
REVOKE ALL ON FUNCTION public.__ams_apply(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.__ams_apply(text) TO postgres, service_role, authenticator;