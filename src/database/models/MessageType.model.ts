import mongoose, { Schema } from 'mongoose';

const MessageTypeSchema = new Schema({
    messageType:{
        type: String,
        required: [true, 'MessageType is required']
    }
});

export const MessageTypeModel = mongoose.model('MessageType', MessageTypeSchema );