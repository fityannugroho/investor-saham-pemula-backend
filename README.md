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
        description: The field to sort by.
      - name: sortOrder
        required: false
        type: string
        description: The sort order (asc or desc).
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
