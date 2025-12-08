import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import useRole from "../hooks/useRole";
import ApplyTuitionModal from "../components/Modal/ApplyTuitionModal";
import useAxiosSecure from "../hooks/useAxiosSecure";

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
        `${import.meta.env.VITE_API_URL}/tuitions-details/${id}`
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
        applicationData
      );

      if (res.data) {
        toast.success(`Successfully applied for ${tuition.subject}!`);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="card bg-white shadow-2xl">
              <div className="card-body items-center text-center p-8">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary">
                    <img src={tuition.studentPhoto} alt={tuition.studentName} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-4">
                  {tuition.studentName}
                </h3>

                <div className="badge badge-lg mt-2 badge-success">
                  {tuition.status}
                </div>

                <div className="divider"></div>

                <p className="text-sm">{tuition.studentEmail}</p>
                <p>Posted: {tuition.createdAt}</p>

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
            <div className="card bg-white shadow-2xl">
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

      {/* MODAL */}
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

export default TuitionDetails;
