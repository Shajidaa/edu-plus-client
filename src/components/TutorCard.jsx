import React from "react";
import {
  FiAward,
  FiFastForward,
  FiMail,
  FiMapPin,
  FiPhone,
  FiStar,
} from "react-icons/fi";
import GradientButton from "./Shared/GradientButton";

const TutorCard = ({ tutor }) => {
  return (
    <div
      key={tutor._id}
      className="rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 overflow-hidden group"
      style={{
        backgroundColor: "var(--color-card-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Tutor Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tutor.image || "/default-avatar.png"}
          alt={tutor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{tutor.name}</h3>
          <p className="text-white/90 text-sm">{tutor.role || "Tutor"}</p>
        </div>
      </div>

      {/* Tutor Details */}
      <div className="p-6">
        {/* Contact Info */}
        <div className="space-y-3 mb-4">
          {tutor.email && (
            <div className="flex items-center gap-3">
              <FiMail size={16} style={{ color: "var(--color-primary)" }} />
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {tutor.email}
              </span>
            </div>
          )}
          {tutor.phone && (
            <div className="flex items-center gap-3">
              <FiPhone size={16} style={{ color: "var(--color-primary)" }} />
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {tutor.phone}
              </span>
            </div>
          )}
          {tutor.location && (
            <div className="flex items-center gap-3">
              <FiMapPin size={16} style={{ color: "var(--color-primary)" }} />
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {tutor.location}
              </span>
            </div>
          )}
        </div>

        {/* Bio */}
        {tutor.bio && (
          <div className="mb-4">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {tutor.bio.length > 100
                ? `${tutor.bio.substring(0, 100)}...`
                : tutor.bio}
            </p>
          </div>
        )}

        {/* Qualification & Experience */}
        <div className="grid grid-cols-1 gap-3">
          {tutor.qualification && (
            <div
              className="p-3 rounded-lg border"
              style={{
                backgroundColor: "var(--color-bg-soft)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <FiFastForward
                  size={14}
                  style={{ color: "var(--color-success)" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-success)" }}
                >
                  Qualification
                </span>
              </div>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-dark)" }}
              >
                {tutor.qualification}
              </p>
            </div>
          )}

          {tutor.experience && (
            <div
              className="p-3 rounded-lg border"
              style={{
                backgroundColor: "var(--color-bg-soft)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <FiStar size={14} style={{ color: "var(--color-warning)" }} />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-warning)" }}
                >
                  Experience
                </span>
              </div>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-dark)" }}
              >
                {tutor.experience}
              </p>
            </div>
          )}
        </div>

        {/* Contact Button */}
        <div className="mt-6">
          <GradientButton
            className={" w-full hover:scale-105 transition-transform"}
          >
            {" "}
            View Profile{" "}
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
