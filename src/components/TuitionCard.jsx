import {
  FiBookOpen,
  FiMapPin,
  FiCalendar,
  FiArrowRight,
  FiLayers,
} from "react-icons/fi";
import { BsCurrencyRupee } from "react-icons/bs";
import { Link } from "react-router";

const SUBJECT_COLORS = [
  { bg: "rgba(30,58,138,0.10)", accent: "var(--color-primary)" },
  { bg: "rgba(249,115,22,0.10)", accent: "var(--color-secondary)" },
  { bg: "rgba(16,185,129,0.10)", accent: "var(--color-success)" },
  { bg: "rgba(139,92,246,0.10)", accent: "var(--color-purple)" },
];

const getColor = (str = "") => {
  const idx =
    str.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    SUBJECT_COLORS.length;
  return SUBJECT_COLORS[idx];
};

const formatDate = (date) => {
  if (!date) return "Recently";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const TuitionCard = ({ tuition }) => {
  const {
    subject,
    class: tuitionClass,
    location,
    budget,
    created_at,
    medium,
    days_per_week,
    status,
  } = tuition;

  const color = getColor(subject);
  const isOpen = !status || status === "open" || status === "active";

  return (
    <div
      className="group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{
        backgroundColor: "var(--color-card-bg)",
        borderColor: "var(--color-border)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Coloured header band ── */}
      <div
        className="relative px-5 pt-5 pb-8"
        style={{ backgroundColor: color.bg }}
      >
        {/* Status badge */}
        <div className="flex justify-between items-start mb-4">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full border"
            style={{
              color: isOpen ? "var(--color-success)" : "var(--color-text-muted)",
              borderColor: isOpen
                ? "var(--color-success)"
                : "var(--color-border)",
              backgroundColor: isOpen
                ? "rgba(16,185,129,0.10)"
                : "var(--color-bg-soft)",
            }}
          >
            {isOpen ? "● Open" : "● Closed"}
          </span>

          {/* Posted date */}
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            <FiCalendar size={11} />
            {formatDate(created_at)}
          </span>
        </div>

        {/* Subject */}
        <h3
          className="text-xl font-extrabold leading-tight line-clamp-1 mb-1"
          style={{ color: color.accent }}
        >
          {subject}
        </h3>

        {/* Class */}
        <p
          className="text-sm font-medium"
          style={{ color: "var(--color-text-muted)" }}
        >
          Class / Grade:&nbsp;
          <span style={{ color: "var(--color-text-dark)" }}>{tuitionClass}</span>
        </p>
      </div>

      {/* ── Wave divider ── */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-border), transparent)",
        }}
      />

      {/* ── Info grid ── */}
      <div className="flex flex-col flex-1 px-5 py-4 gap-3">
        <div className="grid grid-cols-2 gap-2">
          {/* Location */}
          <InfoChip
            icon={<FiMapPin size={13} />}
            label="Location"
            value={location}
            accent="var(--color-secondary)"
          />

          {/* Budget */}
          <InfoChip
            icon={<BsCurrencyRupee size={13} />}
            label="Budget / month"
            value={budget ? `৳${budget}` : "Negotiable"}
            accent="var(--color-success)"
            highlight
          />

          {/* Medium */}
          {medium && (
            <InfoChip
              icon={<FiBookOpen size={13} />}
              label="Medium"
              value={medium}
              accent="var(--color-primary)"
            />
          )}

          {/* Days per week */}
          {days_per_week && (
            <InfoChip
              icon={<FiLayers size={13} />}
              label="Days / week"
              value={`${days_per_week} days`}
              accent="var(--color-purple)"
            />
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* ── CTA ── */}
        <Link
          to={`/tuitions-details/${tuition._id}`}
          className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:gap-3 active:scale-95"
          style={{
            background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
            boxShadow: "0 4px 12px rgba(30,58,138,0.22)",
          }}
        >
          See Details
          <FiArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

/* ── Small reusable chip ── */
const InfoChip = ({ icon, label, value, accent, highlight }) => (
  <div
    className="flex items-start gap-2 p-2.5 rounded-xl min-w-0"
    style={{
      backgroundColor: `${accent}12`,
    }}
  >
    <span
      className="mt-0.5 flex-shrink-0"
      style={{ color: accent }}
    >
      {icon}
    </span>
    <div className="min-w-0">
      <p
        className="text-xs font-medium leading-none mb-0.5 truncate"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </p>
      <p
        className={`text-sm font-bold truncate ${highlight ? "text-base" : ""}`}
        style={{ color: highlight ? accent : "var(--color-text-dark)" }}
      >
        {value}
      </p>
    </div>
  </div>
);

export default TuitionCard;
