import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'PhoneNumber is required'],
        trim: true
    },
    subscribed: {
        type: [String],
        lowercase: true,
    },
    channels: {
        type: [String],
        lowercase: true,
    },
    creationDate: {
        type: Date,
        required: [true, 'CreationDate is required']
    }
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function( doc, ret, options ) {
        delete ret._id;
    }
});

export const UserModel = mongoose.model('User', UserSchema );