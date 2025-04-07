import { LogHistoryModel } from '../../database';
import { CustomError, LogHistory } from '../../domain';

export class LogHistoryService {

    constructor(){}

    public getLogHistory = async(): Promise<LogHistory[]> => {
        
        try {
            
            const logHistory = await LogHistoryModel.find().populate('user').exec();

            return logHistory;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

}