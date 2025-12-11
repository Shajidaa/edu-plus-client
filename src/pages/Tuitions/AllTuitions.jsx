import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
  FiSearch,
} from "react-icons/fi";

import Container from "../../components/Shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TuitionCard from "../../components/TuitionCard";
import Spinner from "../../components/Shared/Spinner";

import GradientHeading from "../../components/Shared/GradientHeading";

const AllTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const itemsPerPage = 8;

  // Fetch all tuitions
  const { data, isLoading, error } = useQuery({
    queryKey: ["allTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-tuitions`
      );
      return res.data;
    },
  });

  // Ensure data is an array
  const tuitions = Array.isArray(data) ? data : [];

  // Filter tuitions by search term (subject/location only)
  const filteredTuitions = tuitions.filter((tuition) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      tuition.subject?.toLowerCase().includes(searchLower) ||
      tuition.location?.toLowerCase().includes(searchLower)
    );
  });

  // Sort tuitions by budget or date
  const sortedTuitions = [...filteredTuitions].sort((a, b) => {
    if (sortBy === "budget-high") {
      return (b.budget || 0) - (a.budget || 0);
    } else if (sortBy === "budget-low") {
      return (a.budget || 0) - (b.budget || 0);
    } else if (sortBy === "date-new") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === "date-old") {
      return new Date(a.created_at) - new Date(b.created_at);
    }
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedTuitions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTuitions = sortedTuitions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page !== "..." && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 5;

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  if (isLoading) {
    return <Spinner></Spinner>;
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
              <span>Error loading tuitions: {error.message}</span>
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
      <Container className={"px-2.5"}>
        {/* Header Section */}
        <div className="text-center mb-12">
          <GradientHeading className="text-center mb-4" text="All Tuitions" />
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            Find the tuition that suits your skills! Explore every listing with
            detailed info so you can choose the best opportunity for your
            teaching journey.
          </p>
        </div>

        {/* Search and Sort Section */}
        <div
          className="rounded-xl shadow-lg p-6 mb-8 border"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: "var(--color-text-muted)" }}
                size={20}
              />
              <input
                type="text"
                placeholder="Search tuitions by subject or location..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="input input-bordered w-full pl-10 transition-all focus:border-primary"
                style={{
                  backgroundColor: "var(--color-bg-soft)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-dark)",
                }}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="select select-bordered min-w-[200px]"
              style={{
                backgroundColor: "var(--color-bg-soft)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-dark)",
              }}
            >
              <option value="">Sort by</option>
              <option value="budget-high">Budget: High to Low</option>
              <option value="budget-low">Budget: Low to High</option>
              <option value="date-new">Date: Newest First</option>
              <option value="date-old">Date: Oldest First</option>
            </select>
          </div>

          {/* Results Count */}
          <div
            className="mt-4 pt-4 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              Showing {currentTuitions.length} of {sortedTuitions.length}{" "}
              tuitions
              {searchTerm && (
                <span className="ml-2">
                  for "
                  <span style={{ color: "var(--color-primary)" }}>
                    {searchTerm}
                  </span>
                  "
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Tuitions Grid */}
        {currentTuitions.length > 0 ? (
          <>
            <Container className="grid gap-5 grid-cols-1 lg:grid-cols-4 md:grid-cols-3">
              {currentTuitions.map((tuition) => (
                <TuitionCard key={tuition._id} tuition={tuition} />
              ))}
            </Container>

            {/* Pagination */}
            {totalPages > 1 && (
              <Container
                className="rounded-xl shadow-lg p-6 mt-8 "
                style={{
                  backgroundColor: "var(--color-card-bg)",
                }}
              >
                <div className="flex justify-center items-center gap-2">
                  <button
                    className="btn btn-outline btn-sm hover:scale-105 transition-transform"
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                    style={{
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <FiChevronLeft size={16} />
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {getPageNumbers().map((page, index) => (
                      <div key={index}>
                        {page === "..." ? (
                          <span
                            className="px-3 py-2 flex items-center"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            <FiMoreHorizontal size={16} />
                          </span>
                        ) : (
                          <button
                            onClick={() => goToPage(page)}
                            className={`btn btn-sm hover:scale-105 transition-all ${
                              currentPage === page
                                ? "btn-primary shadow-lg"
                                : "btn-outline hover:btn-primary"
                            }`}
                            style={
                              currentPage === page
                                ? {
                                    backgroundColor: "var(--color-primary)",
                                    borderColor: "var(--color-primary)",
                                    color: "white",
                                  }
                                : {
                                    borderColor: "var(--color-primary)",
                                    color: "var(--color-primary)",
                                  }
                            }
                          >
                            {page}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn btn-outline btn-sm hover:scale-105 transition-transform"
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                    style={{
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    Next
                    <FiChevronRight size={16} />
                  </button>
                </div>
              </Container>
            )}
          </>
        ) : (
          <Container
            className="text-center py-20 rounded-xl shadow-lg border"
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
                <FiSearch
                  size={32}
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: "var(--color-text-dark)" }}
              >
                No tuitions found
              </h3>
              <p
                className="text-lg mb-6"
                style={{ color: "var(--color-text-muted)" }}
              >
                {searchTerm
                  ? `No tuitions match your search for "${searchTerm}". Try different keywords or clear your search.`
                  : "No tuitions are currently available. Check back later for new opportunities."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="btn btn-primary hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    borderColor: "var(--color-primary)",
                  }}
                >
                  Clear Search
                </button>
              )}
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default AllTuitions;
