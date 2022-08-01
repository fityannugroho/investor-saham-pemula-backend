# investor-saham-pemula-backend

The Back-End of Investor Saham Pemula Website. Built with [NestJS](https://nestjs.com) and [TypeScript](https://www.typescriptlang.org).

## Installation

1. Clone this repository.
2. Install the dependencies. Run `npm install`.
3. Create `.env` file by simply copying the `.env.example` file and rename it.
4. Configure the `.env` file with the database connection.
5. Generate the database structure. Run `npm run migrate:reset`.

> Warning! If you use `npm run migrate:reset` command, all tables will be dropped and recreated. All data in the tables will be lost.

6. Finally, you can [run the application](#running-the-app).

> To build the application, run `npm run build`.

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
