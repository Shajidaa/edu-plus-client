import { useQuery } from "@tanstack/react-query";

import AdminTuitionTable from "../../../components/TableRows/AdminTuitionTable";
import Spinner from "../../../components/Shared/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allTuitionsAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-tuitions?admin=true`
      );
      return res.data;
    },
  });

  if (isLoading) return <Spinner></Spinner>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <AdminTuitionTable data={data} refetch={refetch}></AdminTuitionTable>
    </div>
  );
};

export default TuitionManagement;
