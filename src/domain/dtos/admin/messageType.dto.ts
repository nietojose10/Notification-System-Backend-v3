
export class MessageTypeDto {

    private constructor(
        public messageType: string
    ){}

    static create( object: { [key:string]: any}): [string?, MessageTypeDto?]{

        const { messageType } = object;

        if ( !messageType ) return ['Missing the message type name'];

        return [undefined, new MessageTypeDto( messageType.toLowerCase() )];
    }

}