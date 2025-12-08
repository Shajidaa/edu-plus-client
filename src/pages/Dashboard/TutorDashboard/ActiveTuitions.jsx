import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TutorOngoingTuitions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: ongoingTuitions = [], isLoading } = useQuery({
    queryKey: ["tutorOngoingTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/tutor-ongoing-tuitions`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="p-6">Loading ongoing tuitions...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Ongoing Tuitions: {ongoingTuitions.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Subject</th>
              <th>Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ongoingTuitions.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.studentEmail}</td>
                <td>{item.tuitionSubject}</td>
                <td>{item.salary}</td>
                <td>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                    {item.status}
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

export default TutorOngoingTuitions;
