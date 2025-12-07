import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthContext";
import Container from "./Container";

function Navbar() {
  const { user, logOutFunc } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const logOut = () => {
    logOutFunc();
    toast.success("Logout successfully");
  };

  return (
    <div className="bg-base-100 shadow-lg px-4">
      <Container className="navbar">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            Edu Plus
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>

          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt={user?.displayName || "User"}
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li className="menu-title">
                    <span>{user?.displayName || "User"}</span>
                  </li>

                  <button className="btn  btn-error" onClick={logOut}>
                    Logout
                  </button>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
