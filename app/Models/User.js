import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    email_verified_at: {
        type: Date,
    },
    password: {
        type: String,
        required: true,
    },
    remember_token: {
        type: String,
    }
}, {
    timestamps: true
});

const user = mongoose.model('User', userSchema);
export default user;