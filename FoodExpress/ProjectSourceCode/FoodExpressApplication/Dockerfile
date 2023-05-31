FROM openjdk:18.0.1
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} FoodExpressApplication-0.0.1.jar
ENTRYPOINT ["java","-jar","/FoodExpressApplication-0.0.1.jar"]