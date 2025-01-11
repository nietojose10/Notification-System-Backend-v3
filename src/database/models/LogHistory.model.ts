import mongoose, { Schema } from 'mongoose';

const LogHistorySchema = new Schema({
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true
    },
    typeMessage: {
        type: String,
        lowercase: true,
        required: [true, 'TypeMessage is required']
    },
    channel:{
        type: String,
        lowercase: true,
        required: [true, 'Channel is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    creationDate: {
        type: Date,
        required: [true, 'CreationDate is required']
    }
});

export const LogHistoryModel = mongoose.model('LogHistory', LogHistorySchema );