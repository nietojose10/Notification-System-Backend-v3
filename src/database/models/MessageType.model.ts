import mongoose, { Schema } from 'mongoose';

const MessageTypeSchema = new Schema({
    messageType:{
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'MessageType is required']
    }
});

export const MessageTypeModel = mongoose.model('MessageType', MessageTypeSchema );