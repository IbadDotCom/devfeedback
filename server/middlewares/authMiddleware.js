import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select("-password")
      if (!req.user) throw new Error("User not found with this token")

      next()
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" })
    }
  } else {
    res.status(401).json({ message: "No token, authorization failed" })
  }
}
