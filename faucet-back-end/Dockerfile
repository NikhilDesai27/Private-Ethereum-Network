FROM node

WORKDIR /opt

COPY *.json ./

RUN npm install

COPY ./ ./

# CMD sleep 1m

CMD node server.js

EXPOSE 3000
