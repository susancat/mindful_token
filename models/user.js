import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    icon: String,
    images: Array,
    wallet: String,
    mintPassId: Array,
    allowSubmission: { type: Boolean, default: true },
    submissionTime: Date
})

export default mongoose.models.User || mongoose.model("User", UserSchema);