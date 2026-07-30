import { Navigate } from "react-router"
import { useLogout } from "../../contexts/Session.context"

const Logout = () => {
    const onLogout = useLogout()
    onLogout()
    return <Navigate to="/login" />
}

export default Logout
