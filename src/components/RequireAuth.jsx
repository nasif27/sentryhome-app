import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { Navigate } from "react-router-dom";

export default function RequireAuth({children}) {
    const token = useContext(AuthContext).token;
    const isLoggedIn = useContext(AuthContext).isLoggedIn;

    // if no token & login status = false, navigate to login page back
    if (!token && isLoggedIn === false) {
        return <Navigate to="/login" replace />
    }

    return children
}