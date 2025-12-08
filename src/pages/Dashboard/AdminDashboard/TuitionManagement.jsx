import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import AdminTuitionTable from "../../../components/TableRows/AdminTuitionTable";

const TuitionManagement = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allTuitionsAdmin"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-tuitions?admin=true`
      );
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <AdminTuitionTable data={data}></AdminTuitionTable>
    </div>
  );
};

export default TuitionManagement;
