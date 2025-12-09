import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (sessionId) {
      axiosSecure.post(`/payment-success`, {
        sessionId,
      });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">Thank you .</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
