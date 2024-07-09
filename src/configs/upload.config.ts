import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

const storagePath = path.join(__dirname, "../uploads");

const imageConfig = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    callback(null, storagePath);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const uniqueFilename = uuidv4(); // Generate unique identifier for filename
    const originalName = file.originalname.replace(/\s+/g, "-").toLowerCase(); // Replace spaces with hyphens and convert to lowercase
    const fileExtension = path.extname(file.originalname); // Get file extension
    const filename = `${currentDate}-${originalName}-${uniqueFilename}${fileExtension}`;
    callback(null, filename);
  },
});

const isImage = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  // Define allowed file extensions
  const allowedExtensions = [".jpg", ".jpeg", ".png"];

  // Get the file extension
  const fileExtension = path.extname(file.originalname).toLowerCase();

  // Check if the file extension is one of the allowed extensions
  if (allowedExtensions.includes(fileExtension)) {
    callback(null, true); // Allow the upload if the file is an image
  } else {
    callback(null, false); // Reject the upload if the file is not an image with the allowed extensions
  }
};

const profileUpload = multer({
  storage: imageConfig, // Set the storage configuration
  fileFilter: isImage, // Set the file filter
});

export { profileUpload };
