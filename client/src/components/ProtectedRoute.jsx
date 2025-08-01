import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

const ProtectedRoute = ({ children }) => {
  const { user, authReady } = useAuth()

  if (!authReady) return null

  return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute
