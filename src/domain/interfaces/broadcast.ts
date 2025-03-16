import { Document } from 'mongoose';

export interface User extends Document {
    name: string,
    email: string,
    phoneNumber: string,
    subscribed: string[],
    channels: string[],
    creationDate?: Date
}

export interface MessageData {
    user: string,
    message: string,
    category: string,
    channel?: string,
    creationDate?: Date
}

export interface HandleBroadcastingProcess {
    ok: boolean,
    messageData: MessageData
}