import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import feedbackRoutes from "./routes/feedbackRoutes.js"
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/feedback", feedbackRoutes)

app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => res.send('Server started successfully!'))

app.listen(PORT, () => {
    connectDB()
    console.log(`Server running at http://localhost:${PORT}`)
})
