import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    console.log(children);
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
        return children;
    }
    return <Navigate to={"/login"} replace></Navigate>;
};

export default ProtectedRoute;