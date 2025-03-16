import { HandleBroadcastingProcess, MessageData } from '../../domain';

export class EmailService {

    constructor(){}

    public handleEmailProcess = ( dataObject: MessageData ): Promise<HandleBroadcastingProcess> => {
        
        const emailProcess = new Promise<HandleBroadcastingProcess>( (resolve, reject) => {
    
            const num: number = 50;
    
            setTimeout(() => {
                    resolve({ 
                        ok: true,
                        messageData: { ...dataObject, channel: 'email', creationDate: new Date() }
                     });
                }, Math.random() * 2000 + 1000
            );
    
            //Testing a rejected response
            if ( num === 10 ){
                setTimeout(() => {
                    reject({
                        ok: false,
                        messageData: { ...dataObject, channel: 'email', creationDate: new Date() }
                    });
                }, Math.random() * 2000 + 1000
                );
            }
    
        });
    
        return emailProcess;
    }

}