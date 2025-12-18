import '../App.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({ setActiveUser }) => {
    const navigate = useNavigate();
    const auth = localStorage.getItem("auth");

    const handleLogout = () => {
        localStorage.removeItem("auth");
        alert("Logged Out Successfully");
        setActiveUser(null);
        localStorage.removeItem("activeUser");
        navigate("/");
    }

    const titleHandler = () => {
        if(auth === "true")
        {
            return(
                navigate("/home")
            )
        }
    }

    return (
        <>
            <header className='header'>
                <div className='tit'>
                <img src={`${import.meta.env.BASE_URL}image.png`} alt="logo" />
                <h1 className='name' onClick={titleHandler}>Binge <span className='mate'>Mate</span></h1>
                </div>
                <div className='links'>

                    {auth === "true" && (
                        <>
                            <NavLink to={"/home"}>Home</NavLink>
                            <NavLink to={"/diary"}>Diary</NavLink>
                            <NavLink to={"/addSeries"}>Add Series</NavLink>
                            {/* <NavLink to={"/reviews"}>Reviews</NavLink> */}
                            <NavLink to={"/watchlist"}>Watchlist</NavLink>
                        </>
                    )}

                    {auth === "true" ? (
                        <a onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a>
                    ) : (
                    <>
                        <NavLink to={"/"}>Login</NavLink>
                        <NavLink to={"/register"}>Register</NavLink>
                    </>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;
