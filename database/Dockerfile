FROM ubuntu

WORKDIR /usr/src/app

COPY . .

# installing postgres
RUN \
  apt-get update && \
  echo y | apt-get install postgresql wget gzip

ENTRYPOINT [ "chmod", "+x", "configureDB.sh" ]

# configuring database
RUN ./configureDB.sh