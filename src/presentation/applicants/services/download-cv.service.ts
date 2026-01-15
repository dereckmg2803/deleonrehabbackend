import { Applicant } from '../../../data';
import { Storage } from '@google-cloud/storage';
import { get } from 'env-var';

const storage = new Storage();
const bucket = storage.bucket(
    get('GCS_BUCKET_NAME').required().asString()
);

export const DownloadCVService = async (applicantId: string) => {
    const applicant = await Applicant.findOneBy({ id: applicantId });

    if (!applicant) {
        throw new Error('Applicant not found');
    }

    if (!applicant.cv_url) {
        throw new Error('CV not found');
    }

    const filePath = applicant.cv_url.replace(
        `gs://${bucket.name}/`,
        ''
    );

    const file = bucket.file(filePath);

    const [signedUrl] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 10 * 60 * 1000, // 10 minutos
    });

    return {
        cvUrl: signedUrl,
        applicantName: applicant.name,
    };
};
