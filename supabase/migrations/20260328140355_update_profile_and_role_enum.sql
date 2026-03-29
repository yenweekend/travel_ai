update profiles
set role = 'user'
where role = 'staff';

create type user_role_new as enum ('user', 'admin');
create type user_status as enum ('active', 'banned');

alter table profiles
alter column role drop default;

alter table profiles
alter column role type user_role_new
using role::text::user_role_new;

alter table profiles
alter column role set default 'user';

drop type user_role;

alter type user_role_new rename to user_role;

-- thay đổi các trường bảng profiles
alter table profiles
add column if not exists email text,
add column if not exists full_name text,
add column if not exists phone text,
add column if not exists avatar_url text,
add column if not exists status user_status default 'active',
add column if not exists created_at timestamptz default now(),
add column if not exists updated_at timestamptz default now();