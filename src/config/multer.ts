import cloudinary from 'cloudinary';
import multer from 'fastify-multer';
import path from 'path';
import crypto from "node:crypto";
import { change } from '../utils';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  }),
  cloud: multer.diskStorage({
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        
        file.key = `${hash.toString("hex")}-${file.originalname}`;
        file.mimetype = file.mimetype.slice(0, 5);

        cb(null, file.key);
      });
    }
  })
};

export default multer({
  // dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes['cloud'],
  limits: {
    fileSize: 1000 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
      "image/jpg",
      "video/mp4",
      "video/webm",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
});
