import express from "express"
import { createFeedback, deleteFeedback, getAllFeedback, getFeedbackById, updateFeedback } from "../controllers/feedbackController.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", getAllFeedback)
router.get("/:id", getFeedbackById)
router.post("/", protect, createFeedback)
router.put("/:id", protect, updateFeedback)
router.delete("/:id", protect, deleteFeedback)

export default router
