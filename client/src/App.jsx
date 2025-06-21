import { Routes, Route } from "react-router-dom"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Navbar from "./components/Navbar.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import AddFeedback from "./pages/AddFeedback.jsx"
import EditFeedback from "./pages/EditFeedback.jsx"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-feedback"
          element={
            <ProtectedRoute>
              <AddFeedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-feedback/:id"
          element={
            <ProtectedRoute>
              <EditFeedback />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
