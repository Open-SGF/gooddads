-- https://www.postgresql.org/docs/current/sql-createpolicy.html

-----------------------------
-- users
-----------------------------
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "All users can view their own profile." ON users;
CREATE POLICY "All users can view their own profile." ON users FOR SELECT TO authenticated USING (auth.uid() = id );

DROP POLICY IF EXISTS "All users can update their own profiles." ON users;
CREATE POLICY "All users can update their own profiles." ON users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admin users can update any profile." ON users;
CREATE POLICY "Admin users can update any profile." ON users FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can view any profile" ON users;
CREATE POLICY "Admin users can view any profile" ON users FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Intake users can create new profiles." ON users;
CREATE POLICY "Intake users can create new profiles." ON users FOR INSERT USING (get_my_claim('userrole'::text) = '"INTAKE"'::jsonb);
