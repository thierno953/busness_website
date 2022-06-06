import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../features/authSlice";
import './style.css';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        name: "",
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
        dispatch(registerUser(user));
    };


    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="name"
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
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
                    {auth.rigisterStatus === "pending" ? "Submitting..." : "Register"}
                </button>
                {auth.registerStatus === "rejected" ? (
                    <p>{auth.registerError}</p>
                ) : null}
                <Link to="/login" style={{ fontSize: "12px" }}>
                    <p>Already have an account ? Sign In</p>
                </Link>
            </form>

        </div>
    )
}

export default Register