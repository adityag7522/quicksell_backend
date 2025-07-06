const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const streamifier = require('streamifier');
const auth = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth, upload.single('image'), (req, res) => {
  const stream = cloudinary.uploader.upload_stream((error, result) => {
    if (result) res.json({ url: result.secure_url });
    else res.status(500).json({ error });
  });
  streamifier.createReadStream(req.file.buffer).pipe(stream);
});

module.exports = router;
