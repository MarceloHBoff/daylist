create table public.tags (
  "id"          text primary key default gen_random_uuid()::text,
  "description" text not null,
  "color"       text not null,
  "createdAt"   timestamptz not null default now(),
  "order"       integer not null default 1,
  "userId"      text not null
);

create table public.tickets (
  "id"          text primary key default gen_random_uuid()::text,
  "description" text not null,
  "done"        boolean not null default false,
  "date"        timestamptz,
  "createdAt"   timestamptz not null default now(),
  "order"       integer not null default 1,
  "userId"      text not null,
  "tagId"       text references public.tags ("id") on delete cascade on update cascade
);

create index tags_user_id_idx on public.tags ("userId");
create index tickets_user_id_date_idx on public.tickets ("userId", "date");
create index tickets_tag_id_idx on public.tickets ("tagId");

alter table public.tags enable row level security;
alter table public.tickets enable row level security;

grant all on public.tags, public.tickets to service_role;
