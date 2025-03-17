import mongoose, { Schema } from 'mongoose';

const NotificationTypeSchema = new Schema({
    notificationType: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'NotificationType is required']
    }
});

NotificationTypeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function( doc, ret, options ) {
        delete ret._id;
    }
});

export const NotificationTypeModel = mongoose.model('NotificationType', NotificationTypeSchema );