import { useState } from "react";
import {
  FiUser,
  FiBook,
  FiStar,
  FiShield,
  FiClock,
  FiGlobe,
  FiArrowRight,
  FiZap,
  FiTrendingUp,
  FiAward,
  FiHeart,
  FiChevronDown,
  FiCheckCircle,
} from "react-icons/fi";
import Container from "../Shared/Container";
import GradientHeading from "../Shared/GradientHeading";

/* ─── accent colour map (CSS var → actual hex for rgba tints) ─── */
const ACCENT = {
  primary: { var: "var(--color-primary)", hex: "#1E3A8A" },
  secondary: { var: "var(--color-secondary)", hex: "#F97316" },
  success: { var: "var(--color-success)", hex: "#10B981" },
  warning: { var: "#f59e0b", hex: "#f59e0b" },
  info: { var: "#3B82F6", hex: "#3B82F6" },
  error: { var: "#EF4444", hex: "#EF4444" },
  purple: { var: "var(--color-purple)", hex: "#8B5CF6" },
};

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const steps = [
  {
    icon: <FiUser size={28} />,
    title: "Sign Up",
    desc: "Create your account quickly and easily with our streamlined registration process.",
    number: "01",
    color: "primary",
  },
  {
    icon: <FiBook size={28} />,
    title: "Choose a Tutor",
    desc: "Browse and select the best tutor for your subject from our verified professionals.",
    number: "02",
    color: "secondary",
  },
  {
    icon: <FiStar size={28} />,
    title: "Start Learning",
    desc: "Begin personalized lessons and track your progress with interactive tools.",
    number: "03",
    color: "success",
  },
];

