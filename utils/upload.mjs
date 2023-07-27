import multer from "multer";

import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url: process.env.MONGO_DB_URL,
  options: { useNewUrlParser: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-my-blog-${file.originalname}`;
    }

    return {
      bucketName: "files",
      filename: `${Date.now()}-my-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
