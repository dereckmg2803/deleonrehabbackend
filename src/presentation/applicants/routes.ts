import { Router } from 'express';
import { ApplicantsController } from './controller';
import { upload } from '../common/middlewares/upload';

export class ApplicantsRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new ApplicantsController();

        router.post(
            '/applicants',
            upload.single('cv'),
            controller.createApplicant
        );

        return router;
    }
}
