import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Tool", "Library", "Course"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    }
}, { timestamps: true })

const Feedback = mongoose.model("Feedback", feedbackSchema)
export default Feedback
