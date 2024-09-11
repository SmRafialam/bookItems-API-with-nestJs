import * as mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
    }
}, {timestamps: true})