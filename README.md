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
                "statusCode": 201,
                "message": "User created successfully",
                "data": {
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
                "isAdmin": false,
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

### Admins

#### 1. Assign admin role

Use the following endpoint to assign an user to be an admin.

```raml
/admins:
  post:
    description: Assign an user to be an admin
    body:
      application/json:
        example: |
          {
            "userId": "<user id>",
          }
    responses:
      201:
        body:
          application/json:
            example: |
              {
                "statusCode": 201,
                "message": "Admin role assigned successfully",
                "data": {
                  "adminId": "<admin id>",
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

#### 2. Get admin by id

Use the following endpoint to get an admin by id.

```raml
/admins/{id}:
  get:
    description: Get admin by id
    pathParameters:
      - name: id
        required: true
        type: string
        description: The admin id
    responses:
      200:
        body:
          application/json:
            example: |
              {
                "id": "<admin id>",
                "userId": "<user id>"
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
                "message": "Admin not found",
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

#### 3. Delete admin

Use the following endpoint to delete an admin.

```raml
/admins:
  delete:
    description: Delete an admin
    body:
      application/json:
        example: |
          {
            "id": "<admin id>",
          }
    responses:
      200:
        body:
          application/json:
            example: |
              {
                "statusCode": 200,
                "message": "Admin deleted successfully",
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
                "message": "Admin not found",
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

### Articles

#### 1. Create an article

Use the following endpoint to create an article.

```raml
/articles:
  post:
    description: Create an article
    body:
      application/json:
        example: |
          {
            "authorId": "<admin id>",
            "title": "What is Lorem Ipsum?",
            "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          }
    responses:
      201:
        body:
          application/json:
            example: |
              {
                "statusCode": 201,
                "message": "Article created successfully",
                "data": {
                  "articleId": "<article id>",
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