const features = [
  {
    icon: <FiShield size={22} />,
    title: "Trusted & Verified",
    desc: "All tutors undergo rigorous verification for quality, credentials, and reliability. We perform background checks, credential validation, and test subject knowledge before any tutor is listed.",
    color: "primary",
    stats: "100% Verified",
    bullets: [
      "Background & credential checks",
      "Subject knowledge assessments",
      "Student rating system",
    ],
  },
  {
    icon: <FiClock size={22} />,
    title: "Flexible Timing",
    desc: "Schedule classes at your convenience with 24/7 availability and easy rescheduling. Fit learning around your life, not the other way around.",
    color: "warning",
    stats: "24/7 Available",
    bullets: [
      "Book anytime, anywhere",
      "Easy reschedule & cancellation",
      "Calendar sync support",
    ],
  },
  {
    icon: <FiGlobe size={22} />,
    title: "Global Access",
    desc: "Connect with expert tutors from around the world and learn from anywhere. Our platform bridges geographic gaps so the best education is always within reach.",
    color: "success",
    stats: "50+ Countries",
    bullets: [
      "Tutors from 50+ countries",
      "Multi-language support",
      "Online & in-person options",
    ],
  },
  {
    icon: <FiTrendingUp size={22} />,
    title: "Progress Tracking",
    desc: "Monitor your learning journey with detailed analytics and performance insights. See exactly where you are improving and where to focus next.",
    color: "info",
    stats: "Real-time Data",
    bullets: [
      "Session-by-session analytics",
      "Goal setting & milestones",
      "Printable progress reports",
    ],
  },
  {
    icon: <FiAward size={22} />,
    title: "Quality Assurance",
    desc: "Experience excellence with our quality-first approach and satisfaction guarantee. If you're not happy after the first session, we'll find you a better match — free.",
    color: "secondary",
    stats: "98% Satisfaction",
    bullets: [
      "First-session satisfaction guarantee",
      "Ongoing quality reviews",
      "Dedicated support team",
    ],
  },
  {
    icon: <FiHeart size={22} />,
    title: "Personalized Care",
    desc: "Receive individualized attention and customized learning plans for optimal results. Every student gets a roadmap designed specifically for their needs.",
    color: "purple",
    stats: "1-on-1 Focus",
    bullets: [
      "Custom learning roadmaps",
      "Regular progress check-ins",
      "Adaptive teaching style",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   ACCORDION ITEM
═══════════════════════════════════════════════════════════ */
const AccordionItem = ({ feature, index, isOpen, onToggle }) => {
  const accent = ACCENT[feature.color] ?? ACCENT.primary;

  return (
    <div
      className="rounded-2xl  border overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "var(--color-card-bg)",
        borderColor: isOpen ? accent.var : "var(--color-border)",
        boxShadow: isOpen
          ? `0 4px 24px ${accent.hex}22`
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* ── Trigger ── */}
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-200"
        style={{
          backgroundColor: isOpen ? `${accent.hex}0a` : "transparent",
        }}
        aria-expanded={isOpen}
      >
        {/* Icon bubble */}
        <span
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
          style={{
            backgroundColor: isOpen
              ? `${accent.hex}20`
              : "var(--color-bg-soft)",
            color: isOpen ? accent.var : "var(--color-text-muted)",
          }}
        >
          {feature.icon}
        </span>

        {/* Title + stat */}
        <div className="flex-1 min-w-0">
          <span
            className="text-base font-bold leading-tight block"
            style={{ color: "var(--color-text-dark)" }}
          >
            {feature.title}
          </span>
        </div>

        {/* Stat badge */}
        <span
          className="hidden sm:inline-flex flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full"
          style={{
            backgroundColor: `${accent.hex}18`,
            color: accent.var,
          }}
        >
          {feature.stats}
        </span>

        {/* Chevron */}
        <FiChevronDown
          size={18}
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            color: "var(--color-text-muted)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* ── Panel (animated via max-height trick) ── */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.25s ease",
        }}
      >
        <div
          className="px-5 pb-5 pt-1"
          style={{
            borderTop: `1px solid ${accent.hex}20`,
          }}
        >
          {/* Mobile stat badge */}
          <span
            className="sm:hidden inline-flex text-xs font-bold px-3 py-1 rounded-full mb-3"
            style={{
              backgroundColor: `${accent.hex}18`,
              color: accent.var,
            }}
          >
            {feature.stats}
          </span>

          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            {feature.desc}
          </p>

          {/* Bullet list */}
          <ul className="space-y-2">
            {feature.bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <FiCheckCircle
                  size={14}
                  className="flex-shrink-0"
                  style={{ color: accent.var }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const PlatformSections = () => {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const handleToggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div
      className="py-12 sm:py-16 lg:py-20"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      <Container>
        {/* ══════════════════════════════════
            HOW IT WORKS  (steps — unchanged)
        ══════════════════════════════════ */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-14 lg:mb-16 px-4 sm:px-0">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium animate-pulse mb-5"
              style={{ backgroundColor: "var(--color-primary-hover)" }}
            >
              <FiZap className="text-sm sm:text-base" />
              <span>How It Works</span>
            </div>

            <GradientHeading text="Simple Steps to Success" />
            <p
              className="mt-4 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Get started with our platform in just three easy steps and unlock
              your learning potential
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative px-4 sm:px-0">
            {/* Connector line (desktop) */}
            <div
              className="hidden sm:block absolute top-10 left-1/3 right-1/3 h-0.5"
              style={{ backgroundColor: "var(--color-border)" }}
            />

            {steps.map((step, i) => {
              const a = ACCENT[step.color] ?? ACCENT.primary;
              return (
                <div key={i} className="relative group">
                  <div
                    className="rounded-2xl p-6 sm:p-8 text-center border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
                    style={{
                      backgroundColor: "var(--color-card-bg)",
                      borderColor: "var(--color-border)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* dot pattern */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                        color: a.var,
                      }}
                    />

                    {/* Step number badge */}
                    <div
                      className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10"
                      style={{ backgroundColor: a.var }}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10"
                      style={{
                        backgroundColor: `${a.hex}18`,
                        color: a.var,
                      }}
                    >
                      {step.icon}
                    </div>

                    <h3
                      className="text-xl font-bold mb-3 relative z-10"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed relative z-10"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {/* Arrow (desktop) */}
                  {i < steps.length - 1 && (
                    <div
                      className="hidden sm:flex absolute -right-4 top-10 z-10 w-8 h-8 rounded-full items-center justify-center shadow"
                      style={{
                        backgroundColor: "var(--color-card-bg)",
                        border: "2px solid var(--color-border)",
                      }}
                    >
                      <FiArrowRight
                        size={14}
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════
            WHY CHOOSE US  (accordion)
        ══════════════════════════════════ */}
        <section>
          {/* Header */}
          <div className="text-center mb-10 px-4 sm:px-0">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium animate-pulse mb-5"
              style={{ backgroundColor: "var(--color-primary-hover)" }}
            >
              <FiZap className="text-sm sm:text-base" />
              <span>Why Choose Us</span>
            </div>

            <GradientHeading text="Experience the Difference" />
            <p
              className="mt-4 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Discover what makes our platform the preferred choice for
              thousands of learners worldwide
            </p>
          </div>

          {/* Two-column accordion grid */}
          <div className="grid grid-cols-1 max-w-5xl mx-auto   gap-4 px-4 sm:px-0">
            {features.map((feature, i) => (
              <AccordionItem
                key={i}
                feature={feature}
                index={i}
                isOpen={openIndex === i}
                onToggle={handleToggle}
              />
            ))}
          </div>

          {/* Stats strip */}
          <div
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border p-6"
            style={{
              backgroundColor: "var(--color-card-bg)",
              borderColor: "var(--color-border)",
            }}
          >
            {[
              { label: "Active Tutors", value: "1,200+", color: "primary" },
              { label: "Happy Students", value: "15,000+", color: "secondary" },
              { label: "Sessions Done", value: "80,000+", color: "success" },
              { label: "Satisfaction", value: "98%", color: "warning" },
            ].map((s, i) => {
              const a = ACCENT[s.color] ?? ACCENT.primary;
              return (
                <div key={i} className="text-center">
                  <p
                    className="text-2xl sm:text-3xl font-extrabold"
                    style={{ color: a.var }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default PlatformSections;
