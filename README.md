# Daylist

## Setup

`.env`:

```env
AUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3410/api/auth/
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
SUPABASE_URL=https://<projeto>.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
DATABASE_URL=postgresql://...   # só para backup/restore
```

`DATABASE_URL`: no Supabase, **Connect → Direct → Session pooler** (funciona em IPv4). A senha é a do banco, definida na criação do projeto (dá para resetar em Project Settings → Database).

Projeto novo: rode [supabase/migrations/20261112000000_initial.sql](supabase/migrations/20261112000000_initial.sql) no SQL Editor.

```sh
nvm use 24
yarn dev
```

## Backup e restore

Precisa do Docker rodando. Os comandos funcionam no PowerShell e no bash, a partir da raiz do projeto.

### Backup

Gera `backups/backup-AAAA-MM-DD-HHMM.sql` com os dados de `tags` e `tickets`:

```sh
docker run --rm --env-file .env -v "${PWD}/backups:/backups" postgres:17-alpine sh -c 'pg_dump "$DATABASE_URL" --data-only -t public.tags -t public.tickets -f /backups/backup-$(date +%F-%H%M).sql'
```

### Restore

**Apaga os dados atuais** das duas tabelas e carrega o backup, tudo numa transação: se der erro, nada muda. Troque o nome do arquivo:

```sh
docker run --rm --env-file .env -e FILE=backup-2026-11-12-1530.sql -v "${PWD}/backups:/backups" postgres:17-alpine sh -c 'psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction -c "truncate tags, tickets" -f "/backups/$FILE"'
```

Em um projeto Supabase novo, rode a migration antes do restore.

`backups/` está no `.gitignore`.
