FROM ubuntu

WORKDIR /usr/src/app

COPY . .

# installing postgres
RUN \
  apt-get update && \
  echo y | apt-get install postgresql wget gzip && \
  chmod +x configureDB.sh

CMD [ "./configureDB.sh" ]