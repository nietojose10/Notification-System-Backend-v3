import { Response } from "express";
import { CustomError } from "../../domain";


export class AdminController {

    constructor(
        // public readonly adminService: AdminService
    ){}

    public handleError( error: unknown, res: Response ){

        if ( error instanceof CustomError ){
            return res.status( error.statusCode ).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });

    }

    public createMessageType() {
        console.log('Creating new Message Type');
    }

    public createNotificationType() {
        console.log('Creating new Notification Type');
    }

    public getMessageType() {
        console.log('Showing all message type');
    }

    public getNotificationType() {
        console.log('Showing all notification type')
    }

}