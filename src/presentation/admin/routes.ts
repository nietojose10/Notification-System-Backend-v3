import { Router } from 'express';
import { AdminController } from './controller';
import { AdminService } from '../services';


export class AdminRoutes {

    static get routes(): Router {

        const router = Router();

        const adminService = new AdminService();
        const controller = new AdminController( adminService );

        router.post('/newMessageType', controller.createMessageType );
        router.post('/newNotificationType', controller.createNotificationType );
        router.get('/getMessageTypes', controller.getMessageType );
        router.get('/getNotificationTypes', controller.getNotificationType );
        router.get('/getUsers', controller.getUsers );

        return router;
    }

}