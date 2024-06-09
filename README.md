# Storefront-Backend-Udacity
This repo contains a basic Node and Express app to started in constructing an API.

## Environmental Variables Set up
Bellow are the environment variables that needs to be set in a `.env` file. 
This is the default setting that I used for development, but you can change it to what works for you. 

**Note:** The given values are used in development and testing but not in production. 
```
PORT=5432
POSTGRES_HOST=localhost
POSTGRES_USER=thai
POSTGRES_PASSWORD=123
POSTGRES_DB=thai_shopping
POSTGRES_TEST_DB=thai_shopping
TOKEN_KEY=XYZ_Thai
ENV=dev
BCRYPT_PASSWORD=ABC
SALT_ROUNDS=20

```

## Start App
Pull code from 'main' branch and then install package: `npm install`
Start Project: 
`yarn watch` or `npm run start`

Access app via: http://localhost:3000/

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

### Endpoints
All endpoints of Project are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Authentication
Pass JWT token to header
```
Authorization   Bearer <token>
```

## Testing
Run testing: `npm run test`  OR `yarn test`

## Build project
Run command: `npm run build`


## Migrate DB
`npm run db-up`


## Installed Packages

## install Yarn
`npm i -g yarn`

### express
`npm i -S express`
`npm i -D @types/express`

### typescript
`npm i -D typescript`

### db-migrate
`npm install -g db-migrate`

### cors
`npm install --save-dev cors`

#### bcrypt
`yarn add bcrypt`

### nodemon 
`npm i nodemon`

#### jsonwebtoken
`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`

#### jasmine
`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`




