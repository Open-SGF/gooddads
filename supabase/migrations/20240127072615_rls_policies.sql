-- https://www.postgresql.org/docs/current/sql-createpolicy.html

-----------------------------
-- users
-----------------------------
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "All users can view their own profile." ON users;
CREATE POLICY "All users can view their own profile." ON users FOR SELECT TO authenticated USING (auth.uid() = id );

DROP POLICY IF EXISTS "All users can update their own profiles." ON users;
CREATE POLICY "All users can update their own profiles." ON users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admin users can view all profiles." ON users;
CREATE POLICY "Admin users can view all profiles." ON users FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update any profile." ON users;
CREATE POLICY "Admin users can update any profile." ON users FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Intake users can create new profiles." ON auth.users;
CREATE POLICY "Intake users can create new profiles." ON auth.users FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"INTAKE"'::jsonb);

-----------------------------
-- class_assignments
-----------------------------
ALTER TABLE class_assignments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their class assignments." ON class_assignments;
CREATE POLICY "Users can view their class assignments." ON class_assignments FOR SELECT TO authenticated USING (auth.uid() = id );

DROP POLICY IF EXISTS "Admin users can query all class assignments." ON class_assignments;
CREATE POLICY "Admin users can query all class assignments." ON class_assignments FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update class assignments." ON class_assignments;
CREATE POLICY "Admin users can update class assignments." ON class_assignments FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create class assignments." ON class_assignments;
CREATE POLICY "Admin users can create class assignments." ON class_assignments FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

