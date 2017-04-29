# Dockerfile for musician-app
# Adapted from : https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:boron

MAINTAINER Sydney Hauke

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app
COPY musician_app/ /usr/src/app/

# Install app dependencies
RUN npm install --save uuid dgram

ENTRYPOINT [ "nodejs", "musician_app.js" ]
