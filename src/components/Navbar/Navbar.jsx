import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { Link } from "react-router-dom";
import { logout } from "../../firebase";

const Navbar = () => {
  const navRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Netflix logo" />
        </Link>

        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/tvshows">
            <li>TV Shows</li>
          </Link>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} className="icons" />
        <p>Watch</p>
        <img src={bell_icon} className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} className="profile" />
          <img src={caret_icon} />
          <div className="dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
