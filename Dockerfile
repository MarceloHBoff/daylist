FROM node:18

ENV TZ=America/Sao_Paulo

WORKDIR /app

COPY package*.json ./
COPY ./prisma prisma

COPY . .

RUN npm install

USER root
RUN chmod -R u+w .
RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm run build

EXPOSE 3410

CMD npm run start