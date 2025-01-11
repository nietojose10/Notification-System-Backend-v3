import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { AdminRoutes } from './admin/routes';
import { BroadcastRoutes } from './broadcast/routes';
import { LogHistoryRoutes } from './logHistory/routes';

export class AppRoutes {

    static get routes(): Router {
        
        const router = Router();

        //Defining general routes
        router.use('/api/v3/auth', AuthRoutes.routes );
        router.use('/api/v3/admin', AdminRoutes.routes );
        router.use('/api/v3/broadcast', BroadcastRoutes.routes );
        router.use('/api/v3/logHistory', LogHistoryRoutes.routes );

        return router;
    }

}