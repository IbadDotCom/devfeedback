import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// create context
const AuthContext = createContext()

// provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token") || "")
    const [loading, setLoading] = useState(false)
    const [authReady, setAuthReady] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")

        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
            axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`
        }

        setAuthReady(true)
    }, [])

    // register user
    const registerUser = async (userData) => {
        setLoading(true)
        try {
            const res = await axios.post("/api/auth/register", userData)
            setToken(res.data.token)
            setUser(res.data)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data))
            navigate("/dashboard")
        }
        catch (error) {
            console.error("Registration Error: ", error)
            const message = error.response?.data?.message || "Registration failed"
            throw new Error(message)
        }
        finally {
            setLoading(false)
        }
    }

    // login user
    const loginUser = async (credentials) => {
        setLoading(true)
        try {
            const res = await axios.post("/api/auth/login", credentials)
            setToken(res.data.token)
            setUser(res.data)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data))
            navigate("/dashboard")
        }
        catch (error) {
            console.error("Login failed", error)
            throw error
        }
        finally {
            setLoading(false)
        }
    }

    // logout user
    const logoutUser = () => {
        setToken("")
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, registerUser, loginUser, logoutUser, authReady }}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook
export const useAuth = () => useContext(AuthContext)
