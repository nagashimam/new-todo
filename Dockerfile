FROM node
WORKDIR /work
COPY . /work
ARG DATABASE_URL
RUN apt-get update  \ 
  && apt-get clean \
  && apt-get install sqlite3 \
  && sqlite3 $DATABASE_URL < /work/prisma/migrations/newest_migration.sql \
  && npm install \
  && npx prisma generate \
  && npx nx build api --configuration=production
CMD ["node", "dist/apps/api/main.js"]

