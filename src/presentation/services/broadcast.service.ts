import { EmailService } from "./email.service";
import { PushNotificationService } from "./pushNotification.service";
import { SmsService } from "./sms.service";
import { BroadcastingProcessDto, CustomError, HandleBroadcastingProcess, User } from "../../domain";
import { LogHistoryModel, UserModel } from "../../database";

export class BroadcastService {

    constructor(
        private readonly emailService: EmailService,
        private readonly pushNotificationService: PushNotificationService,
        private readonly smsService: SmsService,
    ){}

    public getUsers = async( broadcastingProcessDto: BroadcastingProcessDto ) => {
        
        try {
            
            const { category } = broadcastingProcessDto;

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

            const { category, message } = broadcastingProcessDto;

            const totalSmsSent = await Promise.all(
                users.map( async (user) => {
                    const response = await this.smsService.handleSmsProcess({
                    user: user._id as string,
                    message,
                    category,
                    });

                    const { messageData } = response;

                    const messageRecorded = new LogHistoryModel({
                    message: messageData.message,
                    typeMessage: messageData.category,
                    channel: messageData.channel,
                    user: messageData.user,
                    creationDate: messageData.creationDate,
                    });

                    await messageRecorded.save();
                    return messageRecorded;
                })
            );

            return totalSmsSent;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

    public sendEmail = async( users: User[], broadcastingProcessDto: BroadcastingProcessDto ) => {

        try {

            const { category, message } = broadcastingProcessDto;

            const totalEmailsSent = await Promise.all(
                users.map( async (user) => {
                    const response = await this.emailService.handleEmailProcess({
                    user: user._id as string,
                    message,
                    category,
                    });

                    const { messageData } = response;

                    const messageRecorded = new LogHistoryModel({
                    message: messageData.message,
                    typeMessage: messageData.category,
                    channel: messageData.channel,
                    user: messageData.user,
                    creationDate: messageData.creationDate,
                    });

                    await messageRecorded.save();
                    return messageRecorded;
                })
            );

            return totalEmailsSent;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

    public sendPushNotifications = async( users: User[], broadcastingProcessDto: BroadcastingProcessDto ) => {

        try {

            const { category, message } = broadcastingProcessDto;

            const totalNotificationsSent = await Promise.all(
                users.map( async (user) => {
                    const response = await this.pushNotificationService.handlePushNotificationProcess({
                    user: user._id as string,
                    message,
                    category,
                    });

                    const { messageData } = response;

                    const messageRecorded = new LogHistoryModel({
                    message: messageData.message,
                    typeMessage: messageData.category,
                    channel: messageData.channel,
                    user: messageData.user,
                    creationDate: messageData.creationDate,
                    });

                    await messageRecorded.save();
                    return messageRecorded;
                })
            );

            return totalNotificationsSent;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

}