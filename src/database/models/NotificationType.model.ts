import mongoose, { Schema } from 'mongoose';

const NotificationTypeSchema = new Schema({
    notificationType: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'NotificationType is required']
    }
});

export const NotificationTypeModel = mongoose.model('NotificationType', NotificationTypeSchema );