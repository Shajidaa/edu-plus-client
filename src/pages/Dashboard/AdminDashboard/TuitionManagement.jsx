import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
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
  const handleApprove = (tuition) => {
    console.log(tuition);
  };
  const handleReject = (tuition) => {
    console.log(tuition);
  };
  const handleView = (tuition) => {
    console.log(tuition);
  };
  return (
    <div>
      <AdminTuitionTable
        data={data}
        onApprove={(tuition) => handleApprove(tuition)}
        onReject={(tuition) => handleReject(tuition)}
        onView={(tuition) => handleView(tuition)}
      ></AdminTuitionTable>
    </div>
  );
};

export default TuitionManagement;
