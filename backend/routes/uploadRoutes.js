import express from 'express';
import multer from 'multer';
import { put } from '@vercel/blob';

const router = express.Router();

// Use memory storage to avoid saving files locally
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Upload endpoint
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileBuffer = req.file.buffer;
        const fileName = Date.now() + '-' + req.file.originalname;
        const mimeType = req.file.mimetype;

        // Upload to Vercel Blob
        const blob = await put(fileName, fileBuffer, {
            contentType: mimeType,
            access: 'public',
        });

        res.json({ url: blob.url });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
