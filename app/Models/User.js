import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
        default: null
    },
    password: {
        type: String,
        required: true,
    },
    remember_token: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});
userSchema.pre('save', async function (next) {
    if (!SexPistols_1this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comparePassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm,this.password);
}
// activar/ desactivar la confirmacion de email
userSchema.methods.confirmEmail = function () {
    return false;
}
const User = mongoose.model('User', userSchema);
export default User;