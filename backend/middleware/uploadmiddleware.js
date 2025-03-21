import multer from "multer";

// Configure Multer to store file in memory before uploading to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true); // Accept PDF file
        } else {
            cb(new Error("Only PDF files are allowed!"), false);
        }
    }
});

export const uploadMiddleware = upload.single("pdf");
