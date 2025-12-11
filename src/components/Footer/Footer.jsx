import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiBook,
  FiUsers,
  FiHelpCircle,
  FiShield,
  FiArrowUp,
  FiHeart,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Container from "../Shared/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "All Tuitions", path: "/all-tuitions" },
    { name: "Find Tutors", path: "/tutor" },

    { name: "About", path: "/about" },
  ];

  const supportLinks = [
    { name: "Help Center" },
    { name: "Contact Support" },
    { name: "FAQ" },
    { name: "Terms of Service" },
    { name: "Privacy Policy" },
    { name: "Cookie Policy" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn size={20} />,
      url: "https://www.linkedin.com/in/shajida-akter-lopa/",
      color: "#0A66C2",
    },
    {
      name: "GitHub",
      icon: <FaGithub size={20} />,
      url: "https://github.com/Shajidaa",
      color: "#333333",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF size={20} />,
      url: "https://www.facebook.com/people/Shajida-Akter-Lopa/pfbid02yCWV79YQmKVRYFH1PCeJ4pzz7ZNfPEteppycwvri99vvNUGfwvbsuSc6cEyG3gCsl/",
      color: "#1877F2",
    },
    {
      name: "X (Twitter)",
      icon: <RiTwitterXLine size={20} />,

      color: "#000000",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={20} />,

      color: "#E4405F",
    },

    {
      name: "YouTube",
      icon: <FaYoutube size={20} />,

      color: "#FF0000",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      {/* Main Footer Content */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Platform Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <FiBook size={18} className="text-white" />
                  </div>
                  EduPlus
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Connecting passionate learners with expert tutors worldwide.
                  Our platform makes quality education accessible, flexible, and
                  personalized for everyone's unique learning journey.
                </p>
              </div>

              {/* Platform Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FiUsers
                      size={16}
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span className="text-white font-semibold">10K+</span>
                  </div>
                  <p className="text-gray-400 text-sm">Active Students</p>
                </div>
                <div
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FiBook
                      size={16}
                      style={{ color: "var(--color-success)" }}
                    />
                    <span className="text-white font-semibold">500+</span>
                  </div>
                  <p className="text-gray-400 text-sm">Expert Tutors</p>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <FiBook size={14} className="text-white" />
                </div>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div
                        className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      ></div>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-warning)" }}
                >
                  <FiHelpCircle size={14} className="text-white" />
                </div>
                Support & Legal
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div
                        className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2"
                        style={{ backgroundColor: "var(--color-warning)" }}
                      ></div>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-success)" }}
                >
                  <FiMail size={14} className="text-white" />
                </div>
                Contact Us
              </h4>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mt-1"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <FiMail
                      size={16}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a
                      href="mailto:support@eduplus.com"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      support@eduplus.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mt-1"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <FiPhone
                      size={16}
                      style={{ color: "var(--color-success)" }}
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a
                      href="tel:+1234567890"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mt-1"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <FiMapPin
                      size={16}
                      style={{ color: "var(--color-warning)" }}
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-gray-300">
                      123 Education Street
                      <br />
                      Learning City, LC 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div>
                <h5 className="text-white font-medium mb-4">Follow Us</h5>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title={social.name}
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = social.color;
                          e.target.style.borderColor = social.color;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)";
                          e.target.style.borderColor =
                            "rgba(255, 255, 255, 0.2)";
                        }}
                      >
                        <span className="text-white transition-colors duration-300">
                          {social.icon}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Copyright Section */}
      <div
        className="border-t py-6"
        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-300">
              <span>© {currentYear} EduPlus. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with{" "}
                <FiHeart size={14} style={{ color: "var(--color-error)" }} />{" "}
                for education
              </span>
            </div>

            {/* Security & Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <FiShield size={16} style={{ color: "var(--color-success)" }} />
                <span className="text-sm">Secure Platform</span>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
              >
                <FiArrowUp
                  size={16}
                  className="group-hover:-translate-y-1 transition-transform"
                />
                <span className="text-sm font-medium">Top</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </footer>
  );
};

export default Footer;
