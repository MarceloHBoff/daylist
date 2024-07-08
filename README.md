npx prisma studio  
npx prisma migrate dev

---

### Backup

```
docker exec -t netuno-postgres-1 pg_dumpall -c -U postgres > daylist.sql
```

### Restore

```
cat daylist.sql | docker exec -i netuno-postgres-1 psql -U postgres
```
