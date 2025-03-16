import { EmailService } from "./email.service";
import { PushNotificationService } from "./pushNotification.service";
import { SmsService } from "./sms.service";
import { BroadcastingProcessDto, CustomError, User } from "../../domain";
import { LogHistoryModel, UserModel } from "../../database";

export class BroadcastService {

    constructor(
        private readonly emailService: EmailService,
        private readonly pushNotificationService: PushNotificationService,
        private readonly smsService: SmsService,
    ){}

    public getUsers = async( broadcastingProcessDto: BroadcastingProcessDto ) => {
        
        try {
            
            const { category, message } = broadcastingProcessDto;

            const users = await UserModel.find({ subscribed: category.toLowerCase() });
            
            if ( users.length === 0 ) throw CustomError.badRequest('There is no users available in the database');

            const usersSMS = users.filter( user => user.channels.includes('sms') );
            const usersEmail = users.filter( user => user.channels.includes('email') );
            const usersNotification = users.filter( user => user.channels.includes('push notification') );

            return { usersSMS, usersEmail, usersNotification };

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }


    public sendSMS = async( users: User[], broadcastingProcessDto: BroadcastingProcessDto ) => {

        try {
            
            let totalSmsSent = [];

            for ( const user of users ) {

                const { category, message } = broadcastingProcessDto;
                const response = await this.smsService.handleSmsProcess({ user: user._id as string, message: message, category: category });
                const { messageData } = response;
                const messageRecorded = new LogHistoryModel({ message: messageData.message, typeMessage: messageData.category, channel: messageData.channel, user: messageData.user, creationDate: messageData.creationDate });
                await messageRecorded.save();

                totalSmsSent.push(messageRecorded);
            }

            return totalSmsSent;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

    public sendEmail = async( users: User[], broadcastingProcessDto: BroadcastingProcessDto ) => {

        try {
            
            let totalEmailsSent = [];

            for ( const user of users ) {

                const { category, message } = broadcastingProcessDto;
                const response = await this.emailService.handleEmailProcess({ user: user._id as string, message: message, category: category });
                const { messageData } = response;
                const messageRecorded = new LogHistoryModel({ message: messageData.message, typeMessage: messageData.category, channel: messageData.channel, user: messageData.user, creationDate: messageData.creationDate });
                await messageRecorded.save();

                totalEmailsSent.push(messageRecorded);
            }

            return totalEmailsSent;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

    public sendPushNotifications = async( users: User[], broadcastingProcessDto: BroadcastingProcessDto ) => {

        try {
            
            let totalNotificationsSent = [];

            for ( const user of users ) {

                const { category, message } = broadcastingProcessDto;
                const response = await this.pushNotificationService.handlePushNotificationProcess({ user: user._id as string, message: message, category: category });
                const { messageData } = response;
                const messageRecorded = new LogHistoryModel({ message: messageData.message, typeMessage: messageData.category, channel: messageData.channel, user: messageData.user, creationDate: messageData.creationDate });
                await messageRecorded.save();

                totalNotificationsSent.push(messageRecorded);
            }

            return totalNotificationsSent;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }


}