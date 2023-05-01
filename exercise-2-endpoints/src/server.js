import bodyParser from 'body-parser';
import express from 'express';
import { tweets } from './tweets.js';

(async () => {
  //Create an express application
  const app = express(); 
  //default port to listen
  const port = 8080; 
  
  //use middleware so post bodies are accessable as req.body
  app.use(bodyParser.json()); 
  app.use(express.urlencoded({ extended: true })) //for requests from forms-like data

  // Root URI call
  app.get( "/", ( req, res ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get tweet by id
  app.get( "/tweets/:id", ( req, res ) => {
      let { id } = req.params;

      if ( !id ) {
        return res.status(400).send(`Tweet id is required`);
      }

      const tweetById = tweets.find(t => t.id ===  parseInt(id))
      if(!tweetById){
        return res.status(404).send(`Tweet not found`)
      }

      return res.status(200).send(tweetById);
  } );

  // Get list of tweets
  app.get( "/tweets/", ( req, res ) => {
    let { author } = req.query;
    
    let tweetList = tweets;

    if (author) {
      tweetList = tweets.filter((tweet) => tweet.author === author);
    }

    res.status(200).send(tweetList);
  } );
  
  // Create a tweet
  app.post( "/tweets/", ( req, res ) => {
      // destruct request body
      let { title, author, text, imgUrl } = req.body;

      const newTweet = {id: tweets.length,title, text, author, imgUrl}
      tweets.push(newTweet)

      res.status(200).send(newTweet);
  } );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
