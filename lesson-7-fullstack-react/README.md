
## Lesson
In this exercise you will be running a simple full stack Node Express server with a React frontend.

## Run the backend

### Reuse the existing database
For this exercise we will reuse our existing user table from the login exercise.

1. Update the config file. In the directory api/config you will see a config.json file. Since we are just working with the development configuration, update the config file with the following changes.
```
    "development": {
        "username": "Your username",
        "password": "Your password",
        "database": "Your database name",
        "host": "Your URL",
        "port": "5432",
        "dialect": "postgres",
        "aws_region": "Your region",
        "aws_profile": "default"
    }

```
### Run the server
To run the server run the following commands lines from a terminal in the api root directory

1. `npm install`
2. `npm start`

## Run the frontend
To run the client server run with the following commands from the client root directory

1. `npm install`
2. `npm start`

## Testing the application
1. Open a browser to `http://localhost:3000/`
2. Enter the credentials for an account that has already been registered. You should see a success message if the user is authenticated and a 401 error if the username or password is in correct 