import mongoose, { Schema } from 'mongoose';

const MessageTypeSchema = new Schema({
    messageType:{
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'MessageType is required']
    }
});

MessageTypeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function( doc, ret, options ) {
        delete ret._id;
    }
});

export const MessageTypeModel = mongoose.model('MessageType', MessageTypeSchema );