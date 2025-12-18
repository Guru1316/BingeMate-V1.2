// import '../App.css'

// const Register = () => {
//     return(
//         <div className="text">
//             <h1>Register Page</h1>
//         </div>
//     )
// }

// export default Register;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css'; 

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = existingUsers.find(user => user.email === email);
        if(userExists) {
            alert("User already exists!");
            navigate("/");
            return;
        }
        const newUser = { email, password };
        const updatedUsers = [...existingUsers, newUser];
        
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert("Registration Successful! Please Login.");
        navigate("/login");
    };
    return(
        <div className="login">
            <form className="loginForm" onSubmit={handleRegister}>
                <h2>Register</h2>
                <label>Email</label>
                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password</label>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="loginButton" type="submit">Register</button>
                <Link to={'/login'} className="register">Already Have An Account? Login</Link>
            </form>
        </div>
    )
}
export default Register;