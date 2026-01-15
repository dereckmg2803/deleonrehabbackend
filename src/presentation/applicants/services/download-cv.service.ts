// services/download-cv.service.ts
import { Applicant } from '../../../data';

export class DownloadCVService {
    async execute(id: string) {
        const applicant = await Applicant.findOneBy({ id });

        if (!applicant) {
            throw new Error('Applicant not found');
        }

        return { cvUrl: applicant.cv_url };
    }
}