-----------------------------
-- dads
-----------------------------
ALTER TABLE dads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their dad profile." ON dads;
CREATE POLICY "Users can view their dad profile." ON dads FOR SELECT TO authenticated USING (auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can update their dad profile." ON dads;
CREATE POLICY "Users can update their dad profile." ON dads FOR UPDATE TO authenticated USING (auth.uid() = user_id );

DROP POLICY IF EXISTS "Admin users can query all dads." ON dads;
CREATE POLICY "Admin users can query all dads." ON dads FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all dad." ON dads;
CREATE POLICY "Admin users can update all dads." ON dads FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create dads." ON dads;
CREATE POLICY "Admin users can create dads." ON dads FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Intake users can create new dad profiles." ON auth.users;
CREATE POLICY "Intake users can create new dad profiles." ON auth.users FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"INTAKE"'::jsonb);

-----------------------------
-- quiz_assignments
-----------------------------
ALTER TABLE quiz_assignments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their quiz assignments." ON quiz_assignments;
CREATE POLICY "Users can view their quiz assignments." ON quiz_assignments FOR SELECT TO authenticated USING (auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can update their quiz assignments." ON quiz_assignments;
CREATE POLICY "Users can update their quiz assignments." ON quiz_assignments FOR UPDATE TO authenticated USING (auth.uid() = user_id );

DROP POLICY IF EXISTS "Admin users can query all quiz assignments." ON quiz_assignments;
CREATE POLICY "Admin users can query all quiz assignments." ON quiz_assignments FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all quiz assignments." ON quiz_assignments;
CREATE POLICY "Admin users can update all quiz assignments." ON quiz_assignments FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create quiz assignments." ON quiz_assignments;
CREATE POLICY "Admin users can create quiz assignments." ON quiz_assignments FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);


-----------------------------
-- regions
-----------------------------
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all regions." ON regions;
CREATE POLICY "Admin users can query all regions." ON regions FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all regions." ON regions;
CREATE POLICY "Admin users can update all regions." ON regions FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create regions." ON regions;
CREATE POLICY "Admin users can create regions." ON regions FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

-----------------------------
-- programs
-----------------------------
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all programs." ON programs;
CREATE POLICY "Admin users can query all programs." ON programs FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all programs." ON programs;
CREATE POLICY "Admin users can update all programs." ON programs FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create programs." ON programs;
CREATE POLICY "Admin users can create programs." ON programs FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

-----------------------------
-- program_assignments
-----------------------------
ALTER TABLE program_assignments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all program assignments." ON program_assignments;
CREATE POLICY "Admin users can query all program assignments." ON program_assignments FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all program assignments." ON program_assignments;
CREATE POLICY "Admin users can update all program assignments." ON program_assignments FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create program assignments." ON program_assignments;
CREATE POLICY "Admin users can create program assignments." ON program_assignments FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

-----------------------------
-- module_assignments
-----------------------------
ALTER TABLE module_assignments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all module assignments." ON module_assignments;
CREATE POLICY "Admin users can query all module assignments." ON module_assignments FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all module assignments." ON module_assignments;
CREATE POLICY "Admin users can update all module assignments." ON module_assignments FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create module assignments." ON module_assignments;
CREATE POLICY "Admin users can create module assignments." ON module_assignments FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

-----------------------------
-- modules
-----------------------------
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all modules." ON modules;
CREATE POLICY "Admin users can query all modules." ON modules FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all modules." ON modules;
CREATE POLICY "Admin users can update all modules." ON modules FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create modules." ON modules;
CREATE POLICY "Admin users can create modules." ON modules FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

-----------------------------
-- quizzes
-----------------------------
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all quizzes." ON quizzes;
CREATE POLICY "Admin users can query all quizzes." ON quizzes FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all modules." ON quizzes;
CREATE POLICY "Admin users can update all quizzes." ON quizzes FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create quizzes." ON quizzes;
CREATE POLICY "Admin users can create quizzes." ON quizzes FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

-----------------------------
-- quiz_questions
-----------------------------
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all quiz questions." ON quiz_questions;
CREATE POLICY "Admin users can query all quiz questions." ON quiz_questions FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all quiz questions." ON quiz_questions;
CREATE POLICY "Admin users can update all quiz questions." ON quiz_questions FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create quiz questions." ON quiz_questions;
CREATE POLICY "Admin users can create quiz questions." ON quiz_questions FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

-----------------------------
-- quiz_question_options
-----------------------------
ALTER TABLE quiz_question_options ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all quiz question options." ON quiz_question_options;
CREATE POLICY "Admin users can query all quiz question options." ON quiz_question_options FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all quiz question options." ON quiz_question_options;
CREATE POLICY "Admin users can update all quiz question options." ON quiz_question_options FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create quiz question options." ON quiz_question_options;
CREATE POLICY "Admin users can create quiz question options." ON quiz_question_options FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

-----------------------------
-- children
-----------------------------
ALTER TABLE children ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all children." ON children;
CREATE POLICY "Admin users can query all children." ON children FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all children." ON children;
CREATE POLICY "Admin users can update all children." ON children FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create children." ON children;
CREATE POLICY "Admin users can create children." ON children FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Intake users can create child profile." ON auth.users;
CREATE POLICY "Intake users can create child profile." ON auth.users FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"INTAKE"'::jsonb);

-----------------------------
-- responsible_party_assignments
-----------------------------
ALTER TABLE responsible_party_assignments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all responsible party assignments." ON responsible_party_assignments;
CREATE POLICY "Admin users can query all responsible party assignments." ON responsible_party_assignments FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all quiz responsible party assignments." ON responsible_party_assignments;
CREATE POLICY "Admin users can update all responsible party assignments." ON responsible_party_assignments FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create responsible party assignments." ON responsible_party_assignments;
CREATE POLICY "Admin users can create responsible party assignments." ON responsible_party_assignments FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Intake users can assign responsible parties." ON auth.users;
CREATE POLICY "Intake users can assign responsible parties." ON auth.users FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"INTAKE"'::jsonb);

-----------------------------
-- responsible_parties
-----------------------------
ALTER TABLE responsible_parties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can query all responsible parties." ON responsible_parties;
CREATE POLICY "Admin users can query all responsible parties." ON responsible_parties FOR SELECT USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can update all quiz responsible parties." ON responsible_parties;
CREATE POLICY "Admin users can update all responsible parties." ON responsible_parties FOR UPDATE USING (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);

DROP POLICY IF EXISTS "Admin users can create responsible parties." ON responsible_parties;
CREATE POLICY "Admin users can create responsible parties." ON responsible_parties FOR INSERT WITH CHECK (get_my_claim('userrole'::text) = '"ADMIN"'::jsonb);


