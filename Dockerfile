FROM node:4.2.2
COPY . /src
EXPOSE 8080
RUN cd /src && npm install
CMD cd /src && node ./
