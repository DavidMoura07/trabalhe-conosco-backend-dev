FROM dpatriot/docker-awscli-java8

# Install logstash and your JDBC plugin
RUN \
  wget -c https://artifacts.elastic.co/downloads/logstash/logstash-6.4.2.deb -O logstash-6.4.2.deb && \
  dpkg -i logstash-6.4.2.deb && \
  cd /usr/share/logstash/bin && \
  ./logstash-plugin install logstash-input-jdbc && \
  # Installing  drive of PostgreSQL to Java
  cd /usr/share/logstash && \
  wget https://jdbc.postgresql.org/download/postgresql-9.4.1212.jre6.jar

COPY . /etc/logstash/conf.d/

ENTRYPOINT [ "cd", "/usr/share/logstash" ]
CMD ["./bin/logstash", "-f", "/etc/logstash/conf.d/logstash.conf"]
WORKDIR /data