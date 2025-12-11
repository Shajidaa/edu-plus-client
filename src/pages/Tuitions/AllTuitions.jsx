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

  // Pagination calculations
  const totalPages = Math.ceil(filteredTuitions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTuitions = filteredTuitions.slice(startIndex, endIndex);

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
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div>Error: {error.message}</div>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <GradientHeading
          className={"text-center"}
          text={"All Tuitions"}
        ></GradientHeading>
        <p>
          Find the tuition that suits your skills! Explore every listing with
          detailed info so you can choose the best opportunity for your teaching
          journey.
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search tuitions by subject or location..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="input input-bordered w-full pl-10"
          />
        </div>
      </div>

      {/* Tuitions Grid */}
      {currentTuitions.length > 0 ? (
        <>
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-4 md:grid-cols-3">
            {currentTuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                className="btn btn-outline btn-sm"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                <FiChevronLeft size={16} />
                Previous
              </button>

              {getPageNumbers().map((page, index) => (
                <div key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-2">
                      <FiMoreHorizontal size={16} />
                    </span>
                  ) : (
                    <button
                      onClick={() => goToPage(page)}
                      className={`btn btn-sm ${
                        currentPage === page ? "btn-primary" : "btn-outline"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </div>
              ))}

              <button
                className="btn btn-outline btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
                <FiChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3>No tuitions available</h3>
          <p>Check back later for new opportunities.</p>
        </div>
      )}
    </Container>
  );
};

export default AllTuitions;
