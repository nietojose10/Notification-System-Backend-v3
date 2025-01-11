import mongoose, { Schema } from 'mongoose';

const NotificationTypeSchema = new Schema({
    notificationType:{
        type: String,
        required: [true, 'NotificationType is required']
    }
});

export const NotificationTypeModel = mongoose.model('NotificationType', NotificationTypeSchema );