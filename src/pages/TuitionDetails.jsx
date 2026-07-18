import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiMapPin,
  FiBook,
  FiCalendar,
  FiSend,
  FiPhone,
  FiInfo,
  FiLayers,
  FiCheckCircle,
  FiClock,
  FiAward,
} from "react-icons/fi";
import { BsCurrencyRupee } from "react-icons/bs";
import toast from "react-hot-toast";
import axios from "axios";
import useRole from "../hooks/useRole";
import ApplyTuitionModal from "../components/Modal/ApplyTuitionModal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Shared/Spinner";
import Container from "../components/Shared/Container";

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const isOpen = (status) => !status || status === "open" || status === "active";

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
const TuitionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [role, isRoleLoading] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: tuition,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tuition", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tuitions-details/${id}`,
      );
      return res.data;
    },
  });

  const handleApply = () => {
    if (!tuition) return;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
  };

  const handleApplicationSubmit = async (applicationData) => {
    try {
      setIsSubmitting(true);
      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/applications`,
        applicationData,
      );
      if (res.data) {
        toast.success(`Successfully applied for ${tuition.subject}!`);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Loading ── */
  if (isLoading || isRoleLoading) return <Spinner />;

  /* ── Error ── */
  if (error || !tuition) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "var(--color-bg-soft)" }}
      >
        <div
          className="flex flex-col items-center gap-4 p-10 rounded-2xl border shadow-xl max-w-md w-full text-center"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <FiInfo size={40} style={{ color: "var(--color-secondary)" }} />
          <h3
            className="text-xl font-bold"
            style={{ color: "var(--color-text-dark)" }}
          >
            Couldn't load tuition details
          </h3>
          <p style={{ color: "var(--color-text-muted)" }}>
            Please check your connection and try again.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 px-6 py-2 rounded-xl text-white font-semibold transition hover:opacity-90"
            style={{
              background:
                "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const open = isOpen(tuition.status);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      {/* ══════════════════════════════════
          HERO BANNER
      ══════════════════════════════════ */}

      <Container>
        <div className="relative z-10 py-10">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-500 text-sm font-medium mb-6 transition-colors group"
          >
            <FiArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Listings
          </button>
        </div>
      </Container>

      {/* ══════════════════════════════════
          BODY — 3-col / sidebar layout
      ══════════════════════════════════ */}
      <Container>
        <div className="py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─────────── LEFT SIDEBAR ─────────── */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            {/* Student card */}
            <div
              className="rounded-2xl border overflow-hidden shadow-lg"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              {/* Gradient header */}
              <div
                className="relative px-6 py-8 flex flex-col items-center text-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "18px 18px",
                  }}
                />
                {/* Avatar */}
                <div
                  className="relative z-10 w-24 h-24 rounded-full overflow-hidden border-4 shadow-xl mb-4"
                  style={{ borderColor: "rgba(255,255,255,0.8)" }}
                >
                  {tuition.studentPhoto ? (
                    <img
                      src={tuition.studentPhoto}
                      alt={tuition.studentName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-3xl font-extrabold text-white"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                    >
                      {tuition.studentName?.[0]?.toUpperCase() ?? "S"}
                    </div>
                  )}
                </div>
                <h3 className="relative z-10 text-xl font-bold text-white">
                  {tuition.studentName}
                </h3>
                <p className="relative z-10 text-white/70 text-sm mt-0.5">
                  Student
                </p>
              </div>

              {/* Contact rows */}
              <div className="p-5 space-y-3">
                <SectionLabel text="Contact Information" />

                {tuition.studentEmail && (
                  <ContactRow
                    icon={<FiMail size={15} />}
                    label="Email"
                    value={tuition.studentEmail}
                    accent="var(--color-primary)"
                  />
                )}
                {tuition.studentPhone && (
                  <ContactRow
                    icon={<FiPhone size={15} />}
                    label="Phone"
                    value={tuition.studentPhone}
                    accent="var(--color-secondary)"
                  />
                )}
                <ContactRow
                  icon={<FiCalendar size={15} />}
                  label="Posted On"
                  value={formatDate(tuition.created_at)}
                  accent="var(--color-success)"
                />
              </div>
            </div>

            {/* Apply button (tutors only) */}
            {role === "tutor" && (
              <button
                onClick={handleApply}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-base shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-95"
                style={{
                  background:
                    "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                  boxShadow: "0 6px 20px rgba(30,58,138,0.30)",
                }}
              >
                <FiSend size={18} />
                Apply for this Tuition
              </button>
            )}

            {/* Quick requirement checklist */}
            <div
              className="rounded-2xl border p-5 shadow-md"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <SectionLabel text="Quick Highlights" />
              <ul className="mt-3 space-y-2.5">
                {[
                  {
                    icon: <FiBook size={14} />,
                    text: `Subject: ${tuition.subject}`,
                  },
                  {
                    icon: <FiUser size={14} />,
                    text: `Class: ${tuition.class}`,
                  },
                  {
                    icon: <FiMapPin size={14} />,
                    text: `Location: ${tuition.location}`,
                  },
                  tuition.medium && {
                    icon: <FiLayers size={14} />,
                    text: `Medium: ${tuition.medium}`,
                  },
                  tuition.days_per_week && {
                    icon: <FiClock size={14} />,
                    text: `${tuition.days_per_week} days per week`,
                  },
                  {
                    icon: <FiCheckCircle size={14} />,
                    text: `Status: ${open ? "Open" : "Closed"}`,
                  },
                ]
                  .filter(Boolean)
                  .map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span style={{ color: "var(--color-secondary)" }}>
                        {item.icon}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          {/* ─────────── MAIN CONTENT ─────────── */}
          <main className="lg:col-span-2 flex flex-col gap-6">
            {/* Stat Cards row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard
                icon={<FiBook size={20} />}
                label="Subject"
                value={tuition.subject}
                accent="var(--color-primary)"
              />
              <StatCard
                icon={<FiAward size={20} />}
                label="Class"
                value={tuition.class}
                accent="var(--color-secondary)"
              />
              <StatCard
                icon={<FiMapPin size={20} />}
                label="Location"
                value={tuition.location}
                accent="var(--color-success)"
              />
              <StatCard
                icon={<BsCurrencyRupee size={20} />}
                label="Budget"
                value={`৳${tuition.budget?.toLocaleString() ?? "—"}`}
                accent="#f59e0b"
                highlight
              />
            </div>

            {/* Requirements grid */}
            <div
              className="rounded-2xl border shadow-md p-6"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <SectionLabel
                text="Tuition Requirements"
                accent="var(--color-secondary)"
              />

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoTile
                  icon={<FiBook size={18} />}
                  label="Subject"
                  value={tuition.subject}
                  accent="var(--color-primary)"
                />
                <InfoTile
                  icon={<FiUser size={18} />}
                  label="Class / Grade"
                  value={tuition.class}
                  accent="var(--color-secondary)"
                />
                <InfoTile
                  icon={<FiMapPin size={18} />}
                  label="Location"
                  value={tuition.location}
                  accent="var(--color-success)"
                />
                <InfoTile
                  icon={<BsCurrencyRupee size={18} />}
                  label="Monthly Budget"
                  value={`৳${tuition.budget?.toLocaleString() ?? "Negotiable"}`}
                  accent="#f59e0b"
                />
                {tuition.medium && (
                  <InfoTile
                    icon={<FiLayers size={18} />}
                    label="Medium"
                    value={tuition.medium}
                    accent="var(--color-purple)"
                  />
                )}
                {tuition.days_per_week && (
                  <InfoTile
                    icon={<FiClock size={18} />}
                    label="Days per Week"
                    value={`${tuition.days_per_week} days`}
                    accent="var(--color-primary)"
                  />
                )}
              </div>
            </div>

            {/* Description / Additional Info */}
            {tuition.description && (
              <div
                className="rounded-2xl border shadow-md p-6"
                style={{
                  backgroundColor: "var(--color-card-bg)",
                  borderColor: "var(--color-border)",
                }}
              >
                <SectionLabel
                  text="Additional Details"
                  accent="var(--color-primary)"
                />
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {tuition.description}
                </p>
              </div>
            )}

            {/* Teaching mode summary */}
            <div
              className="rounded-2xl border shadow-md p-6"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <SectionLabel text="Summary" accent="var(--color-primary)" />
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryChip
                  icon={<FiUser size={18} />}
                  label="Student Level"
                  value={tuition.class}
                  bg="var(--color-primary)"
                />
                <SummaryChip
                  icon={<FiMapPin size={18} />}
                  label="Teaching Mode"
                  value={
                    tuition.location?.toLowerCase().includes("online")
                      ? "Online"
                      : "In-Person"
                  }
                  bg="var(--color-success)"
                />
                <SummaryChip
                  icon={<FiCalendar size={18} />}
                  label="Payment Type"
                  value="Monthly"
                  bg="#f59e0b"
                />
              </div>
            </div>

            {/* CTA banner (tutors only) */}
            {role === "tutor" && (
              <div
                className="relative rounded-2xl overflow-hidden p-8 text-center shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative z-10">
                  <FiCheckCircle
                    size={36}
                    className="text-white mx-auto mb-3"
                  />
                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    Ready to Apply?
                  </h3>
                  <p className="text-white/75 mb-6 max-w-sm mx-auto">
                    This tuition is open. Click below to submit your application
                    and connect with the student.
                  </p>
                  <button
                    onClick={handleApply}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-base shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: "white",
                      color: "var(--color-primary)",
                    }}
                  >
                    <FiSend size={18} />
                    Apply Now
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </Container>

      {/* ── Modal ── */}
      <ApplyTuitionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        tuition={tuition}
        onSubmit={handleApplicationSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

/* ════════════════════════════════════════
   Sub-components
════════════════════════════════════════ */

const SectionLabel = ({ text, accent = "var(--color-primary)" }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-1 h-5 rounded-full flex-shrink-0"
      style={{ backgroundColor: accent }}
    />
    <h2
      className="text-lg font-bold"
      style={{ color: "var(--color-text-dark)" }}
    >
      {text}
    </h2>
  </div>
);

const ContactRow = ({ icon, label, value, accent }) => (
  <div
    className="flex items-start gap-3 p-3 rounded-xl"
    style={{ backgroundColor: "var(--color-bg-soft)" }}
  >
    <span
      className="mt-0.5 flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg"
      style={{ backgroundColor: `${accent}18`, color: accent }}
    >
      {icon}
    </span>
    <div className="min-w-0">
      <p
        className="text-xs font-medium"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </p>
      <p
        className="text-sm font-semibold truncate"
        style={{ color: "var(--color-text-dark)" }}
      >
        {value}
      </p>
    </div>
  </div>
);

const StatCard = ({ icon, label, value, accent, highlight }) => (
  <div
    className="rounded-2xl p-4 flex flex-col items-center text-center border transition hover:shadow-md"
    style={{
      backgroundColor: "var(--color-card-bg)",
      borderColor: "var(--color-border)",
    }}
  >
    <div
      className="w-10 h-10 flex items-center justify-center rounded-xl mb-2"
      style={{ backgroundColor: `${accent}18`, color: accent }}
    >
      {icon}
    </div>
    <p
      className="text-xs font-medium mb-0.5"
      style={{ color: "var(--color-text-muted)" }}
    >
      {label}
    </p>
    <p
      className={`font-extrabold leading-tight line-clamp-1 ${highlight ? "text-lg" : "text-sm"}`}
      style={{ color: highlight ? accent : "var(--color-text-dark)" }}
    >
      {value}
    </p>
  </div>
);

const InfoTile = ({ icon, label, value, accent }) => (
  <div
    className="flex items-start gap-3 p-4 rounded-xl border"
    style={{
      backgroundColor: `${accent}0d`,
      borderColor: `${accent}30`,
    }}
  >
    <span
      className="mt-0.5 flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl"
      style={{ backgroundColor: `${accent}20`, color: accent }}
    >
      {icon}
    </span>
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-wide mb-0.5"
        style={{ color: accent }}
      >
        {label}
      </p>
      <p
        className="text-base font-bold"
        style={{ color: "var(--color-text-dark)" }}
      >
        {value}
      </p>
    </div>
  </div>
);

const SummaryChip = ({ icon, label, value, bg }) => (
  <div
    className="flex flex-col items-center justify-center text-center p-5 rounded-2xl"
    style={{ backgroundColor: `${bg}12`, border: `1px solid ${bg}25` }}
  >
    <div
      className="w-11 h-11 flex items-center justify-center rounded-xl mb-3"
      style={{ backgroundColor: `${bg}20`, color: bg }}
    >
      {icon}
    </div>
    <p className="text-xs font-semibold mb-0.5" style={{ color: bg }}>
      {label}
    </p>
    <p
      className="text-sm font-bold"
      style={{ color: "var(--color-text-dark)" }}
    >
      {value}
    </p>
  </div>
);

export default TuitionDetails;
