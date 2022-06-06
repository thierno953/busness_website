import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../features/authSlice";
import './style.css';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (auth._id) {
            navigate("/cart");
        }
    }, [auth._id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(user);
        dispatch(loginUser(user));
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="email"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button className="btn">
                    {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
                </button>
                {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
                <Link to="/register" style={{ fontSize: "12px" }}>
                    <p>Don't have an account ? Sign Up</p>
                </Link>
            </form>
        </div>
    )
}

export default Login