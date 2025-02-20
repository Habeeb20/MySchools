import { Navigate, Outlet } from "react-router-dom";

import { usePaymentStatus } from "./Context/PaymentContext";
const ProtectedRoute = () => {
  const { isPaymentActive } = usePaymentStatus();
  const hasPaid = localStorage.getItem("hasPaid"); // Store payment status in localStorage

  if (isPaymentActive && !hasPaid) {
    return <Navigate to="/payment" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
