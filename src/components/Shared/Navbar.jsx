import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthContext";
import Container from "./Container";
import MyLink from "./MyLink";
import Spinner from "./Spinner";

function Navbar() {
  const { user, loading, logOutFunc } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const logOut = () => {
    logOutFunc();
    toast.success("Logout successfully");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  if (loading) return <Spinner></Spinner>;
  const menuItems = (
    <>
      <li>
        <MyLink path="/">Home</MyLink>
      </li>
      <li>
        <MyLink path="/all-tuitions">Tuitions</MyLink>
      </li>
      <li>
        <MyLink path="/about">About</MyLink>
      </li>
      {user && (
        <li>
          <MyLink path="/dashboard">Dashboard</MyLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className="shadow-lg px-4"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <Container className="navbar text-white">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button className="btn btn-ghost text-white" onClick={toggleMenu}>
              ☰
            </button>
          </div>

          <Link
            to="/"
            className="text-xl font-bold tracking-wide ml-2 hover:text-(--color-secondary) transition"
          >
            Edu Plus
          </Link>
        </div>

        {/* Center - Desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{menuItems}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-white"
              >
                <div className="w-10 rounded-full">
                  <img alt={user?.displayName} src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
                style={{ backgroundColor: "var(--color-card-bg)" }}
              >
                <li className="menu-title">
                  <span>{user?.displayName}</span>
                </li>
                <button
                  className="btn w-full text-white"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                  onClick={logOut}
                >
                  Logout
                </button>
              </ul>
            </div>
          ) : (
            <>
              <MyLink
                to="/login"
                className="btn btn-sm text-white"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                Login
              </MyLink>
              <MyLink
                to="/register"
                className="btn btn-sm border border-white hover:text-black"
              >
                Register
              </MyLink>
            </>
          )}
        </div>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <ul className="menu flex flex-col px-4 py-2 gap-1">{menuItems}</ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
