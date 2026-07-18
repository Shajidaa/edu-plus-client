import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container";
import GradientHeading from "../../components/Shared/GradientHeading";
import {
  FiSearch,
  FiMapPin,
  FiFilter,
  FiX,
  FiUsers,
  FiChevronDown,
} from "react-icons/fi";
import TutorCard from "../../components/TutorCard";
import SkeletonTutor from "../../components/Loader/SkeletonTutor";
import { useState, useMemo } from "react";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "name_asc", label: "Name (A–Z)" },
  { value: "name_desc", label: "Name (Z–A)" },
];

const Tutor = () => {
  const axiosSecure = useAxiosSecure();

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [qualificationFilter, setQualificationFilter] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const {
    data: tutorData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-tutor"],
    queryFn: () =>
      axiosSecure
        .get(`${import.meta.env.VITE_API_URL}/tutors`)
        .then((res) => res.data),
  });

  const tutors = Array.isArray(tutorData) ? tutorData : [];

  // Derive unique locations and qualifications for filter dropdowns
  const uniqueLocations = useMemo(() => {
    const locs = tutors
      .map((t) => t.location)
      .filter(Boolean)
      .map((l) => l.trim());
    return [...new Set(locs)].sort();
  }, [tutors]);

  const uniqueQualifications = useMemo(() => {
    const quals = tutors
      .map((t) => t.qualification)
      .filter(Boolean)
      .map((q) => q.trim());
    return [...new Set(quals)].sort();
  }, [tutors]);

  // Filter + Search + Sort
  const filteredTutors = useMemo(() => {
    let result = [...tutors];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name?.toLowerCase().includes(q) ||
          t.email?.toLowerCase().includes(q) ||
          t.bio?.toLowerCase().includes(q) ||
          t.qualification?.toLowerCase().includes(q)
      );
    }

    if (locationFilter) {
      result = result.filter(
        (t) => t.location?.trim() === locationFilter
      );
    }

    if (qualificationFilter) {
      result = result.filter(
        (t) => t.qualification?.trim() === qualificationFilter
      );
    }

    if (sortBy === "name_asc") {
      result.sort((a, b) => a.name?.localeCompare(b.name));
    } else if (sortBy === "name_desc") {
      result.sort((a, b) => b.name?.localeCompare(a.name));
    }

    return result;
  }, [tutors, searchQuery, locationFilter, qualificationFilter, sortBy]);

  const hasActiveFilters =
    searchQuery || locationFilter || qualificationFilter || sortBy !== "default";

  const clearAllFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setQualificationFilter("");
    setSortBy("default");
  };

  if (isLoading) {
    return (
      <Container className="grid my-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <SkeletonTutor key={i} />
        ))}
      </Container>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen py-8"
        style={{ backgroundColor: "var(--color-bg-soft)" }}
      >
        <Container>
          <div className="text-center py-20">
            <div
              className="alert alert-error max-w-md mx-auto rounded-xl shadow-lg"
              style={{
                backgroundColor: "var(--color-error-bg)",
                borderColor: "var(--color-error)",
              }}
            >
              <span>Error loading tutors: {error.message}</span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      <Container>
        {/* ── Header ── */}
        <div className="text-center mb-10">
          <GradientHeading className="text-center mb-4" text="Find a Tutor" />
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            Browse through profiles of experienced educators ready to help
            students achieve their academic goals.
          </p>
        </div>

        {/* ── Search + Filter Bar ── */}
        <div
          className="rounded-2xl shadow-lg border p-5 mb-8"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex flex-col gap-4">
            {/* Row 1: Search */}
            <div className="relative">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                size={18}
                style={{ color: "var(--color-text-muted)" }}
              />
              <input
                id="tutor-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, bio or qualification…"
                className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-bg-soft)",
                  borderColor: searchQuery
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                  color: "var(--color-text-dark)",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:opacity-70 transition"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <FiX size={16} />
                </button>
              )}
            </div>

            {/* Row 2: Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Location Filter */}
              <div className="relative flex-1">
                <FiMapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  size={16}
                  style={{ color: "var(--color-secondary)" }}
                />
                <select
                  id="location-filter"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full appearance-none pl-9 pr-8 py-3 rounded-xl border text-sm outline-none cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-bg-soft)",
                    borderColor: locationFilter
                      ? "var(--color-secondary)"
                      : "var(--color-border)",
                    color: locationFilter
                      ? "var(--color-text-dark)"
                      : "var(--color-text-muted)",
                  }}
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  size={14}
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>

              {/* Qualification Filter */}
              <div className="relative flex-1">
                <FiFilter
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  size={16}
                  style={{ color: "var(--color-primary)" }}
                />
                <select
                  id="qualification-filter"
                  value={qualificationFilter}
                  onChange={(e) => setQualificationFilter(e.target.value)}
                  className="w-full appearance-none pl-9 pr-8 py-3 rounded-xl border text-sm outline-none cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-bg-soft)",
                    borderColor: qualificationFilter
                      ? "var(--color-primary)"
                      : "var(--color-border)",
                    color: qualificationFilter
                      ? "var(--color-text-dark)"
                      : "var(--color-text-muted)",
                  }}
                >
                  <option value="">All Qualifications</option>
                  {uniqueQualifications.map((qual) => (
                    <option key={qual} value={qual}>
                      {qual}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  size={14}
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>

              {/* Sort */}
              <div className="relative flex-1">
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none pl-4 pr-8 py-3 rounded-xl border text-sm outline-none cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-bg-soft)",
                    borderColor:
                      sortBy !== "default"
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                    color: "var(--color-text-dark)",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  size={14}
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>
            </div>
          </div>

          {/* Active-filter chips + result count */}
          <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Chip
                  label={`"${searchQuery}"`}
                  onRemove={() => setSearchQuery("")}
                />
              )}
              {locationFilter && (
                <Chip
                  icon={<FiMapPin size={12} />}
                  label={locationFilter}
                  onRemove={() => setLocationFilter("")}
                />
              )}
              {qualificationFilter && (
                <Chip
                  label={qualificationFilter}
                  onRemove={() => setQualificationFilter("")}
                />
              )}
              {sortBy !== "default" && (
                <Chip
                  label={`Sort: ${SORT_OPTIONS.find((o) => o.value === sortBy)?.label}`}
                  onRemove={() => setSortBy("default")}
                />
              )}
            </div>

            <div className="flex items-center gap-3">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                {filteredTutors.length} tutor
                {filteredTutors.length !== 1 ? "s" : ""} found
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-200 hover:opacity-80"
                  style={{
                    borderColor: "var(--color-secondary)",
                    color: "var(--color-secondary)",
                  }}
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        {filteredTutors.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 rounded-2xl shadow-lg border"
            style={{
              backgroundColor: "var(--color-card-bg)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="max-w-md mx-auto">
              <div
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-bg-soft)" }}
              >
                <FiUsers
                  size={32}
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: "var(--color-text-dark)" }}
              >
                No tutors found
              </h3>
              <p
                className="text-lg mb-6"
                style={{ color: "var(--color-text-muted)" }}
              >
                {hasActiveFilters
                  ? "Try adjusting your search or filters to find more tutors."
                  : "No tutors are currently registered. Check back later."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

/* ── Small chip component ── */
const Chip = ({ label, icon, onRemove }) => (
  <span
    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border transition-all duration-200"
    style={{
      backgroundColor: "var(--color-bg-soft)",
      borderColor: "var(--color-border)",
      color: "var(--color-text-dark)",
    }}
  >
    {icon}
    {label}
    <button
      onClick={onRemove}
      className="ml-0.5 hover:opacity-60 transition"
      aria-label="Remove filter"
    >
      <FiX size={12} />
    </button>
  </span>
);

export default Tutor;
