FROM node:21-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./kysely.config.ts .
COPY ./src/lib/server/db/migrations ./src/lib/server/db/migrations

RUN npm ci kysely kysely-ctl
ENTRYPOINT ["npm", "run", "db", "migrate", "latest", "--", "--all"]
