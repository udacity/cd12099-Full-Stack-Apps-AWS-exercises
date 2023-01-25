# udacity-c2-basic-server

This is a simple node-express server to explore and understand the Request-Response pattern.

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

### src/server.js
The main code for this demo is located in the ./src/server.js file. This includes 

### src/cars.js
This is a javascript object containing a list of cars. This will be useful for providing data for our simple endpoints.

### src/unit-test-examples/
This directory contains some simple unit functions (`units.js`) and corresponding tests using Mocha and Chai (`units.tests.js`).

***
# Tasks
1. @TODO `./src/server.js/`
Add an endpoint to GET a list of cars.

```
 app.get( "/cars/", ( req, res ) => {
      // destruct our query paramaters
      let { make } = req.query;

      
      let cars_list = the_cars;

      // if we have an optional query paramater, filter by it
      if (make) {
        cars_list = the_cars.filter((car) => car.make === make);
      }

      // return the resulting list along with 200 success
      res.status(200).send(cars_list);
  } );
```

#### Test URLs
'http://localhost:8082/cars'
'http://localhost:8082/cars/?make=tesla'

2. @TODO `./src/server.js/` 
Add an endpoint to get a specific car.

```
  app.get( "/cars/:id", ( req, res ) => {
    // destruct our path params
    let { id } = req.params;

    // check to make sure the id is set
    if (!id) { 
      // respond with an error if not
      return res.status(400).send(`id is required`);
    }

    // try to find the car by id
    const car = the_cars.filter((car) => car.id == id);

    // respond not found, if we do not have this id
    if(car && car.length === 0) {
      return res.status(404).send(`car is not found`);
    }

    //return the car with a sucess status code
    res.status(200).send(car);
  } );

```
#### Test URLs
'http://localhost:8082/cars/2'

