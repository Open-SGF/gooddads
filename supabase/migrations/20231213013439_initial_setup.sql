create table if not exists users
(
    id         uuid references auth.users not null primary key,
    updated_at timestamp with time zone,
    username   text unique,
    full_name  text,
    avatar_url text,

    constraint username_length check (char_length(username) >= 3)
);

alter table users
    enable row level security;

DROP POLICY IF EXISTS "Users can insert their own profile." ON users;
create policy "Users can insert their own profile." on users
    for insert with check (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile." ON users;
create policy "Users can update own profile." on users
    for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
create function public.handle_new_user()
    returns trigger as $$
begin
insert into public.users (id, full_name, avatar_url)
values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
return new;
end;
$$ language plpgsql security definer;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
    values ('avatars', 'avatars')
    ON CONFLICT DO NOTHING;

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
DROP POLICY IF EXISTS "Anyone can upload an avatar." ON storage.objects;
create policy "Anyone can upload an avatar." on storage.objects
    for insert with check (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Anyone can update their own avatar." ON storage.objects;
create policy "Anyone can update their own avatar." on storage.objects
    for update using (auth.uid() = owner) with check (bucket_id = 'avatars');

CREATE TYPE maritalStatus AS ENUM ('single', 'married', 'divorced', 'widowed');
CREATE TYPE ethnicityEnum AS ENUM ('white','africanAmerican','nativeAmerican', 'asian','pacificIslander');
CREATE TYPE quizType AS ENUM ('open', 'multipleChoice', 'check');
CREATE TYPE roleType AS ENUM ('caseWorker', 'probationOfficer');

create table dads if not exists dads (
	id UUID PRIMARY KEY,
	user_id UUID NOT NULL,
	street_address VARCHAR(100),
	city VARCHAR(50),
	zip_code VARCHAR(5),
	employer VARCHAR(100),
	cell_phone_number VARCHAR(11),
	home_phone_number VARCHAR(11),
	work_phone_number VARCHAR(11),
	alt_contact_number VARCHAR(11),
	marital_status maritalStatus,
	ethnicity ethnicityEnum,
	monthly_child_support FLOAT
);

create table users_on_tenants if not exists users_on_tenants (
	id UUID PRIMARY KEY,
	user_id UUID NOT NULL,
	tenant_id UUID NOT NULL
);

create table tenants if not exists tenants (
	id UUID PRIMARY KEY,
	description VARCHAR(1000) NOT NULL,
	--tenant_id UUID NOT NULL
);

create table programs if not exists programs (
	id UUID PRIMARY KEY,
	description VARCHAR(1000) NOT NULL,
	length INTEGER NOT NULL
);

create table program_assignments if not exists program_assignments (
	id UUID PRIMARY KEY,
	program_id UUID NOT NULL,
	tenant_id UUID NOT NULL,
	start_date DATE NOT NULL,
	completed BOOLEAN NOT NULL
);

create table module_assignments if not exists module_assignments (
	id UUID PRIMARY KEY,
	module_id UUID NOT NULL,
	event_date DATE NOT NULL,
	description VARCHAR(1000) NOT NULL
);

create table modules if not exists modules (
	id UUID PRIMARY KEY,
	program_id UUID NOT NULL,
	description VARCHAR(1000) NOT NULL
);

create table quizzes if not exists quizzes (
	id UUID PRIMARY KEY,
	module_id UUID NOT NULL,
	description VARCHAR(1000) NOT NULL
);

create table quiz_questions if not exists quiz_questions (
	id UUID PRIMARY KEY,
	quiz_id UUID NOT NULL,
	question VARCHAR(1000) NOT NULL,
	type quizType NOT NULL
);

create table quiz_question_options if not exists quiz_question_options (
	id UUID PRIMARY KEY,
	quiz_question_id UUID NOT NULL,
	answer VARCHAR(1000) NOT NULL,
	is_correct BOOLEAN NOT NULL
);

create table quiz_question_responses if not exists quiz_question_responses (
	id UUID PRIMARY KEY,
	user_id UUID NOT NULL,
	quiz_question_id UUID NOT NULL,
	quiz_question_option_id UUID,
	answer VARCHAR(1000) NOT NULL,
	is_correct BOOLEAN NOT NULL
);

create table children if not exists children (
	id UUID PRIMARY KEY,
	dad_id UUID NOT NULL,
	name TEXT NOT NULL,
	--age INTEGER NOT NULL, --Do we really need age? Not going to be updated
	date_of_birth DATE NOT NULL,
	contact VARCHAR(200) NOT NULL,
	child_support FLOAT NOT NULL
);

create table responsible_party_assignments if not exists responsible_party_assignments (
	id UUID PRIMARY KEY,
	responsible_party_id UUID NOT NULL,
	dad_id UUID NOT NULL
);

create table responsible_parties if not exists responsible_parties (
	id UUID PRIMARY KEY,
	user_id UUID NOT NULL,
	phone_number VARCHAR(11) NOT NULL,
	--name VARCHAR(100) NOT NULL, --Already tracked in user table
	role roleType NOT NULL
);
