-- 0. (optional) đảm bảo không còn guest
update profiles
set role = 'user'
where role = 'guest';

-- 1. Tạo enum mới
create type user_role_new as enum ('user', 'staff', 'admin');

-- 2. DROP default trước (🔥 QUAN TRỌNG)
alter table profiles
alter column role drop default;

-- 3. Đổi type
alter table profiles
alter column role type user_role_new
using role::text::user_role_new;

-- 4. Set lại default
alter table profiles
alter column role set default 'user';

-- 5. Xoá enum cũ
drop type user_role;

-- 6. Rename
alter type user_role_new rename to user_role;