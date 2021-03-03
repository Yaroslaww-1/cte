FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY ./frontend ./frontend
COPY ./cte-shared ./cte-shared

COPY ./tsconfig.base.json ./
COPY ./eslintrc.base.js ./
COPY ./vetur.config.js ./

WORKDIR /usr/src/app/cte-shared
RUN npm install

WORKDIR /usr/src/app/frontend
RUN npm install
RUN npm run build

FROM nginx:1.19-alpine

COPY --from=builder /usr/src/app/frontend/dist /usr/share/nginx/html

COPY --from=builder /usr/src/app/frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]