import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const PostTuition = () => {
  const { user } = useAuth();
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
      console.log("Form Data:", data);

      axios
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
    } catch (error) {
      console.error("Error posting tuition:", error);
      toast.error("Failed to post tuition. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Post a Tuition Request</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Student Information Section */}
        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Student Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student Name</span>
              </label>
              <input
                type="text"
                {...register("studentName", {
                  required: "Student name is required",
                })}
                className="input input-bordered"
                readOnly
              />
              {errors.studentName && (
                <span className="text-error text-sm mt-1">
                  {errors.studentName.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Student Email</span>
              </label>
              <input
                type="email"
                {...register("studentEmail", {
                  required: "Email is required",
                })}
                className="input input-bordered"
                readOnly
              />
              {errors.studentEmail && (
                <span className="text-error text-sm mt-1">
                  {errors.studentEmail.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tuition Details Section */}
        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Tuition Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Mathematics, Physics, English"
                {...register("subject", {
                  required: "Subject is required",
                })}
                className="input input-bordered"
              />
              {errors.subject && (
                <span className="text-error text-sm mt-1">
                  {errors.subject.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Class/Grade</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Grade 10, Class 12, University"
                {...register("class", {
                  required: "Class/Grade is required",
                })}
                className="input input-bordered"
              />
              {errors.class && (
                <span className="text-error text-sm mt-1">
                  {errors.class.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Dhaka, Chittagong"
                {...register("location", {
                  required: "Location is required",
                })}
                className="input input-bordered"
              />
              {errors.location && (
                <span className="text-error text-sm mt-1">
                  {errors.location.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Budget (per month)</span>
              </label>
              <input
                type="number"
                placeholder="e.g., 5000"
                {...register("budget", {
                  required: "Budget is required",
                  min: {
                    value: 0,
                    message: "Budget must be a positive number",
                  },
                })}
                className="input input-bordered"
              />
              {errors.budget && (
                <span className="text-error text-sm mt-1">
                  {errors.budget.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-outline"
          >
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Post Tuition
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostTuition;
