const express = require("express");
const router = express.Router();
const models = require("../models");
math = require("mathjs");



router.post("/api/uploads",

async (req, res) => {
  id = Math.floor(Math.random() * 100000000);
  let image_url;
  let JSON_Obj = req.body;

  for(let key in JSON_Obj){
     image_url = key;
  }

  if (!image_url || image_url == null) {
    return res.status(400).send("invalid request!");
  }
  
  await Promise.all([
    models.feed.create({
      id,
      url:image_url,
      Date,
      Date
    }),
  ]);

  res.sendStatus(201);
});

module.exports = router;