FROM debian:jessie

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y build-essential libssl-dev

RUN apt-get update && apt-get -y install locales build-essential \
  python python3 chrpath wget cpio  \
  mc lzop devscripts \
  libcanberra-gtk3-module nfs-common python-pip python3-pip

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.1.3

# nvm, node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
  && source $NVM_DIR/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default


ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN node --version

RUN npm install -g nodemon

RUN mkdir /usr/app
RUN mkdir /usr/app/log

# log dir
VOLUME /usr/app/log

WORKDIR /usr/app
COPY package*.json /usr/app/

# Bundle app source
COPY ./dist/* /usr/app/
# Install app dependencies
RUN npm install

EXPOSE  9000
CMD ["npm", "dev", "start"]
