import { Document } from 'mongoose';

export interface MessageType extends Document {
    messageType: string
}