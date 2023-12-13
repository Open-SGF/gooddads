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
