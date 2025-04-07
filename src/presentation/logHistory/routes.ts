import { Router } from 'express';
import { LogHistoryController } from './controller';
import { LogHistoryService } from '../services';

export class LogHistoryRoutes {

    static get routes(): Router {

        const router = Router();

        const logHistoryService = new LogHistoryService();
        const controller = new LogHistoryController(logHistoryService);

        router.use('/getLogHistory', controller.getLogHistoryMessages );

        return router;
    }

}