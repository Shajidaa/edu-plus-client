import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      {" "}
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default RootLayout;
