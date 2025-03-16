import { Router } from 'express';
import { BroadcastController } from './controller';
import { BroadcastService, EmailService, PushNotificationService, SmsService } from '../services';

export class BroadcastRoutes {

    static get routes(): Router {

        const router = Router();
        const smsService = new SmsService();
        const emailService = new EmailService();
        const pushNotificationService = new PushNotificationService();
        const broadcastService = new BroadcastService( emailService, pushNotificationService, smsService );
        const controller = new BroadcastController( broadcastService );

        router.use('/sendMessage', controller.broadcastMessage );

        return router;

    }

}