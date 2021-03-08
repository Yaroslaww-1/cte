FROM node:12-alpine as builder

WORKDIR /usr/src/app

# Copy yarn
COPY .yarnrc.yml .
COPY .yarn/plugins .yarn/plugins
COPY .yarn/releases .yarn/releases

# Copy configs' base files required for this image
COPY tsconfig.base.json .
COPY vetur.config.js .

# Copy package.json files
COPY package.json .
COPY yarn.lock .
COPY ./frontend/package.json ./frontend/
COPY ./cte-shared/package.json ./cte-shared/

# Install dependencies (node_modules)
RUN mkdir node_modules/
# Manually link workspaces
RUN ln -nsf ./backend node_modules/backend
RUN ln -nsf ./cte-shared node_modules/cte-shared
RUN yarn workspaces focus --production --all

# Copy source code
COPY ./frontend ./frontend
COPY ./cte-shared ./cte-shared

# Build image
WORKDIR /usr/src/app/frontend

ENV NODE_ENV=production
RUN yarn build:prod

FROM nginx:1.19-alpine

COPY --from=builder /usr/src/app/frontend/dist /usr/share/nginx/html

COPY --from=builder /usr/src/app/frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]