import { Request, Response } from 'express';
import { BroadcastingProcessDto, CustomError } from "../../domain";
import { BroadcastService } from "../services";


export class BroadcastController {

    constructor(
        private readonly broadcastService: BroadcastService
    ){}

    public handleError( error: unknown, res: Response){

        if ( error instanceof CustomError ){
            return res.status( error.statusCode ).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });

    }

    public broadcastMessage = async( req: Request, res: Response ) => {
        console.log('Broadcasting several messages!!');

        const [error, broadcastingProcessDto] = BroadcastingProcessDto.create( req.body );

        if ( error ) this.handleError( error, res );

        try {

            const { usersSMS, usersEmail, usersNotification } = await this.broadcastService.getUsers( broadcastingProcessDto! );

            const totalSMSSent = await this.broadcastService.sendSMS( usersSMS, broadcastingProcessDto! );
            const totalEmailsSent = await this.broadcastService.sendEmail( usersEmail, broadcastingProcessDto! );
            const totalNotificationsSent = await this.broadcastService.sendPushNotifications( usersNotification, broadcastingProcessDto! );

            res.status(200).json({
                ok: true,
                messagesSent: [...totalSMSSent, ...totalEmailsSent, ...totalNotificationsSent]
            });
            return;

        } catch (error) {
            this.handleError( error, res );
        }

    }

}