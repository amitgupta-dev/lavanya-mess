const cloudinary = require('cloudinary').v2;

cloudinary.config({
    api_key: process.env.CLOUDNARY_KEY,
    api_secret: process.env.CLOUDNARY_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME,
    secure: true
});

module.exports = cloudinary