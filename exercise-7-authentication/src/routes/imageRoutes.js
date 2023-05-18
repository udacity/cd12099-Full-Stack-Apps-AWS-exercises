import express from "express";
import uploadImage from "../middleware/uploadImageToS3Middleware.js";
import {requiresAuth} from "../middleware/requiresAuthMiddleware.js";
export const router = express.Router();

router.post("/images/", requiresAuth, uploadImage.single('file'), async (req, res) => {
    if(req.file){
        res.status(201).json({url: req.file.location});
    } else {
        console.error('S3 upload failed', req)
        res.status(500).send('Image upload failed')
    }
});