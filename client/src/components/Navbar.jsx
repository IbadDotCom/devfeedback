import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

const Navbar = () => {
  const { user, logoutUser } = useAuth()
  return (
    <div className="w-full flex justify-center items-center h-16 bg-slate-900 text-gray-200">
      <div className="w-1/2 px-8 font-bold text-xl">
        <Link to="/dashboard">devFeed</Link>
      </div>
      <div className="w-1/2 flex justify-end">
        {user &&
          <div className="px-8 text-sm">
            <button className="px-4 cursor-pointer" onClick={logoutUser}>Logout</button>
            <Link to="/add-feedback" className="px-4 py-2 rounded-xl bg-gray-200 text-slate-900">
              <button className="cursor-pointer">Add New Feedback</button>
            </Link>
          </div>}
      </div>
    </div>
  )
}

export default Navbar
