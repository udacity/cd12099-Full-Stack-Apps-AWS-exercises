import express from 'express';
import {cars} from './cars.js';
import bodyParser from 'body-parser';

(async () => {
  let the_cars = cars;

  //Create an express applicaiton
  const app = express(); 
  //default port to listen
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 

  // Root URI call
  app.get( "/", ( req, res ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name", 
    ( req, res ) => {
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req, res ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );

 

  // @TODO Add an endpoint to get a list of cars
  // it should be filterable by make with a query paramater
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

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found
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
  


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();