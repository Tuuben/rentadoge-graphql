# Rent a doge!

A totally legitimate backend for a dog renting application, I swear.

![alt text](https://media.giphy.com/media/HCTfYH2Xk5yw/giphy.gif)

This project is based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# How to run

### 1. Install dependencies

```
  npm install
```

### 2. Create env file in the root of your folder

```
  .env
```

### 3. Add your firebase credentials

```
  FIREBASE_PROJECT_ID = "< YOUR PROJECT ID >"
  FIREBASE_CLIENT_EMAIL = "< YOUR CLIENT EMAIL >"
  FIREBASE_DATABASE_URL = "< YOUR DATABASE URL >"
  FIREBASE_STORAGE_BUCKET = "< YOUR STORAGE BUCKET >"
  FIREBASE_PRIVATE_KEY = "<YOUR PRIVATE KEY>"
  IS_PRODUCTION = false
```

### 4. Run it baby.

```
  npm run start
```

### Bonus: Run mock mutation to populate your database with placeholder data in staging

go to localhost:3000/graphql and run this mutation:

```
  mutation {
    createMockDogsAndBreeds
  }
```

# Further help

Figure it out.
