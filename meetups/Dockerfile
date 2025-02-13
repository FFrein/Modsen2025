FROM node:18

WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt

COPY . .

EXPOSE 3000

CMD ["npm", "start"]