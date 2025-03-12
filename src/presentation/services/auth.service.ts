import { CustomError, RegisterUserDto } from '../../domain';
import { UserModel } from '../../database';

export class AuthService {

    constructor(){}

    public async registerUser( registerUserDto: RegisterUserDto ){
        console.log('It enters to the AuthService');
        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if ( existUser ) throw CustomError.badRequest('Email already exists');

        try {
            
            const user = new UserModel( registerUserDto );
            user.creationDate = new Date();
            await user.save();
            console.log(user);
            return user;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

}