// services/update-status.service.ts
import { Applicant, ApplicantStatus } from '../../../data';

export class UpdateApplicantStatusService {
    async execute(id: string, status: ApplicantStatus) {
        const applicant = await Applicant.findOneBy({ id });

        if (!applicant) {
            throw new Error('Applicant not found');
        }

        applicant.status = status;
        await applicant.save();

        return applicant;
    }
}
