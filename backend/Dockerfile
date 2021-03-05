FROM node:15-alpine

WORKDIR /usr/src/app

COPY ./backend ./backend
COPY ./cte-shared ./cte-shared

COPY ./tsconfig.base.json ./
COPY ./eslintrc.base.js ./
COPY ./.prettierrc ./
RUN npm ci

WORKDIR /usr/src/app/cte-shared
RUN npm ci

WORKDIR /usr/src/app/backend
RUN npm ci

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "start:prod"]