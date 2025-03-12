
export class NotificationTypeDto {

    private constructor(
        public notificationType: string
    ){}

    static create( object: { [key: string]: any }): [string?, NotificationTypeDto?] {
        console.log(object);
        const { notificationType } = object;

        if ( !notificationType ) return ['Missing the notification type name'];

        return [ undefined, new NotificationTypeDto( notificationType.toLowerCase() )];
    }

}