import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import useRole from "../hooks/useRole";

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, isRoleLoading] = useRole();
  const {
    data: tuition,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tuitions-details/${id}`
      );
      return res.data;
    },
  });

  const handleApply = () => {
    toast.success(`Applied for ${tuition.subject} tuition!`);
  };

  if (isLoading || isRoleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !tuition) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-error">
          <span>Error loading tuition details</span>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost gap-2 mb-6"
        >
          <FiArrowLeft size={20} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div>
            <div className="card bg-white  shadow-2xl">
              <div className="card-body items-center text-center p-8">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary">
                    <img src={tuition.studentPhoto} alt={tuition.studentName} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-4">
                  {tuition.studentName}
                </h3>

                <div className={"badge badge-lg mt-2 badge-success"}>
                  {tuition.status}
                </div>

                <div className="divider"></div>

                <p className="text-sm">{tuition.studentEmail}</p>

                <p>Posted: {formatDate(tuition.createdAt)}</p>

                <div className="divider"></div>
                {role === "tutor" && (
                  <button
                    onClick={handleApply}
                    className="btn btn-primary btn-block"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2">
            <div className="card bg-white  shadow-2xl">
              <div className="card-body p-8">
                <h2 className="text-3xl font-bold mb-6">Tuition Details</h2>

                <p className="text-xl font-bold">{tuition.subject}</p>
                <p>Class: {tuition.class}</p>
                <p>Location: {tuition.location}</p>
                <p className="text-2xl font-bold text-blue-600">
                  ৳{tuition.budget}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
