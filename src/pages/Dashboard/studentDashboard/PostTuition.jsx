import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaBook,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRedo,
  FaPaperPlane,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import StudTuitionGetRow from "../../../components/TableRows/StudTuitionGetRow";
import TuitionEdit from "../../../components/Modal/TuitionEdit";
import Spinner from "../../../components/Shared/Spinner";

const PostTuition = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      studentName: user?.displayName || "",
      studentEmail: user?.email || "",
      studentPhoto: user?.photoURL || "",
    },
  });

  // Update default values when user data loads
  useEffect(() => {
    if (user) {
      reset({
        studentName: user.displayName || "",
        studentEmail: user.email || "",
        studentPhoto: user.photoURL || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post(`${import.meta.env.VITE_API_URL}/tuitions`, data);
      toast.success("Tuition posted successfully!");
      reset({
        studentName: user.displayName || "",
        studentEmail: user.email || "",
        studentPhoto: user.photoURL || "",
        subject: "",
        class: "",
        location: "",
        budget: "",
      });
      refetch();
    } catch (error) {
      console.error("Error posting tuition:", error);
      toast.error("Failed to post tuition. Please try again.");
    }
  };

  const {
    data: tuitionData,
    isLoading: tuitionDataLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tuitionsPending", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`${import.meta.env.VITE_API_URL}/tuitions?status=pending`)
        .then((res) => res.data),
  });

  // Handle edit button click
  const handleEdit = (tuition) => {
    setSelectedTuition(tuition);
    setIsEditModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedTuition(null);
  };

  // Handle update tuition
  const handleUpdate = () => {
    refetch();
  };

  // Handle delete tuition
  const handleDelete = async (id) => {
    if (window.confirm("Are  you want to delete this tuition?")) {
      try {
        await axiosSecure.delete(
          `${import.meta.env.VITE_API_URL}/tuitions/${id}`
        );
        toast.success("Tuition deleted successfully!");
        refetch();
      } catch (error) {
        console.error("Error deleting tuition:", error);
        toast.error("Failed to delete tuition. Please try again.");
      }
    }
  };

  if (loading || tuitionDataLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-center py-8">
        <p className="text-error">Error loading data. Please try again.</p>
      </div>
    );
  return (
    <>
      <div className="min-h-screen py-6 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2"
              style={{
                background:
                  "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Post a Tuition Request
            </h1>
            <p
              className="text-sm sm:text-base"
              style={{ color: "var(--color-text-muted)" }}
            >
              Fill in the details to find your perfect tutor
            </p>
          </div>

          {/* Form Card */}
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Student Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-primary rounded-full"></div>
                    <h3 className="text-2xl font-bold text-base-content">
                      Student Information
                    </h3>
                  </div>

                  <div className="bg-linear-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base flex items-center gap-2">
                            <FaUser /> Student Name
                          </span>
                        </label>
                        <input
                          type="text"
                          {...register("studentName", {
                            required: "Student name is required",
                          })}
                          className="input input-bordered bg-base-100 focus:input-primary transition-all"
                          readOnly
                        />
                        {errors.studentName && (
                          <span className="text-error text-sm mt-1 flex items-center gap-1">
                            {errors.studentName.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base flex items-center gap-2">
                            <FaEnvelope /> Student Email
                          </span>
                        </label>
                        <input
                          type="email"
                          {...register("studentEmail", {
                            required: "Email is required",
                          })}
                          className="input input-bordered bg-base-100 focus:input-primary transition-all"
                          readOnly
                        />
                        {errors.studentEmail && (
                          <span className="text-error text-sm mt-1 flex items-center gap-1">
                            {errors.studentEmail.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tuition Details Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-secondary rounded-full"></div>
                    <h3 className="text-2xl font-bold text-base-content">
                      Tuition Details
                    </h3>
                  </div>

                  <div className="bg-linear-to-br from-secondary/5 to-accent/5 p-6 rounded-xl border border-secondary/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base flex items-center gap-2">
                            <FaBook /> Subject
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Mathematics, Physics, English"
                          {...register("subject", {
                            required: "Subject is required",
                          })}
                          className="input input-bordered bg-base-100 focus:input-secondary transition-all"
                        />
                        {errors.subject && (
                          <span className="text-error text-sm mt-1 flex items-center gap-1">
                            {errors.subject.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base flex items-center gap-2">
                            <FaGraduationCap /> Class/Grade
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Grade 10, Class 12, University"
                          {...register("class", {
                            required: "Class/Grade is required",
                          })}
                          className="input input-bordered bg-base-100 focus:input-secondary transition-all"
                        />
                        {errors.class && (
                          <span className="text-error text-sm mt-1 flex items-center gap-1">
                            {errors.class.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base flex items-center gap-2">
                            <FaMapMarkerAlt /> Location
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Dhaka, Chittagong"
                          {...register("location", {
                            required: "Location is required",
                          })}
                          className="input input-bordered bg-base-100 focus:input-secondary transition-all"
                        />
                        {errors.location && (
                          <span className="text-error text-sm mt-1 flex items-center gap-1">
                            {errors.location.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base flex items-center gap-2">
                            <FaMoneyBillWave /> Budget (month)
                          </span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 font-semibold">
                            ৳
                          </span>
                          <input
                            type="number"
                            placeholder="5000"
                            {...register("budget", {
                              required: "Budget is required",
                              min: {
                                value: 0,
                                message: "Budget must be a positive number",
                              },
                            })}
                            className="input input-bordered bg-base-100 focus:input-secondary transition-all pl-8 w-full"
                          />
                        </div>
                        {errors.budget && (
                          <span className="text-error text-sm mt-1 flex items-center gap-1">
                            {errors.budget.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="btn btn-outline btn-lg gap-2 hover:scale-105 transition-transform"
                  >
                    <FaRedo />
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn text-white font-bold btn-lg gap-2 hover:scale-105 transition-transform shadow-lg border-none"
                    style={{
                      background:
                        "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                    }}
                  >
                    <FaPaperPlane />
                    Post Tuition
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <StudTuitionGetRow
        tuitionData={tuitionData}
        refetch={refetch}
        onEdit={handleEdit}
        onDelete={handleDelete}
      ></StudTuitionGetRow>

      {/* Edit Modal */}
      <TuitionEdit
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        tuitionData={selectedTuition}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default PostTuition;
