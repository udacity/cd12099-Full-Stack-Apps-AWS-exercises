const express = require("express");
const router = express.Router();
const models = require("../models");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const aws = require("aws-sdk");
const fs = require('fs');
const Jimp = require('jimp');

const s3 = new aws.S3({
  accessKeyId: 'Add Key ID',
  secretAccessKey: 'Add Secret Key',
  region: 'Add Region'
});

const S3_BUCKET = "Add Bucket Name"

//TODO Create new endpoint to save image in S3 Bucket

module.exports = router;