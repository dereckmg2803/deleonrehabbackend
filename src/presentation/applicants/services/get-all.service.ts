// services/get-all.service.ts
import { Applicant } from '../../../data';

export class GetAllApplicantsService {
    async execute() {
        return Applicant.find({
            order: { created_at: 'DESC' },
        });
    }
}
