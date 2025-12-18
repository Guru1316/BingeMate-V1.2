import { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
const Login = () => {
  const { setActiveUser } = useOutletContext();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate= useNavigate();
  const handleSubmit = (e) => {
      e.preventDefault();
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const validUser = existingUsers.find(
          user => user.email === email && user.password === password
      );
      if (validUser) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("activeUser", validUser.email);
        setActiveUser(validUser.email);
        alert("Login Successful!");
        navigate("/");
      }
      else 
      {
        alert("Invalid Email or Password, or User not registered.");
      }
  }
  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        <label>Email</label>
        <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email" required></input>
        <label>Password</label>
        <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" required></input>
        <button className="loginButton" type="submit">
          Login
        </button>
        <Link to={'/register'} className="register">Don't Have An Account? Register</Link>
      </form>
    </div>
  );
};

export default Login;