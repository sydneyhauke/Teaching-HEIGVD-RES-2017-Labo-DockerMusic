# Dockerfile for auditor-app
# Adapted from : https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:boron

MAINTAINER Sydney Hauke

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app
COPY auditor_app/ /usr/src/app/

# Install app dependencies
RUN npm install --save moment dgram

ENTRYPOINT [ "nodejs", "auditor_app.js" ]
