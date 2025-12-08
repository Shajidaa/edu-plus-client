import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiCheck, FiCheckCircle, FiEye, FiX } from "react-icons/fi";

const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { data: myApplications = [], refetch } = useQuery({
    queryKey: ["myApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/my-applications`
      );
      return res.data;
    },
  });
  console.log(myApplications);
  const handleView = () => {};
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/applications/status/${id}`,
        { status: "approved" }
      );

      refetch();
    } catch (error) {
      console.error("Approve Error:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/applications/status/${id}`,
        { status: "rejected" }
      );

      refetch();
    } catch (error) {
      console.error("Reject Error:", error);
    }
  };

  return (
    <div className="p-6 ">
      <h2 className="text-xl font-semibold mb-4">
        Total Applications: {myApplications.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>qualification</th>
              <th>Expect Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myApplications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app.tutorName}</td>
                <td>{app.tutorEmail}</td>
                <td>{app.tuitionSubject}</td>
                <td>{app.qualification}</td>
                <td>{app.salary}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                {/* Actions */}
                <td>
                  <div className="flex gap-2">
                    {/* View Button */}
                    <button
                      onClick={() => handleView(app._id)}
                      className="btn btn-ghost btn-sm text-blue-600"
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </button>

                    {/* Approve Button */}
                    {app.status !== "approved" && (
                      <button
                        onClick={() => handleApprove(app._id)}
                        className="btn btn-ghost btn-sm text-green-600"
                        title="Approve"
                      >
                        <FiCheckCircle size={18} />
                      </button>
                    )}

                    {/* Reject Button */}
                    {app.status !== "rejected" && (
                      <button
                        onClick={() => handleReject(app._id)}
                        className="btn btn-ghost btn-sm text-red-600"
                        title="Reject"
                      >
                        <FiX size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTutors;
