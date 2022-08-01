# investor-saham-pemula-backend

The Back-End of Investor Saham Pemula Website. Built with [NestJS](https://nestjs.com) and [TypeScript](https://www.typescriptlang.org).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoint

### Roles

#### 1. Get all roles

Use the following endpoint to get all roles.

```raml
/roles:
  get:
    description: Get all roles
    queryParameters:
      - name: sortBy
        required: false
        type: string
        description: The field to sort by
      - name: sortOrder
        required: false
        type: string
        description: The sort order (asc or desc)
    responses:
      200:
        body:
          application/json:
            example: |
              [
                {
                  "id": "<role id>",
                  "name": "ADMIN"
                },
                ...
              ]
      400:
        body:
          application/json:
            example: |
              {
                "statusCode": 400,
                "message": ["<error message>", ...],
                "error": "Bad Request"
              }
      500:
        body:
          application/json:
            example: |
              {
                "statusCode": 500,
                "message": "Internal Server Error"
              }
```

> If there is no role, the response will be an **empty array** `[]`.

#### 2. Get role by id

Use the following endpoint to get a role by id.

```raml
/roles/{id}:
  get:
    description: Get role by id
    pathParameters:
      - name: id
        required: true
        type: string
        description: The role id
    responses:
      200:
        body:
          application/json:
            example: |
              {
                "id": "<role id>",
                "name": "ADMIN"
              }
      400:
        body:
          application/json:
            example: |
              {
                "statusCode": 400,
                "message": ["<error message>", ...],
                "error": "Bad Request"
              }
      404:
        body:
          application/json:
            example: |
              {
                "statusCode": 404,
                "message": "Role not found",
                "error": "Not Found"
              }
      500:
        body:
          application/json:
            example: |
              {
                "statusCode": 500,
                "message": "Internal Server Error"
              }
```

### Users

#### 1. Create a user

Use the following endpoint to create a user.

```raml
/users:
  post:
    description: Create a user
    body:
      application/json:
        example: |
          {
            "name": "John Doe",
            "email": "johndoe@email.com",
            "password": "secr3tp45Sw0rd",
          }
    responses:
      201:
        body:
          application/json:
            example: |
              {
                statusCode: 201,
                message: "User created successfully",
                data: {
                  "userId": "<user id>",
                }
              }
      400:
        body:
          application/json:
            example: |
              {
                "statusCode": 400,
                "message": ["<error message>", ...],
                "error": "Bad Request"
              }
      500:
        body:
          application/json:
            example: |
              {
                "statusCode": 500,
                "message": "Internal Server Error"
              }
```

#### 2. Get user by id

Use the following endpoint to get a user by id.

```raml
/users/{id}:
  get:
    description: Get user by id
    pathParameters:
      - name: id
        required: true
        type: string
        description: The user id
    responses:
      200:
        body:
          application/json:
            example: |
              {
                "id": "<user id>",
                "name": "John Doe",
                "email": "johndoe@email.com",
              }
      400:
        body:
          application/json:
            example: |
              {
                "statusCode": 400,
                "message": ["<error message>", ...],
                "error": "Bad Request"
              }
      404:
        body:
          application/json:
            example: |
              {
                "statusCode": 404,
                "message": "User not found",
                "error": "Not Found"
              }
      500:
        body:
          application/json:
            example: |
              {
                "statusCode": 500,
                "message": "Internal Server Error"
              }
```
