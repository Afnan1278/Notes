# Node.js Application with Docker Compose

This is a Node.js application that uses Docker Compose to orchestrate containers for the application, MySQL database, and Redis. It demonstrates a basic setup with user and note models and a one-to-many relationship between them. The application uses Sequelize as an ORM for database interactions and implements design patterns Singleton and Factory Method.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/Afnan1278/Notes.git
   cd Notes
2. Create a .env file in the project root directory and set the environment variables for MySQL and Redis:
    ```bash
   WEBHOST=http://localhost:3301
   SERVER_URL = http://localhost:3000
   EXPRESS_PORT=3000
   EXPRESS_PORT_HTTPS=443
   EXPRESS_PARAM_LIMIT=10000
   EXPRESS_FileSize_LIMIT=5mb
   
   NODE_ENV=dev
   
   JWT_SECRETE=dw9VO~<L^`f0VI8pcHxsT_TF1*]};wBJYn2X=-_2g_TqSEPZNVA0QAd

   # APP DB 
   DB_HOST=mysqldb
   DB_NAME=notes
   DB_USER=root
   DB_PORT=3306
   
   DB_LOGGING=false

   # REDIS
   REDIS_HOST = redis
   REDIS_PORT = 6379

3. Build and start the application using Docker Compose:
   ```bash
   docker-compose up 
4. Access the application at http://localhost:3000.


## Testing
- To run the tests, use the following command:
    ```bash
    docker-compose run app npm test
    
## Design Patterns
  This project follows several design patterns:

1. Singleton Pattern: Custom usgae of singleton pattern is by implemantation of logger class, it's created only once and same instance is used throughout application. Sequelize, the ORM used in the project, internally uses the Singleton pattern to ensure that only one instance of the ORM is created and shared throughout the application. This promotes efficient database connection management. 

2. Factory Method Pattern: Notes Types of classes are created and exposed by function createNote which takes parameter of type and returns object, abstracting out the creation part from the class where it's called.

## API Documentation
- For detailed API documentation and usage, refer to the swagger url given below.
   ```bash
   https://app.swaggerhub.com/apis-docs/AFNANANWER2_1/note-apis/1.0.0-oas3#/
<img width="1490" alt="Screenshot 2023-09-18 at 12 04 37 AM" src="https://github.com/Afnan1278/Notes/assets/42905539/5ffced65-63d4-4485-aec9-b35b2a4dcb19">

