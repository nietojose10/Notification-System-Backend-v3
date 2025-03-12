import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';

export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ){}

    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message });
        }

        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' });

    }

    public registerUser = async( req: Request, res: Response ) => {
        
        //use the dto to validate if data is correct

        const [error, registerDto] = RegisterUserDto.create(req.body);

        if ( error ) {
            res.status(400).json({ error });
            return;
        };

        try {
                
            const user = await this.authService.registerUser(registerDto!);

            res.json(user);
            return;

        } catch (error) {
            console.log(error);
            this.handleError( error, res );
        }

    }
    
}