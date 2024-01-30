import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    charts: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chart",
        required: true,
        default: [],
        },
    ],
    onboarded: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'other',
    },
});



const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;