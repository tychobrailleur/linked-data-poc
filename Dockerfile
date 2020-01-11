FROM openjdk:8-jre-alpine

COPY target/linked-data-poc-0.1.0-SNAPSHOT-standalone.jar /linked-data-poc.jar
CMD ["java", "-jar", "/linked-data-poc.jar"]
