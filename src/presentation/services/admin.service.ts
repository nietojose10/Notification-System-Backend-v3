import { MessageTypeModel, NotificationTypeModel, UserModel } from '../../database';
import { CustomError, MessageTypeDto, MessageType, NotificationType, User } from '../../domain';
import { NotificationTypeDto } from '../../domain/dtos/admin/notificationType.dto';

export class AdminService {

    constructor(){}

    public createNotificationType = async( notificationTypeDto: NotificationTypeDto ): Promise<NotificationType> => {
        
        const existsNotificationType = await NotificationTypeModel.findOne({ notificationType: notificationTypeDto.notificationType });

        if ( existsNotificationType ) throw CustomError.badRequest('Notification type already exists');

        try {
            const notificationType = new NotificationTypeModel( notificationTypeDto! );
            await notificationType.save();

            return notificationType;

        } catch (error) {
            console.log(error);
            throw CustomError.internalServer(`${ error }`);
        }

    }

    public createMessageType = async( messageTypeDto: MessageTypeDto ): Promise<MessageType> => {
        
        const existsMessageType = await MessageTypeModel.findOne({ messageType: messageTypeDto.messageType });

        if ( existsMessageType ) throw CustomError.badRequest('Message type already exists');

        try {
            const messageType = new MessageTypeModel( messageTypeDto! );
            await messageType.save();

            return messageType;

        } catch (error) {
            console.log(error);
            throw CustomError.internalServer(`${ error }`);
        }
        
    }

    public getNotificationTypes = async(): Promise<NotificationType[]> => {

        try {
            
            const notificationTypes = await NotificationTypeModel.find().exec();

            return notificationTypes;

        } catch (error) {
            console.log(error);
            throw CustomError.internalServer(`${ error }`);
        }



    }

    public getMessageTypes = async(): Promise<MessageType[]> => {

        try {
            
            const messageTypes = await MessageTypeModel.find().exec();

            return messageTypes;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

    public getUsers = async(): Promise<User[]> => {
        try {
            
            const users = await UserModel.find().exec();

            return users;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

}