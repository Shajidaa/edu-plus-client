import { useForm } from "react-hook-form";
import { FiX, FiUser, FiMail, FiPhone, FiFileText } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const ApplyTuitionModal = ({ isOpen, onClose, tuition, onSubmit }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Set default values when modal opens
  useEffect(() => {
    if (user && isOpen) {
      reset({
        tutorName: user.displayName || "",
        tutorEmail: user.email || "",
        tutorPhone: user.phoneNumber || "",
        salary: "",
        experience: "",
        qualification: "",
      });
    }
  }, [user, isOpen, reset]);

  const handleFormSubmit = (data) => {
    const applicationData = {
      ...data,
      tuitionId: tuition._id,
      tuitionSubject: tuition.subject,
      studentName: tuition.studentName,
      studentEmail: tuition.studentEmail,
      appliedAt: new Date().toISOString(),
    };
    onSubmit(applicationData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Apply for Tuition
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {tuition.subject} - {tuition.class}
            </p>
          </div>

          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Tutor Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Your Information
              </h4>
            </div>

            <div className="bg-linear-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tutor Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FiUser size={16} />
                      Your Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("tutorName", {
                      required: "Name is required",
                    })}
                    className="input input-bordered input-sm bg-base-100"
                    readOnly
                  />
                  {errors.tutorName && (
                    <span className="text-error text-xs mt-1">
                      {errors.tutorName.message}
                    </span>
                  )}
                </div>

                {/* Tutor Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FiMail size={16} />
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("tutorEmail", {
                      required: "Email is required",
                    })}
                    className="input input-bordered input-sm bg-base-100"
                    readOnly
                  />
                  {errors.tutorEmail && (
                    <span className="text-error text-xs mt-1">
                      {errors.tutorEmail.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Qualifications Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-secondary rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Qualifications
              </h4>
            </div>

            <div className="bg-linear-to-br from-secondary/5 to-accent/5 p-6 rounded-xl border border-secondary/10">
              <div className="space-y-4">
                {/* Experience */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Years of Experience
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 5"
                    {...register("experience", {
                      required: "Experience is required",
                      min: {
                        value: 0,
                        message: "Experience must be 0 or more",
                      },
                    })}
                    className="input input-bordered input-sm bg-base-100"
                  />
                  {errors.experience && (
                    <span className="text-error text-xs mt-1">
                      {errors.experience.message}
                    </span>
                  )}
                </div>

                {/* Qualification */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Educational Qualification
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Bachelor's in Mathematics"
                    {...register("qualification", {
                      required: "Qualification is required",
                    })}
                    className="input input-bordered input-sm bg-base-100"
                  />
                  {errors.qualification && (
                    <span className="text-error text-xs mt-1">
                      {errors.qualification.message}
                    </span>
                  )}
                </div>
                {/* Expected Salary
                 */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Expected Salary
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Bachelor's in Mathematics"
                    {...register("salary", {
                      required: "Expected Salary is required",
                    })}
                    className="input input-bordered input-sm bg-base-100"
                  />
                  {errors.salary && (
                    <span className="text-error text-xs mt-1">
                      {errors.salary.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline btn-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm gap-2">
              <span>📤</span>
              Submit Application
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ApplyTuitionModal;
