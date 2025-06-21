import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { loginUser, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginUser({ email, password })
    }
    catch (error) {
      const msg = error?.response?.data?.message || error.message || "Login failed"
      setError(msg)
    }
  }

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value)
    setError("")
  }

  return (
    <div className="lg:w-1/2 md:w-2/3 sm:w-full m-auto flex flex-col bg-gray-50 p-5 shadow-xl">
      <h2 className="text-center text-xl font-bold py-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email address" value={email} onChange={handleInputChange(setEmail)} required className="border-1 border-gray-700 rounded-md px-3 py-2 outline-none" />

        <input type="password" placeholder="Password" value={password} onChange={handleInputChange(setPassword)} required className="border-1 border-gray-700 rounded-md px-3 py-2 outline-none" />

        <div className="flex items-center">
          <button type="submit" disabled={loading} className="bg-gray-900 text-slate-200 px-4 py-2 rounded-xl cursor-pointer w-1/2">{loading ? "Logging in..." : "Login"}</button>

          <Link className="w-1/3 m-auto" to="/register">
            Create new account?
          </Link>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  )
}

export default Login
