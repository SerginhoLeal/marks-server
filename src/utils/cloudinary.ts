import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: "zasetrewsqw",
  api_key: "411992426427919",
  api_secret: "GLzoiVYLmZr2FX2Yruum5FuMyfk"
});

module.exports = { cloudinary };

/*
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
*/