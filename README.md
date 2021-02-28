# Real Time Chat [Angular-Socket-Express-Redis]

## Installation

1. [IMPORTANT] Most of all, you must have installed [redis](https://www.npmjs.com/package/redis-cli) locally on your computer.
1. Clone the repo and `cd` into it
1. First we run it by typing `npm install` from the terminal. This will install our dependencies on our package.json file.
1. Then you can open the project by typing `npm run dev` from the terminal.
1. Visit `http://127.0.0.1:3000/` in your browser

## Enviroment variables
Create a file named ".env" in the root directory and fill its contents as follows.

```ruby
DB_STRING = XXX

GOOGLE_LOGIN_CLIENT_ID = XXX
GOOGLE_LOGIN_SECRET_ID = XXX
GOOGLE_LOGIN_CALLBACK_URL = XXX

SESSION_SECRET_KEY = XXX

REDIS_URI = XXX
REDIS_PORT = XXX
REDIS_PASS = XXX
```

## Run the app
`npm run start:dev` // for locally
