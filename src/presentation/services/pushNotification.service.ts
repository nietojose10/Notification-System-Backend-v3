import { HandleBroadcastingProcess, MessageData } from '../../domain';

export class PushNotificationService {

    constructor(){}

        public handlePushNotificationProcess = ( dataObject: MessageData ): Promise<HandleBroadcastingProcess> => {
            
            const pushNotificationProcess = new Promise<HandleBroadcastingProcess>( (resolve, reject) => {
        
                const num: number = 50;
        
                setTimeout(() => {
                        resolve({ 
                            ok: true,
                            messageData: { ...dataObject, channel: 'push notification', creationDate: new Date() }
                         });
                    }, Math.random() * 2000 + 1000
                );
        
                //Testing a rejected response
                if ( num === 10 ){
                    setTimeout(() => {
                        reject({
                            ok: false,
                            messageData: { ...dataObject, channel: 'push notification', creationDate: new Date() }
                        });
                    }, Math.random() * 2000 + 1000
                    );
                }
        
            });
        
            return pushNotificationProcess;
        }

}