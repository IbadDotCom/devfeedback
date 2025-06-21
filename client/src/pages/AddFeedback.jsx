import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddFeedback = () => {
  const {token} = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Tool")
  const [rating, setRating] = useState(5)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/api/feedback", {title, description, category, rating}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSuccess("Feedback submitted successfully!")
      setError("")
      navigate("/dashboard")
    }
    catch(error) {
      const msg = error?.response?.data?.message || "Submission failed"
      setError(msg)
    }
  }

  return (
    <div className="lg:w-1/2 md:w-2/3 sm:w-full m-auto flex flex-col bg-gray-50 p-5 shadow-xl">
      <h2 className="text-center text-xl font-bold py-4">Add Feedback</h2>
      <form onSubmit={handleSubmit} className="flex flex-col lg:gap-4 md:gap-3 sm:gap-2">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="border-1 border-gray-700 rounded-md px-3 py-2 outline-none" />

        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="border-1 border-gray-700 rounded-md px-3 py-2 outline-none" />
        
        <select value={category} onChange={e => setCategory(e.target.value)} required className="border-1 border-gray-700 rounded-md px-3 py-2 outline-none" >
          <option value="Tool">Tool</option>
          <option value="Library">Library</option>
          <option value="Course">Course</option>
        </select>

        <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} required className="border-1 border-gray-700 rounded-md px-3 py-2 outline-none" />

        <button type="submit" className="bg-gray-900 text-slate-200 px-4 py-2 rounded-xl cursor-pointer">Submit Feedback</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      {success && <p style={{color: "green"}}>{success}</p>}
    </div>
  )
}

export default AddFeedback
