import { Request, Response } from 'express';
import { CreatorApplicantService } from './services/create.service';
import { GetAllApplicantsService } from './services/get-all.service';
import { GetApplicantByIdService } from './services/get-by-id.service';
import { UpdateApplicantStatusService } from './services/update-status.service';
import { DeleteApplicantService } from './services/delete.service';
import { DownloadCVService } from './services/download-cv.service';
import { ApplicantStatus } from '../../data';

export class ApplicantsController {

    constructor(
        private readonly creatorService: CreatorApplicantService,
        private readonly getAllService = new GetAllApplicantsService(),
        private readonly getByIdService = new GetApplicantByIdService(),
        private readonly updateStatusService = new UpdateApplicantStatusService(),
        private readonly deleteService = new DeleteApplicantService(),
        private readonly downloadCVService = new DownloadCVService(),
    ) { }

    createApplicant = async (req: Request, res: Response) => {
        try {
            const result = await this.creatorService.execute(req.body, req.file!);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    getAll = async (_: Request, res: Response) => {
        const data = await this.getAllService.execute();
        res.json(data);
    };

    getById = async (req: Request, res: Response) => {
        try {
            const data = await this.getByIdService.execute(req.params.id);
            res.json(data);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    updateStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;
            const data = await this.updateStatusService.execute(
                req.params.id,
                status as ApplicantStatus
            );
            res.json(data);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const result = await this.deleteService.execute(req.params.id);
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    downloadCV = async (req: Request, res: Response) => {
        try {
            const result = await this.downloadCVService.execute(req.params.id);
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };
}
