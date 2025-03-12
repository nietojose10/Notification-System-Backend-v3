import { regularExps } from '../../../config/regularExpressions';

export class RegisterUserDto {

    private constructor(
        public name: string,
        public email: string,
        public phoneNumber: string,
        public subscribed: String[],
        public channels: String[],
    ){}

    static create( object: { [key: string]: any }): [string?, RegisterUserDto?] {

        const { name, email, phoneNumber, subscribed, channels } = object;
        
        if ( !name ) return ['Missing name'];
        if ( !email ) return ['Missing email'];
        if ( !regularExps.email.test( email ) ) return ['Email is not valid'];
        if ( !phoneNumber ) return ['Missing phoneNumber'];
        if ( subscribed.length === 0 ) return ['Must have at least 1 notification type'];
        if ( channels.length === 0 ) return ['Must have at least 1 message type'];

        return [ undefined, new RegisterUserDto( name, email, phoneNumber, subscribed, channels )];

    }

}