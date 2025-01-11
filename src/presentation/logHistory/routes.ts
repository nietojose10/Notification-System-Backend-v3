import { Router } from "express";
import { LogHistoryController } from "./controller";

export class LogHistoryRoutes {

    static get routes(): Router {

        const router = Router();

        const controller = new LogHistoryController();

        router.use('/getLogHistory', controller.getLogHistoryMessages );

        return router;
    }

}