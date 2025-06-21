import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const EditFeedback = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Tool",
    rating: 1
  })

  const [error, setError] = useState("")

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const {data} = await axios.get(`/api/feedback/${id}`)
        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
          rating: data.rating
        })
      }
      catch(error) {
        setError("Failed to load feedback", error)
      }
    }

    fetchFeedback()

  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/feedback/${id}`, formData)
      navigate("/dashboard")
    }
    catch(error) {
      setError(error?.response?.data?.message || "Update failed")
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
    setError("")
  }

  return (
    <div className="lg:w-1/2 md:w-2/3 sm:w-full m-auto flex flex-col bg-gray-50 p-5 shadow-xl">
      <h2 className="text-center text-xl font-bold py-4">Edit Feedback</h2>
      <form onSubmit={handleSubmit} className="flex flex-col lg:gap-4 md:gap-3 sm:gap-2">
        <input className="border-1 border-gray-700 rounded-md px-3 py-2 outline-none" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

        <textarea className="border-1 border-gray-700 rounded-md px-3 py-2 outline-none" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows={5} />

        <select className="border-1 border-gray-700 rounded-md px-3 py-2 outline-none"  name="category" value={formData.category} onChange={handleChange}>
          <option value="Tool">Tool</option>
          <option value="Library">Library</option>
          <option value="Course">Course</option>
        </select>

        <input className="border-1 border-gray-700 rounded-md px-3 py-2 outline-none" type="number" name="rating" min={1} max={5} value={formData.rating} onChange={handleChange} required />

        <button className="bg-gray-900 text-slate-200 px-4 py-2 rounded-xl cursor-pointer" type="submit">Update Feedback</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  )
}

export default EditFeedback
