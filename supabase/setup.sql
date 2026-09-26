-- ESHELON საიტის ადმინ პანელი: ერთხელ გაუშვი Supabase-ის SQL Editor-ში.

create table if not exists public.site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "site_content public read" on public.site_content;
create policy "site_content public read" on public.site_content
  for select using (true);

drop policy if exists "site_content admin write" on public.site_content;
create policy "site_content admin write" on public.site_content
  for all to authenticated
  using (lower(auth.jwt() ->> 'email') in ('kalmakhelidzelazare@gmail.com'))
  with check (lower(auth.jwt() ->> 'email') in ('kalmakhelidzelazare@gmail.com'));

-- სურათების საცავი
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

drop policy if exists "site-images admin insert" on storage.objects;
create policy "site-images admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-images' and lower(auth.jwt() ->> 'email') in ('kalmakhelidzelazare@gmail.com'));

drop policy if exists "site-images admin update" on storage.objects;
create policy "site-images admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-images' and lower(auth.jwt() ->> 'email') in ('kalmakhelidzelazare@gmail.com'));

drop policy if exists "site-images admin delete" on storage.objects;
create policy "site-images admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-images' and lower(auth.jwt() ->> 'email') in ('kalmakhelidzelazare@gmail.com'));
