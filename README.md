# Node.js Application with Docker Compose

This is a Node.js application that uses Docker Compose to orchestrate containers for the application, MySQL database, and Redis. It demonstrates a basic setup with user and post models and a one-to-many relationship between them. The application uses Sequelize as an ORM for database interactions.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
2. Create a .env file in the project root directory and set the environment variables for MySQL and Redis:
    ```bash
    DB_USERNAME=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_DATABASE=your_mysql_database
    DB_HOST=db
    DB_PORT=3306
    REDIS_HOST=redis
    REDIS_PORT=6379

3. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
4. Access the application at http://localhost:3000.

## Configuration
## MySQL
MySQL database configuration can be set in the .env file as mentioned in the "Getting Started" section. Adjust the DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, and DB_PORT environment         variables to match your MySQL configuration.

## Redis
Redis configuration is also set in the .env file. Modify the REDIS_HOST and REDIS_PORT environment variables to match your Redis server's hostname and port.
## JWT Secret
The JWT_SECRET environment variable in the .env file is used to sign and verify JWT tokens for authentication. Ensure it is a strong, secret key.


## Testing
- To run the tests, use the following command:
    ```bash
    docker-compose run app npm test
    
## Design Patterns
  This project follows several design patterns:

1. Singleton Pattern: Sequelize, the ORM used in the project, internally uses the Singleton pattern to ensure that only one instance of the ORM is created and shared throughout the application. This promotes efficient database connection management.

2. Factory Method Pattern: Although not explicitly demonstrated in this project, the concept of creating instances of Sequelize models and associating them using factory-like methods (sequelize.define) is a form of the Factory Method pattern. It abstracts the process of creating instances of database models.
