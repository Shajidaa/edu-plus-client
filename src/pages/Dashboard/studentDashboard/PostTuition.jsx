import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import StudTuitionGetRow from "../../../components/TableRows/StudTuitionGetRow";

const PostTuition = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
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
      axiosSecure
        .post(`${import.meta.env.VITE_API_URL}/tuitions`, data)
        .then(() => {
          toast.success("Tuition posted successfully!");
        })
        .catch((error) => {
          {
            console.error("Error posting tuition:", error);
            toast.error("Failed to post tuition. Please try again.");
          }
        });

      reset();
    } catch (e) {
      toast.error("Failed to post tuition. Please try again.");
    }
  };

  const {
    data: tuitionData,
    isLoading: tuitionDataLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tuitions", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`${import.meta.env.VITE_API_URL}/tuitions`)
        .then((res) => res.data),
  });
  if (loading || tuitionDataLoading) return <p>loading======</p>;
  if (error) return <p>error</p>;
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Post a Tuition Request
            </h2>
            <p className="text-base-content/70">
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

                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base">
                            👤 Student Name
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
                            ⚠️ {errors.studentName.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base">
                            📧 Student Email
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
                            ⚠️ {errors.studentEmail.message}
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

                  <div className="bg-gradient-to-br from-secondary/5 to-accent/5 p-6 rounded-xl border border-secondary/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base">
                            📚 Subject
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
                            ⚠️ {errors.subject.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base">
                            🎓 Class/Grade
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
                            ⚠️ {errors.class.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base">
                            📍 Location
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
                            ⚠️ {errors.location.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-base">
                            💰 Budget (per month)
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
                            ⚠️ {errors.budget.message}
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
                    <span>🔄</span>
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg gap-2 hover:scale-105 transition-transform shadow-lg"
                  >
                    <span>📤</span>
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
      ></StudTuitionGetRow>
    </>
  );
};

export default PostTuition;
