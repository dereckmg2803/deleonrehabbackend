import { Request, Response } from 'express';
import { UploadCVService } from './services/gcs.service';
import { handleError } from '../common/handleError';

export class ApplicantsController {
    createApplicant = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'CV is required' });
            }

            const cvUrl = await UploadCVService(req.file);

            // Aquí luego guardas en DB:
            // applicantService.create({ ...req.body, cvUrl });

            res.status(201).json({
                message: 'Applicant created successfully',
                cvUrl
            });
        } catch (error) {
            handleError(error, res);
        }
    };
}
