import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import { useEffect, useState } from "react"
import axios from "axios"

import FeedbackCard from "../components/FeedbackCard.jsx"

const Dashboard = () => {
  const { user, token } = useAuth()
  const [feedbacks, setFeedbacks] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("/api/feedback", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setFeedbacks(res.data)
      }
      catch (error) {
        setError(error?.response?.data?.message || "Failed to load feedbacks")
      }
    }

    fetchFeedbacks()
  }, [token])

  return (
    <div className="w-5/6 m-auto flex flex-col pb-8">
      <div>
        {user && <p className="text-center py-6 text-xl">Welcome back <strong>{user.name}</strong>, Your Feedbacks!</p>}

        {error && <p className="text-center py-6 text-xl text-red-900">{error}</p>}
      </div>

      <div className="lg:columns-3 md:columns-2 sm:columns-1 gap-4">
        
        {feedbacks.length === 0 ? (
          <p className="text-center py-6 text-xl">No feedback yet!</p>
        ) : (
          feedbacks.map(fb => <FeedbackCard key={fb._id} feedbacks={fb} />)
        )}
      </div>
    </div>
  )
}

export default Dashboard
