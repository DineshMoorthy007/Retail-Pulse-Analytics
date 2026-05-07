# Stage 1: Build the Spring Boot application using Maven
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the POM and download dependencies (caching layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and package the application
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Run the application using OpenJDK JRE
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the executable JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the API port
EXPOSE 8080

# Execute the Spring Boot App
ENTRYPOINT ["java", "-jar", "app.jar"]
