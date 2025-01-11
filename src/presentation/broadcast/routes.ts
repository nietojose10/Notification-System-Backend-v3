import { Router } from "express";
import { BroadcastController } from "./controller";

export class BroadcastRoutes {

    static get routes(): Router {

        const router = Router();

        const controller = new BroadcastController();

        router.use('/sendMessage', controller.sendMessage);

        return router;

    }

}