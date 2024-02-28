import { Navigate } from "react-router-dom"

export function ProtecetdRoute({ children }) {
    if (localStorage.getItem('userToken')) //toekn = login
        return children
    else
        return <Navigate to={'/'} />
}