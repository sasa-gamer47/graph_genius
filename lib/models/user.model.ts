import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    // charts: [
    //     {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Chart",
    //     },
    // ],
    onboarded: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;