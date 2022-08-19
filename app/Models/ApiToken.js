import mongoose from "mongoose";

const apiTokenSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    experires_at: {
        type: String,
    }
}, {
    timestamps: true
});
const ApiToken = mongoose.model('ApiToken', apiTokenSchema);
export default ApiToken;