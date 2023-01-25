const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const aws = require("aws-sdk");
const fs = require('fs');
const Jimp = require('jimp');


const s3 = new aws.S3({
  accessKeyId: 'AKIA5BVJW5TTL7HMB7HI',
  secretAccessKey: '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',
  region: 'us-west-1'
});

const S3_BUCKET = "myawsbucketed";//"my-image-storage1"

async function uploadToS3(key, buffer, file) {
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: S3_BUCKET,
        ContentType: file,
        Key: key,
        Body: buffer
      },
      () => resolve()
    );

  });
}

router.post("/api/uploads",

async (req, res) => {
  const id = uuidv4();

  var JSON_Obj = req.body;

  for(var key in JSON_Obj){
    var image_url = key;
  }

  if (!image_url || image_url == null) {
    return res.status(400).send("invalid request!");
  }

  console.log('image url', image_url);

  const photo = await Jimp.read(image_url);
  var photoBuffer;

  photo.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
    photoBuffer = buffer;
  });

 await Promise.all([
   uploadToS3(`images/${id}`, photoBuffer, "image file"),
  ]);

  res.sendStatus(201);
});

module.exports = router;