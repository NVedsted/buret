FROM node:14

WORKDIR /app/

COPY package*.json ./

RUN npm ci --production

COPY . .

CMD ["node", "app.js"]
