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

### Authentication

#### Get token
```
curl --location 'http://localhost:8080/auth/token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@email.com",
    "password": "password"
}'
```

#### Refresh token
```
curl --location 'http://localhost:8080/auth/refresh' \
--header 'Content-Type: application/json' \
--data '{
    "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwidG9rZW5UeXBlIjoiUkVGUkVTSF9UT0tFTiIsImlhdCI6MTY4NDc2Njc3NywiZXhwIjoxNjg0OTM5NTc3fQ.TZDOdZkexHMFjapk1MPJ_YyV6CfJ44gBSsLYUCRjNQfdUKzsg1sEzPbm8hDkLPKAtXMatlEWzj6fQddCvxHOJe-aJN_-t4PBy3EbIzJYa1SCKPKVvuOShIxnEnuZnNa2fgaekAiA3lyKhdElumgHgc97C73GXG9CgDPOJqhB6yAPIWNySSAnRgLI4IyMQC_qVqTPSv4SSM5aGUAnuZ-0M93nPEzc4wWOQ2-KMbAa9APNxRSqTm3jqH3BCUTqFbX4a3ntGroYbsQPJlXa6b9DfUexLFbRYlZ1BfPzTnhA9Mz-qXWxKWxwsz5swssZ_iAnzDCarepyUkF35wQaKJTejrfBoOHZLJX6dlxo89NAO7stN-u164Zg6HhwOfGqn2aWiRrTgALvFNiyIYTbbLC9MpoTWqd4bHZLuXDkARbA9NHj444OqCfgSptFInvcZlLPYC3yu_XFVwGsSalTTlb7Z82Nl0D3pkaplf5vKvf9Oa9VpDG7CeQkfwqEd0N4VSR7kps68O4qtupoyFTfHW8CZ80PXr5D8gzbYiJTKcHf8yXEoIU-TfmTH2Pqsxso9M5y0ZJgiOwqN0Rage_RJh8TqjeMuFbbTPOTn4AK6e_JZDknBuTVG-y9-0NmfrDHHsip_thSDGHNYEKiWr3GIkvZXw48opbe-GOPdG-B7gGdMAk"
}'
```

### Tweets
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

### Images

#### Uploading image
```
curl --location 'http://localhost:8080/images' \
--form 'file=@"./puppy.jpeg"'                
{"url":"https://udacity-tweets-bucket.s3.us-east-1.amazonaws.com/1684421206489_file_puppy.jpeg"}     
```