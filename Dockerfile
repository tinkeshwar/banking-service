# Use Node.js 22 on Alpine
FROM node:22-alpine

ENV APP_PATH=/usr/src/app
ENV TMP=/tmp

COPY . ${TMP}
RUN cd ${TMP} && npm install && npm run build && mkdir -p ${APP_PATH} && cp -a node_modules ${APP_PATH} && cp -a dist ${APP_PATH} && cp package*.json ${APP_PATH} && cp tsconfig.json ${APP_PATH}

WORKDIR ${APP_PATH}

# Run the application
CMD ["node", "-r", "tsconfig-paths/register", "dist/app.js"]

