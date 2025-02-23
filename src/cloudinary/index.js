// const { v2: cloudinary } = require('cloudinary');
// const toStream = require('buffer-to-stream');
// const sharp = require('sharp');

import { v2 as cloudinary } from "cloudinary";
import toStream from "buffer-to-stream"
import sharp from "sharp";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const upload = async (file, folder) => {
    try {
        // Resize the image using sharp
        const bufferOfFile = await sharp(file).resize(1870).webp({ quality: 90 }).toBuffer();

        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                { resource_type: "auto", folder },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            toStream(bufferOfFile).pipe(upload);
        });
    } catch (error) {
        throw error;
    }
};

// module.exports = { upload };
export { upload };
