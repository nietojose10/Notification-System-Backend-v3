import { Document, Types } from 'mongoose';

export interface LogHistory extends Document {
    message: string,
    typeMessage: string,
    channel: string,
    user: Types.ObjectId,
    creationDate: Date
}