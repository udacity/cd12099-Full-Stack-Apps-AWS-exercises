import express from "express";
import tweetService from "../service/tweetService.js";
export const router = express.Router();

// Get tweet by id
router.get( "/tweets/:id", async ( req, res ) => {
  let { id } = req.params;
  console.log(`Get tweet by id ${id}`)

    if ( !id ) {
      console.error('Id param is missing')
      return res.status(400).send(`Tweet id is required`);
    }

    const tweetById = await tweetService.findTweetById(id)

    if(!tweetById){
      console.info(`Tweet with id ${id} not found`)
      return res.status(404).send(`Tweet not found`)
    }
    console.log(`Found tweet with id ${id}`)
    return res.status(200).send(tweetById);
} );

// Get list of tweets
router.get( "/tweets/", async ( req, res ) => {
  console.log('Get list of tweets')
  let { author } = req.query;
  
  let tweetList;

  if (author) {
    console.log(`Filtering tweets by author: ${author}`)
    tweetList = await tweetService.findTweetsByAuthor(author)
  } else {
    console.log('Getting all tweets')
    tweetList = await tweetService.findAll();
  }

  res.status(200).send(tweetList);
} );

// Create a tweet
router.post( "/tweets/", async ( req, res ) => {
  console.log('Create a new tweet')
  let { author, text, imgUrl } = req.body;

    if(!author || !text){
      console.error('Missing author or text field')
      return res.status(400).send("Missing required tweet information")
    }

    const newTweet = await tweetService.createTweet(author, text, imgUrl)
    console.log('New tweet created')
    res.status(201).send(newTweet);
} );