import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

const FeedbackCard = ({ feedbacks }) => {
  const { user, token } = useAuth()
  const isOwner = user?._id === feedbacks.createdBy._id
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this feedback?")
    if (!confirm) return

    try {
      await axios.delete(`/api/feedback/${feedbacks._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      window.location.reload()
    }
    catch (error) {
      alert(error?.response?.data?.message || "Delete failed")
    }
  }
  return (
    <div className="bg-slate-200 p-4 rounded-xl shadow-xl break-inside-avoid mb-5 h-fit">
      <h3 className="text-xl font-semibold mb-2">{feedbacks.title}</h3>
      <div className="text-gray-700 mb-2">
        <span><strong>Category:</strong>{" "}{feedbacks.category}{" "}</span>
        <span>⭐{feedbacks.rating}</span>
      </div>
      <p className="text-gray-700">{feedbacks.description}</p>
      <p><em>By {feedbacks.createdBy.name}</em></p>

      {isOwner && (
        <div className="text-sm my-4">
          <Link to={`/edit-feedback/${feedbacks._id}`}>
            <button className="cursor-pointer">Edit</button>
          </Link>
          <button onClick={handleDelete} className="bg-red-600 text-gray-50 mx-2 px-2 py-1 rounded-md cursor-pointer">
            Delete
          </button>
        </div>
      )}

    </div>
  )
}

export default FeedbackCard
