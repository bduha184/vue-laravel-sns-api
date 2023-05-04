FROM node:20-alpine3.16

WORKDIR /app
COPY . .
RUN apk update
RUN apk add bash

CMD ["yarn","dev"]
