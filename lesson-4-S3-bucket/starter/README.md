
### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm install`
2. run the development server with `node server`

### Populate RDS database
In this lesson you will be creating and populating AWS S3 Bucket. Afterwards you will be writing a little code and a new endpoint to populate that data.

#### Create S3 Bucket
1. Login AWS account
2. Select S3 from the server list
3. Select create Bucket
4. Type in the name of the bucket and select create bucket
5. Unselect checkbox to make bucket public
6. Check approval to make bucket public


#### Create new endpoint
Create a new endpoint `api/uploads` that will allow you to save data into your AWS S3 Bucket.
1. Create a new endpoint in the file `routes/uploads.js`
2. In this example, I created a new endpoint and a function to uploadToS3
3. In the endpoint. Save the image URL
4. Use Jimp to create an object of the image
5. Create a buffer from the image object
6. Send to function uploadToS3
7. In this function we are using the S3 object to upload to S# bucket

```
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

  const JSON_Obj = req.body;
  let image_url;

  for(let key in JSON_Obj){
    image_url = key;
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

```

#### Test cURL command
curl -d https://images.pexels.com/photos/4629485/pexels-photo-4629485.jpeg -X POST http://localhost:8000/api/uploads
