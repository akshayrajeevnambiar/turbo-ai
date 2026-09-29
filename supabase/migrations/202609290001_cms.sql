-- Turbo AI CMS. Apply in a new Supabase project before enabling VITE_CMS_ENABLED.
-- No existing website data or tables are removed.

create table if not exists public.cms_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.cms_admins enable row level security;
revoke all on public.cms_admins from anon, authenticated;
grant select on public.cms_admins to authenticated;
create policy "admins can read their own membership" on public.cms_admins
  for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.is_cms_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.cms_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.is_cms_admin() from public;
grant execute on function public.is_cms_admin() to authenticated;

create table if not exists public.cms_entries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('page', 'product', 'industry', 'solution', 'blog')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(trim(title)) > 0),
  status text not null default 'draft' check (status in ('draft', 'published')),
  summary text not null default '',
  hero_title text not null default '',
  hero_description text not null default '',
  hero_image text not null default '',
  body text not null default '',
  sections jsonb not null default '[]'::jsonb check (jsonb_typeof(sections) = 'array'),
  features text[] not null default '{}',
  benefits text[] not null default '{}',
  related_products text[] not null default '{}',
  related_industries text[] not null default '{}',
  cta_text text not null default '',
  cta_url text not null default '',
  seo_title text not null default '',
  seo_description text not null default '',
  seo_keywords text not null default '',
  canonical_url text not null default '',
  og_title text not null default '',
  og_description text not null default '',
  og_image text not null default '',
  robots text not null default 'index,follow' check (robots in ('index,follow', 'noindex,nofollow')),
  author text not null default 'Turbo AI',
  category text not null default '',
  tags text[] not null default '{}',
  reading_time integer not null default 0 check (reading_time >= 0),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(kind, slug)
);
create index if not exists cms_entries_public_idx on public.cms_entries(kind, status, published_at desc);
create index if not exists cms_entries_updated_idx on public.cms_entries(updated_at desc);

create or replace function public.cms_set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger cms_entries_updated before update on public.cms_entries
  for each row execute function public.cms_set_updated_at();

alter table public.cms_entries enable row level security;
revoke all on public.cms_entries from anon, authenticated;
grant select on public.cms_entries to anon, authenticated;
grant insert, update, delete on public.cms_entries to authenticated;
create policy "published entries are public" on public.cms_entries
  for select to anon, authenticated using (status = 'published');
create policy "admins read all entries" on public.cms_entries
  for select to authenticated using ((select public.is_cms_admin()));
create policy "admins create entries" on public.cms_entries
  for insert to authenticated with check ((select public.is_cms_admin()));
create policy "admins edit entries" on public.cms_entries
  for update to authenticated using ((select public.is_cms_admin())) with check ((select public.is_cms_admin()));
create policy "admins delete entries" on public.cms_entries
  for delete to authenticated using ((select public.is_cms_admin()));

create table if not exists public.cms_redirects (
  old_path text primary key,
  target_path text not null,
  entry_id uuid not null references public.cms_entries(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists cms_redirects_entry_idx on public.cms_redirects(entry_id);
alter table public.cms_redirects enable row level security;
revoke all on public.cms_redirects from anon, authenticated;
grant select on public.cms_redirects to anon, authenticated;
create policy "published redirect targets are public" on public.cms_redirects
  for select to anon, authenticated using (
    exists (select 1 from public.cms_entries where id = entry_id and status = 'published')
  );

create or replace function public.cms_entry_path(entry_kind text, entry_slug text)
returns text language sql immutable set search_path = '' as $$
  select case when entry_kind = 'page' then case when entry_slug = 'home' then '/' else '/' || entry_slug end
    when entry_kind = 'solution' then '/solutions/' || entry_slug
    when entry_kind = 'industry' then '/industries/' || entry_slug
    when entry_kind = 'product' then '/products/' || entry_slug
    else '/blog/' || entry_slug end;
$$;
create or replace function public.cms_record_slug_redirect()
returns trigger language plpgsql security definer set search_path = '' as $$
declare new_path text;
begin
  if old.slug is distinct from new.slug or old.kind is distinct from new.kind then
    new_path := public.cms_entry_path(new.kind, new.slug);
    update public.cms_redirects set target_path = new_path where entry_id = new.id;
    insert into public.cms_redirects(old_path, target_path, entry_id)
      values (public.cms_entry_path(old.kind, old.slug), new_path, new.id)
      on conflict (old_path) do update set target_path = excluded.target_path, entry_id = excluded.entry_id;
  end if;
  return new;
end;
$$;
create trigger cms_entries_redirect after update of slug, kind on public.cms_entries
  for each row execute function public.cms_record_slug_redirect();

create table if not exists public.cms_media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  path text not null unique,
  alt text not null default '',
  category text not null default '',
  created_at timestamptz not null default now()
);
alter table public.cms_media enable row level security;
revoke all on public.cms_media from anon, authenticated;
grant select on public.cms_media to anon, authenticated;
grant insert, update, delete on public.cms_media to authenticated;
create policy "media metadata is public" on public.cms_media
  for select to anon, authenticated using (true);
create policy "admins create media metadata" on public.cms_media
  for insert to authenticated with check ((select public.is_cms_admin()));
create policy "admins edit media metadata" on public.cms_media
  for update to authenticated using ((select public.is_cms_admin())) with check ((select public.is_cms_admin()));
create policy "admins delete media metadata" on public.cms_media
  for delete to authenticated using ((select public.is_cms_admin()));

create table if not exists public.cms_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create trigger cms_settings_updated before update on public.cms_settings
  for each row execute function public.cms_set_updated_at();
alter table public.cms_settings enable row level security;
revoke all on public.cms_settings from anon, authenticated;
grant select on public.cms_settings to anon, authenticated;
grant insert, update, delete on public.cms_settings to authenticated;
create policy "admins manage settings" on public.cms_settings
  for all to authenticated using ((select public.is_cms_admin())) with check ((select public.is_cms_admin()));
create policy "public appearance defaults" on public.cms_settings
  for select to anon, authenticated using (key in ('site_name', 'default_og_image'));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-media', 'cms-media', true, 8388608,
  array['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif'])
on conflict (id) do nothing;

create policy "cms admins list media files" on storage.objects
  for select to authenticated using (bucket_id = 'cms-media' and (select public.is_cms_admin()));
create policy "cms admins upload media files" on storage.objects
  for insert to authenticated with check (bucket_id = 'cms-media' and (select public.is_cms_admin()));
create policy "cms admins delete media files" on storage.objects
  for delete to authenticated using (bucket_id = 'cms-media' and (select public.is_cms_admin()));
