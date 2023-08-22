# Language Proficiency Test API

## Overview

This project is a basic NestJS application that demonstrates the creation of a RESTful API for language proficiency tests. 
## Features

- **Basic Authentication**: The API ensures secure endpoints by implementing basic authentication, allowing only authorized users to access protected resources.

- **Parameter Validation**: Built-in validation mechanisms guarantee the accuracy and reliability of incoming request parameters.

- **MongoDB Integration**: MongoDB serves as the chosen database solution, seamlessly integrated into the project through the mongoose ORM for streamlined data management.

- **CRUD Operations**: The API offers Create, Read, Update, and Delete functionality for questions and their corresponding answer options.

- **Docker Integration**: The project is designed to be Docker-friendly, facilitating easy deployment and management of the application and its dependencies.
- **Swagger API documentation**

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Start the MongoDB container
$ docker-compose up -d

# Start the NestJS application in development mode
$ npm run start:dev
```
### To open the Swagger UI navigate to http://localhost:3000/api
## Test
### unit tests
```$ npm run test```

### e2e tests
```bash
$ npm run test:e2e
```

### test coverage
```bash
$ npm run test:cov
```


# Shows databases
```bash
$ docker exec -it 'container name' bash
$ mongosh
$ use admin
$ db.auth("root", "123456");
$ show dbs
```
# Shows data
```bash
$ use languagetestdb
$ db.MultipleChoiceQuestion.find()
```