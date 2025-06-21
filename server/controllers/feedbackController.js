import Feedback from "../models/Feedback.js"

// GET all feedback
export const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().populate("createdBy", "name").sort({ createdAt: -1 })
        res.json(feedback)
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch feedback" })
    }
}

// GET single feedback
export const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id).populate("createdBy", "name")
        if (!feedback) return res.status(404).json({ message: "Feedback not found" })
        res.json(feedback)
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving feedback" })
    }
}

// POST create feedback
export const createFeedback = async (req, res) => {
    const { title, description, category, rating } = req.body
    try {
        const feedback = await Feedback.create({
            title,
            description,
            category,
            rating,
            createdBy: req.user._id,
        })
        res.status(201).json(feedback)
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create feedback" })
    }
}

// PUT update feedback
export const updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id)
        if (!feedback) return res.status(404).json({ message: "Feedback not found" })

        if (feedback.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" })
        }

        const updated = await Feedback.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        )
        res.json(updated)
    }
    catch (error) {
        res.status(500).json({ message: "Update failed" })
    }
}

// DELETE delete feedback
export const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id)
        if (!feedback) return res.status(404).json({ message: "Feedback not found" })

        if (feedback.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" })
        }

        await feedback.deleteOne()
        res.json({ message: "Feedback removed" })
    }
    catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message })
    }
}
