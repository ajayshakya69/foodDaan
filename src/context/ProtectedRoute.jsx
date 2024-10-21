import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate()

    console.log(isLoggedIn)

    useEffect(() => {
        console.log("asdf")

        if (isLoggedIn === "false") {
            console.log("navigated")
            navigate('/login')
        }
    }, [navigate, isLoggedIn])

    return (
        children
    )
}
