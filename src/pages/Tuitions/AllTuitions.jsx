import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import Container from "../../components/Shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TuitionCard from "../../components/TuitionCard";
import Spinner from "../../components/Shared/Spinner";
import GradientHeading from "../../components/Shared/GradientHeading";
const AllTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  // const [tuition, setTuition] = useState([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["allTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-tuitions`
      );
      return res.data;
    },
  });
  // const sortByBudgetHighToLow = () => {
  //   const sorted = [...data].sort((a, b) => b.amount - a.amount);
  //   setTuition(sorted);
  // };

  // const sortByNewest = () => {
  //   const sorted = [...data].sort(
  //     (a, b) => new Date(b.created_at) - new Date(a.created_at)
  //   );
  //   setTuition(sorted);
  // };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  // Filter tuitions based on search
  const filteredTuitions = data?.filter((tuition) => {
    const matchesSearch =
      tuition.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tuition.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tuition.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tuition.studentName?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });
  return (
    <Container>
      <div>
        <GradientHeading
          className={"text-center"}
          text={"All tuitions"}
        ></GradientHeading>

        <p>
          Find the tuition that suits your skills! Explore every listing with
          detailed info so you can choose the best opportunity for your teaching
          journey.
        </p>
      </div>

      <div>
        {/* Search Section */}
        <div
          className="rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FiSearch
                className="absolute left-3 z-10 top-1/2 -translate-y-1/2"
                style={{ color: "var(--color-text-muted)" }}
                size={20}
              />
              <input
                type="text"
                placeholder="Search by subject, location, class, or student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered pl-10 transition-all focus:border-primary"
                style={{ backgroundColor: "var(--color-bg-soft)" }}
              />
            </div>

            {/* Results Count */}
            <div
              className="text-xs sm:text-sm whitespace-nowrap font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              Showing {filteredTuitions?.length || 0} of {data?.length || 0}{" "}
              tuitions
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 lg:grid-cols-4 md:grid-cols-3">
        {filteredTuitions?.map((tuition) => (
          <TuitionCard key={tuition._id} tuition={tuition} />
        ))}
      </div>
    </Container>
  );
};

export default AllTuitions;
