import { Request, Response } from 'express';
import { CustomError, MessageTypeDto, NotificationTypeDto } from '../../domain';
import { AdminService } from '../services/admin.service';


export class AdminController {

    constructor(
        public readonly adminService: AdminService
    ){}

    public handleError( error: unknown, res: Response ){
        console.log(`Tipo de error: ${error}`);
        if ( error instanceof CustomError ){
            return res.status( error.statusCode ).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });

    }

    public createMessageType = async( req: Request, res: Response ) => {
        console.log('Creating new Message Type');

        const [error, messageTypeDto] = MessageTypeDto.create( req.body );

        if ( error ) this.handleError( error, res );

        try {
            
            const newMessageType = await this.adminService.createMessageType( messageTypeDto! );

            //*TEST A MESSAGE TYPE CREATION
            res.status(201).json(newMessageType);
            return;

        } catch (error) {
            this.handleError( error, res );
        }

    }

    public createNotificationType = async( req: Request, res: Response ) => {
        console.log('Creating new Notification Type');
        
        const [error, notificationTypeDto] = NotificationTypeDto.create( req.body );
        
        if ( error ) this.handleError( error, res );

        try {
            
            const newNotificationType = await this.adminService.createNotificationType( notificationTypeDto! );

            res.status(201).json(newNotificationType);
            return;

        } catch (error) {
            this.handleError( error, res );
        }

    }

    public getMessageType = async( req: Request, res: Response ) => {
        console.log('Showing all message type');

        try {
            
            const messageTypes = await this.adminService.getMessageTypes();

            res.status(200).json(messageTypes);
            return;

        } catch (error) {
            this.handleError( error, res );
        }
    }

    public getNotificationType = async( req: Request, res: Response ) => {

        console.log('Showing all notification type');

        try {
            
            const notificationTypes = await this.adminService.getNotificationTypes();
        
            res.status(200).json(notificationTypes);
            return;

        } catch (error) {
            this.handleError( error, res );
        }

    }

}