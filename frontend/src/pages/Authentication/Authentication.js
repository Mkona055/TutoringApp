
import { Navigate } from "react-router";
import SignUpLogin from "../../components/SignUpLogin/SignUpLogin";
import useAuth from "../../hooks/useAuth";

function Authentication() {  
    const {isAuthenticated} = useAuth();
    if (isAuthenticated()) {
        return <Navigate to="/feed"/>;
    }
        return (    
            <>
                <SignUpLogin/>
            </>
        );
}

export default Authentication;