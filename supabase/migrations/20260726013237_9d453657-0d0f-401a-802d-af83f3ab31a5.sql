
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- (destructive drop skipped during port)
CREATE SCHEMA public;
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON SCHEMA public TO postgres, service_role;
