import express from "express";
import uploadImage from "../middleware/uploadImageToS3Middleware.js";

export const router = express.Router();

router.post("/images/", uploadImage.single('file'), async (req, res) => {
    if(req.file){
        res.status(201).json({url: req.file.location});
    } else {
        console.error('S3 upload failed', req)
        res.status(500).send('Image upload failed')
    }
});