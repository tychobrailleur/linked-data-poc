FROM openjdk:8-jre-alpine

RUN apk add --update bash curl ca-certificates && rm -rf /var/cache/apk/*

ENV FUSEKI_HOME /jena-fuseki

WORKDIR /tmp
RUN curl -Ss --fail http://ftp.heanet.ie/mirrors/www.apache.org/dist/jena/binaries/apache-jena-fuseki-3.13.1.tar.gz > fuseki.tar.gz && \
    tar xvf fuseki.tar.gz && \
    mv apache-jena-fuseki* $FUSEKI_HOME && \
    rm fuseki.tar.gz*

WORKDIR $FUSEKI_HOME
EXPOSE 3030
CMD ["/jena-fuseki/fuseki-server", "--loc=ds", "/companies"]
