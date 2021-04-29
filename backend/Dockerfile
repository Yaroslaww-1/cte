FROM node:15-alpine

WORKDIR /usr/src/app

# Copy yarn
COPY .yarnrc.yml .
COPY .yarn/plugins .yarn/plugins
COPY .yarn/releases .yarn/releases

# Copy configs' base files required for this image
COPY tsconfig.base.json .

# Copy package.json files
COPY package.json yarn.lock ./
COPY ./backend/package.json ./backend/
COPY ./cte-shared/package.json ./cte-shared/

# Install dependencies (node_modules)
RUN mkdir node_modules/
# Manually link workspaces
RUN ln -nsf ./backend node_modules/backend
RUN ln -nsf ./cte-shared node_modules/cte-shared
RUN yarn workspaces focus --production --all

# Copy source code
COPY ./backend/ ./backend/
COPY ./cte-shared/ ./cte-shared/

# Build image
WORKDIR /usr/src/app/backend

RUN yarn build

CMD ["yarn", "start:prod"]
