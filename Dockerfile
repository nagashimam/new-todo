FROM node
WORKDIR /work
COPY . /work
RUN npm install
RUN npx nx build api --configuration=production
CMD ["node", "dist/apps/api/main.js"]

