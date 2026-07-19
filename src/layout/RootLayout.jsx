import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Footer/Footer";
import WhatsAppLiveWidget from "../components/Shared/WhatsAppWidget";
import AIChatWidget from "../components/Shared/AIChatWidget";

const RootLayout = () => {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-bg-main)",
        color: "var(--color-text-dark)",
      }}
    >
      <Navbar />
      <Outlet />
      <WhatsAppLiveWidget />
      <AIChatWidget />
      <Footer />
    </div>
  );
};

export default RootLayout;
