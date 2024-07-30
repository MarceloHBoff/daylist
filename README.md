npx prisma studio  
npx prisma migrate dev

---

### Backup

```
docker exec -t daylist-postgres-1 pg_dumpall -c -U postgres > daylist.sql
```

### Restore

```
cat daylist.sql | docker exec -i daylist-postgres-1 psql -U postgres
```
