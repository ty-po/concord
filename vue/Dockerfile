FROM node:lts-buster

# install simple http server for serving static content
#RUN npm install -g http-server

WORKDIR /data

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

#install vue cli
RUN yarn global add @vue/cli


ENV PATH /data/node_modules/.bin:$PATH




# make the 'app' folder the current working directory
WORKDIR /app

# install project dependencies
#RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
#RUN npm run build

EXPOSE 8080
CMD [ "yarn", "serve" ]
