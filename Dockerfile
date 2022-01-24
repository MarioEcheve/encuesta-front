# Stage 1
FROM node:14.18.3-alpine3.15 as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2
FROM nginx:1.13.12-alpine

COPY --from=node /usr/src/app/dist/app /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf