import { Storage } from '@google-cloud/storage';
import 'dotenv/config';
import { get } from 'env-var';


const storage = new Storage();
const bucket = storage.bucket(get("GCS_BUCKET_NAME").required().asString());

export const UploadCVService = async (
    file: Express.Multer.File
): Promise<string> => {
    const fileName = `cvs/${Date.now()}-${file.originalname}`;
    const blob = bucket.file(fileName);

    const stream = blob.createWriteStream({
        contentType: file.mimetype,
        resumable: false
    });

    const MAX_SIZE = 10 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
        throw new Error('File too large');
    }

    if (file.mimetype !== 'application/pdf') {
        throw new Error('Only PDF files are allowed');
    }

    stream.end(file.buffer);

    return `gs://${get('GCS_BUCKET_NAME').required().asString()}/${fileName}`;
};
