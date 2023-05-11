import { useAuth } from "../context/authContext.js";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({children}){
    const {user, loading} = useAuth()

    if(!user) {
        return <Navigate to='/' />
    }
    if(loading) {
        return <h1>Loading</h1>
    }

    return <>{children}</>
}