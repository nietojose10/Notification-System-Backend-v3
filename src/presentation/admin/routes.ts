import { Router } from 'express';
import { AdminController } from './controller';


export class AdminRoutes {

    static get routes(): Router {

        const router = Router();

        const controller = new AdminController();

        router.post('/newMessageType', controller.createMessageType );
        router.post('/newNotificationType', controller.createNotificationType);
        router.get('/getMessageTypes', controller.getMessageType );
        router.get('/getNotificationTypes', controller.getNotificationType );

        return router;
    }

}