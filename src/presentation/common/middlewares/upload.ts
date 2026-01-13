import multer from 'multer';

export const upload = multer({
    storage: multer.memoryStorage(), // necesario para GCS
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            cb(new Error('Only PDF files are allowed'));
        } else {
            cb(null, true);
        }
    }
});
