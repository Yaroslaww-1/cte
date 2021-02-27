FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY ./frontend ./frontend

WORKDIR /usr/src/app/frontend

RUN npm install

RUN npm run build

RUN ls -al

FROM nginx:1.19-alpine

COPY --from=builder ./dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]