FROM 19.2.0-alpine3.15 as base

WORKDIR /app

COPY package.json package-lock.json tsconfig.json /app/

COPY src /app/src

RUN npm i
RUN npm run build
CMD npm start