import mongoose from "mongoose";

const passwordResetSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);
export default PasswordReset;