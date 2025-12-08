import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiSearch, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";

const MyTuitions = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: tuitionData,
    isLoading: tuitionDataLoading,
    error,
  } = useQuery({
    queryKey: ["tuitions", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`${import.meta.env.VITE_API_URL}/tuitions?status=approved`)
        .then((res) => res.data),
  });

  if (loading || tuitionDataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-600 dark:text-gray-400">
            Loading approved tuitions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <span>Error loading tuitions. Please try again later.</span>
        </div>
      </div>
    );
  }

  // Filter tuitions based on search
  const filteredTuitions = tuitionData?.filter((tuition) => {
    const matchesSearch =
      tuition.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tuition.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tuition.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tuition.studentName?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleApply = (tuition) => {
    toast.success(`Applied for ${tuition.subject} tuition!`);
    console.log("Apply for tuition:", tuition);
    // Add your apply logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Approved Tuitions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and apply for approved tuition opportunities
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 relative w-full">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by subject, location, class, or student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Showing {filteredTuitions?.length || 0} of{" "}
              {tuitionData?.length || 0} tuitions
            </div>
          </div>
        </div>

        {/* Table Section */}
        {filteredTuitions && filteredTuitions.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* Table Head */}
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="text-gray-900 dark:text-gray-100">#</th>
                    <th className="text-gray-900 dark:text-gray-100">
                      Student
                    </th>
                    <th className="text-gray-900 dark:text-gray-100">
                      Subject
                    </th>
                    <th className="text-gray-900 dark:text-gray-100">Class</th>
                    <th className="text-gray-900 dark:text-gray-100">
                      Location
                    </th>
                    <th className="text-gray-900 dark:text-gray-100">Budget</th>
                    <th className="text-gray-900 dark:text-gray-100">Status</th>
                    <th className="text-gray-900 dark:text-gray-100">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filteredTuitions.map((tuition, index) => (
                    <tr
                      key={tuition._id || index}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {/* Index */}
                      <th className="text-gray-900 dark:text-gray-200">
                        {index + 1}
                      </th>

                      {/* Student Info */}
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 ring-2 ring-blue-400 dark:ring-blue-500">
                              <img
                                src={
                                  tuition.studentPhoto ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={tuition.studentName}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                              {tuition.studentName}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {tuition.studentEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="font-semibold text-gray-900 dark:text-gray-100">
                        {tuition.subject}
                      </td>

                      {/* Class */}
                      <td className="text-gray-800 dark:text-gray-300">
                        {tuition.class}
                      </td>

                      {/* Location */}
                      <td className="text-gray-800 dark:text-gray-300">
                        {tuition.location}
                      </td>

                      {/* Budget */}
                      <td>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          ৳{tuition.budget}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          /month
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <span className="badge badge-success">
                          {tuition.status || "approved"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApply(tuition)}
                            className="btn btn-primary btn-sm gap-2"
                            title="Apply for this tuition"
                          >
                            Apply
                          </button>
                          <button
                            onClick={() => navigate(`/tuition/${tuition._id}`)}
                            className="btn btn-ghost btn-sm text-blue-600 dark:text-blue-400"
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                No Approved Tuitions Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm
                  ? "Try adjusting your search"
                  : "No approved tuitions available at the moment"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn btn-primary"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTuitions;
