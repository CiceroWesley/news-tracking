FROM node:18.15-alpine
WORKDIR /home/node/app
COPY package.json package-lock.json ./
RUN npm install
EXPOSE 5173
CMD [ "npm", "run", "dev" ]