# Coffeeeeeeee Backend
## Description

Coffeeeeeeee app backend project

## Tech skills
- Typescript
- NestJS
- TypeORM
- PostgreSQL

## Installation
Clone repository and install dependencies.
```bash
$ git clone git@github.com:jeyook/coffeeeeeeee-backend.git
$ cd coffeeeeeeee-backend
$ npm install
```

Setup PostgreSQL or other database of your choice.

Fill up .env file.
```
# DB
DB_HOSTNAME=host
DB_USERNAME=database_username
DB_PASSWORD=database_password
DB_NAME=coffeeeeeeee
DB_PORT=5432

# Server port
SERVER_PORT=3000

# Google OAuth
OAUTH_GOOGLE_CLIENT_ID=client_id
OAUTH_GOOGLE_CLIENT_SECRET=client_secret
OAUTH_GOOGLE_REDIRECT=http://localhost:3000/auth/google/callback
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
