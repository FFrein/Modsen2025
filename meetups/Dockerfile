FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]