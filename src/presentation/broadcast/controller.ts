import { Response } from "express";
import { CustomError } from "../../domain";


export class BroadcastController {

    constructor(
        // public readonly broadcastService: BroadcastService
    ){}

    public handleError( error: unknown, res: Response){

        if ( error instanceof CustomError ){
            return res.status( error.statusCode ).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });

    }

    public sendMessage(){
        console.log('Broadcasting several messages!!');
    }

}