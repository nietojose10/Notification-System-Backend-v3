import { Document } from 'mongoose';

export interface NotificationType extends Document {
    notificationType: string;
}