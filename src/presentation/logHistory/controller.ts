import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { LogHistoryService } from '../services';


export class LogHistoryController {

    constructor(
        public readonly logHistoryService: LogHistoryService
    ){}

    public handleError = async(error: unknown, res: Response) => {

        if( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Interl server error' });

    }

    public getLogHistoryMessages = async( req: Request, res: Response ) => {

        try {
            
            const logHistory = await this.logHistoryService.getLogHistory();

            res.status(200).json(logHistory);
            return;

        } catch (error) {
            this.handleError( error, res );
        }

    }

}