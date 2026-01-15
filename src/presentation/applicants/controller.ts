import { Request, Response } from 'express';
import { CreateApplicantDto } from '../../domain/dtos/applicants/create-applicant.dto';
import { CreatorApplicantService } from './services/create.service';
import { handleError } from '../common/handleError';

export class ApplicantsController {
    constructor(
        private readonly createApplicantService: CreatorApplicantService
    ) { }

    createApplicant = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({ message: 'CV is required' });
                return;
            }

            const [error, data] = CreateApplicantDto.execute(req.body);

            if (error) {
                res.status(422).json({ message: error });
                return;
            }

            const result = await this.createApplicantService.execute(
                data!,
                req.file
            );

            res.status(201).json(result);
        } catch (error) {
            handleError(error, res);
        }
    };
}
