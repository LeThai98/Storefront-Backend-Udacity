# Storefront-Backend-Udacity

## Environmental Variables Set up
Bellow are the environment variables that needs to be set in a `.env` file. 
This is the default setting that I used for development, but you can change it to what works for you. 

**NB:** The given values are used in development and testing but not in production. 
```
PORT=127.0.0.1
POSTGRES_HOST="localhost"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="123"
POSTGRES_DB="storefront"
POSTGRES_TEST_DB="storefront"
TOKEN_KEY=ABC
ENV=dev
BCRYPT_PASSWORD=ABC
SALT_ROUNDS="AAA"

```

## Start App
`yarn watch` or `npm run start`