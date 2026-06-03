// server/middleware/uploadMiddleware.js
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/candidates";

 
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
  
    const safeOriginal = path.basename(file.originalname);
    const ext = path.extname(safeOriginal).toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
 
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const ext = path.extname(file.originalname).toLowerCase();

  const mimeOk = allowedMimeTypes.includes(file.mimetype);
  const extOk  = allowedExtensions.includes(ext);

  if (mimeOk && extOk) {
    cb(null, true);
  } else {
 
    req.fileValidationError = "Only JPG, PNG, and WEBP images are allowed.";
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, 
    files: 1,                   
  },
});

export default upload;