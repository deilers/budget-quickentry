FROM node:14

WORKDIR /usr/src/app

# copies both package.json and package-lock.json in order to use 'npm ci' command
COPY package*.json ./

# Temporarily using local env settings
COPY .env .

RUN npm ci
COPY . .
CMD ["npm", "start"]