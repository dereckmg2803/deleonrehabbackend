import { Request, Response } from 'express';
import { UploadCVService } from './services/gcs.service';
import { handleError } from '../common/handleError';

export class ApplicantsController {
    createApplicant = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'CV is required' });
            }

            if (!req.body) {
                return res.status(400).json({ message: 'Form data is missing' });
            }

            const {
                name,
                email,
                phone,
                license_type,
                license_number,
                license_state,
                message
            } = req.body;

            const cvUrl = await UploadCVService(req.file);

            // Aquí luego:
            // applicantService.create({ name, email, phone, license_type, license_number, license_state, message, cvUrl });

            return res.status(201).json({
                message: 'Applicant created successfully',
                data: {
                    name,
                    email,
                    phone,
                    license_type,
                    license_number,
                    license_state,
                    message,
                    cvUrl
                }
            });

        } catch (error) {
            handleError(error, res);
        }
    };
}

