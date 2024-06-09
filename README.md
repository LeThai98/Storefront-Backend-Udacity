# Storefront-Backend-Udacity

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
TOKEN_KEY=XYZ
ENV=dev
BCRYPT_PASSWORD=ABC
SALT_ROUNDS=20

```

## Start App
`yarn watch` or `npm run start`