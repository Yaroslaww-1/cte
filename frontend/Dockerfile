FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY ./ ./ 

RUN npm install

RUN npm run build

FROM nginx:1.19-alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]