import { FiCheck, FiX, FiEye } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AdminTuitionTable = ({ data }) => {
  const axiosSecure = useAxiosSecure();

  const handleApprove = async ({ id, status }) => {
    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/tuition-status/${id}`,
        { status }
      );
      toast.success(`Tuition ${status} updated successfully!`);
    } catch (error) {
      toast.error("Failed to update tuition status");
      console.error(error);
    }
  };

  const handleReject = async ({ id, status }) => {
    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/tuition-status/${id}`,
        { status }
      );
      toast.success(`Tuition ${status} updated successfully!`);
    } catch (error) {
      toast.error("Failed to update tuition status");
      console.error(error);
    }
  };

  const handleView = (id) => {
    console.log(id);
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-2xl">
      <table className="table table-zebra bg-white dark:bg-gray-800">
        {/* Table Head */}
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="text-gray-900 dark:text-gray-100">#</th>
            <th className="text-gray-900 dark:text-gray-100">Student</th>
            <th className="text-gray-900 dark:text-gray-100">Subject</th>
            <th className="text-gray-900 dark:text-gray-100">Class</th>
            <th className="text-gray-900 dark:text-gray-100">Location</th>
            <th className="text-gray-900 dark:text-gray-100">Budget</th>
            <th className="text-gray-900 dark:text-gray-100">Status</th>
            <th className="text-gray-900 dark:text-gray-100">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data && data.length > 0 ? (
            data.map((tuition, index) => (
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
                  <span
                    className={`badge ${
                      tuition.status === "approved"
                        ? "badge-success"
                        : tuition.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {tuition.status || "pending"}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex gap-2">
                    {/* View Button */}
                    <button
                      onClick={() => handleView(tuition._id)}
                      className="btn btn-ghost btn-sm text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700"
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </button>

                    {/* Approve Button */}
                    {tuition.status !== "approved" && (
                      <button
                        onClick={() =>
                          handleApprove({ id: tuition._id, status: "approved" })
                        }
                        className="btn btn-ghost btn-sm text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-700"
                        title="Approve"
                      >
                        <FiCheck size={18} />
                      </button>
                    )}

                    {/* Reject Button */}
                    {tuition.status !== "rejected" && (
                      <button
                        onClick={() =>
                          handleReject({ id: tuition._id, status: "rejected" })
                        }
                        className="btn btn-ghost btn-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-700"
                        title="Reject"
                      >
                        <FiX size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="text-center py-8 text-gray-600 dark:text-gray-400"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl">📚</span>
                  <p>No tuition requests found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTuitionTable;
