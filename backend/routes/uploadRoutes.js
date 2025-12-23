import express from 'express';
import multer from 'multer';
import fetch from 'node-fetch';

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

        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
        const projectId = process.env.VERCEL_PROJECT_ID;

        if (!blobToken || !projectId) {
            return res.status(500).json({ message: 'Vercel Blob token or project ID not set' });
        }

        // Upload to Vercel Blob
        const response = await fetch(`https://blob.vercel-storage.com/${projectId}/${fileName}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${blobToken}`,
                'Content-Type': mimeType
            },
            body: fileBuffer
        });

        if (!response.ok) {
            const text = await response.text();
            return res.status(500).json({ message: `Upload failed: ${text}` });
        }

        // Get public URL
        const fileUrl = response.headers.get('x-vercel-blob-url');
        res.json({ url: fileUrl });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
