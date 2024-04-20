FROM node:20

WORKDIR /app

COPY prisma prisma
COPY package* .

RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 3001

CMD ["node", "dist/server.js"]