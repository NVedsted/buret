# Burtavle-Notifikationer
Ved hjælp af dette projekt, så kan tutorer i Mat/Fys-Tutorgruppen modtage notifikationer
om hvad Buret synes om dem.

Det vil nok være smart at få dette ind på den rigtige hjemmeside. :sunglasses:

## Opsætning
Først skal der genereres en public og private key. Hvis du har installeret projektet,
så kan det gøres på følgende måde:

```
$ npx web-push generate-vapid-keys
```

Disse keys skal gives som environment variablerne `PRIVATE_KEY` og `PUBLIC_KEY`.

Projektet kræver også en Redis-instans. Her kan man give host og index med i
hhv. `REDIS_HOST` og `REDIS_DB` (denne er valgfri).

Hjemmesiden vil køre på port 8080 medmindre andet sættes via `PORT`.

Når dette er på plads, så kan projektet startes med:
```
$ node app.js
```

## Docker
Alternativt, kan private og public key smides i `.env`, og så kan man køre:

```
docker-compose up --build --detach
```

Dette vil sætte en Redis-instans op for én og expose port 8080, som man med 
fordel kan reverse proxy igennem fx nginx. Porten kan ændres i `docker-compose.yml`.
