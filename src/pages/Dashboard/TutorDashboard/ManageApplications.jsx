import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: applications = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tutor-applications"], // ✅ better unique key
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/applications`
      );
      return res.data;
    },
  });

  // ✅ Loading State
  if (isLoading) {
    return <div className="text-center py-10">Loading applications...</div>;
  }

  // ✅ Error State
  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        {error?.message || "Something went wrong"}
      </div>
    );
  }

  console.log(applications);

  return (
    <div className="p-6 ">
      <h2 className="text-xl font-semibold mb-4">
        Total Applications: {applications.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Expect Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app.studentName}</td>
                <td>{app.studentEmail}</td>
                <td>{app.tuitionSubject}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApplications;
