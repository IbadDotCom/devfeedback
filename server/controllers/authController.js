import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// @route POST /api/auth/register
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userExists = await User.findOne({ email })

        if (userExists) return res.status(400).json({ message: "User already exists" })

        const user = await User.create({ name, email, password })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id)
        })
    }
    catch (error) {
        res.status(500).json({ message: "Registration failed", error })
    }
}

// @route /api/auth/login
export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email })
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        res.status(201).json({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id)
        })
    }
    catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message })
    }
}
