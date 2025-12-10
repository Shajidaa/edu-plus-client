import { useQuery } from "@tanstack/react-query";

import TuitionCard from "../../components/tuitionCard";
import Container from "../../components/Shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const AllTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ["allTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-tuitions`
      );
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container className="grid gap-5 grid-cols-1 lg:grid-cols-4 md:grid-cols-3">
      {data?.map((tuition) => (
        <TuitionCard key={tuition._id} tuition={tuition}></TuitionCard>
      ))}
    </Container>
  );
};

export default AllTuitions;
