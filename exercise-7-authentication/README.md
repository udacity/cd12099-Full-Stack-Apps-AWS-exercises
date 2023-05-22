# udacity-tweets-app

This is a simple tweeter like application server.

***
## Getting Setup

### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the root of this repository. After cloning, open your terminal and run:
```bash
npm install
```
>_tip_: **npm i** is shorthand for **npm install**

***

## Running the Server Locally
To run the server locally in developer mode, open terminal and run:

`npm start` or `node server`

***
## Important Files and Project Structure

The source code for this demo resides in the ./src directory.

#### Test URL
http://localhost:8080/

## Curl commands

#### Get tweet by id
```
curl --location 'http://localhost:8080/tweets/1'
```

#### Get list of tweets
```
curl --location 'http://localhost:8080/tweets'
```

#### Get list of tweets filtered by author
```
curl --location 'http://localhost:8080/tweets?author=Michael'
```

#### Create a new tweet
```
curl --location 'http://localhost:8080/tweets' \
--header 'Content-Type: application/json' \
--data '{
    "author": "Elisabeth",
    "text": "This is the cutest puppy I have ever seen!",
    "imgUrl": ""
}'
```

#### Uploading image
```
curl --location 'http://localhost:8080/images' \
--form 'file=@"./puppy.jpeg"'                
{"url":"https://udacity-tweets-bucket.s3.us-east-1.amazonaws.com/1684421206489_file_puppy.jpeg"}     
```