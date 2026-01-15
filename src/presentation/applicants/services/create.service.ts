import { Applicant } from '../../../data';
import { CreateApplicantDto } from '../../../domain/dtos/applicants/create-applicant.dto';
import { UploadCVService } from './gcs.service';

export class CreatorApplicantService {
    async execute(dto: CreateApplicantDto, file: Express.Multer.File) {
        if (!file) {
            throw new Error('CV is required');
        }

        const cvUrl = await UploadCVService(file);

        const applicant = new Applicant();
        applicant.name = dto.name;
        applicant.email = dto.email;
        applicant.phone = dto.phone;
        applicant.license_type = dto.license_type;
        applicant.license_number = dto.license_number;
        applicant.license_state = dto.license_state;
        applicant.message = dto.message;
        applicant.cv_url = cvUrl;

        try {
            await applicant.save();
            return {
                message: 'Applicant created successfully',
                data: applicant
            };
        } catch (error) {
            console.error('Error creating applicant:', error);
            throw new Error('Failed to create applicant');
        }
    }
}
