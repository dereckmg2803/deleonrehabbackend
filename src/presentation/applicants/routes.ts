import { Router } from 'express';
import multer from 'multer';
import { ApplicantsController } from './controller';
import { CreatorApplicantService } from './services/create.service';

export class ApplicantsRoutes {
    static get routes(): Router {
        const router = Router();

        const upload = multer();

        const service = new CreatorApplicantService();
        const controller = new ApplicantsController(service);

        router.post(
            '/applicants',
            upload.single('cv'),
            controller.createApplicant
        );

        return router;
    }
}
