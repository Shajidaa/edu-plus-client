import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TuitionCard from "../../components/tuitionCard";

const AllTuitions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allTuitions"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-tuitions`
      );
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data); // your fetched tuitions

  return (
    <div>
      {data?.map((tuition) => (
        <TuitionCard key={tuition._id} tuition={tuition}></TuitionCard>
      ))}
    </div>
  );
};

export default AllTuitions;
