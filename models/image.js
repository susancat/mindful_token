import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
        name: String,
        timeSubmitted: Date,
        img: String
})
export default mongoose.models.Image || mongoose.model("Image", imageSchema);