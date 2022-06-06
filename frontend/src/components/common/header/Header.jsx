import React, { useState } from "react"
import "./header.css"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { logoutUser } from "../../../features/authSlice"

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("active", window.scrollY > 180);
  });

  return (
    <>
      <header className="header">
        <div className="container flex">
          <div className="logo">
            <h1><Link to="/">Thierno</Link></h1>
          </div>
          <Link to="/cart"><i class="fa-solid fa-cart-arrow-down">({cartTotalQuantity})</i></Link>
          <div className="nav">
            <ul
              className={sidebar ? "nav-links-sidebar" : "nav-links"}
              onClick={() => setSidebar(false)}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/login">
                  <button className='btn1'>
                    {/* <i className='fa fa-sign-out'></i> Sign In */}
                    {auth._id ? (
                      <button
                        onClick={() => {
                          dispatch(logoutUser(null));
                          toast.warning("Logged out!", { position: "bottom-left" });
                        }}
                      >
                        <i className='fa fa-sign-out'></i> Logout
                      </button>
                    ) : (
                      <>
                        <Link to="/login"><i className='fa fa-sign-out'></i>Login</Link>
                      </>
                    )}
                  </button>
                </Link>
              </li>

            </ul>
          </div>
          <button
            className="navbar-items-icon"
            onClick={() => setSidebar(!sidebar)}
          >
            {sidebar ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
    </>
  )
}

export default Header


