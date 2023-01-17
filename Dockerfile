FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm fund
RUN npm audit fix
RUN npm install sax
RUN npm update
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]
EXPOSE 80