// services/delete.service.ts
import { Applicant } from '../../../data';

export class DeleteApplicantService {
    async execute(id: string) {
        const applicant = await Applicant.findOneBy({ id });

        if (!applicant) {
            throw new Error('Applicant not found');
        }

        await applicant.remove();

        return { message: 'Applicant deleted successfully' };
    }
}
