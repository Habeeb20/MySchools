import { createContext, useContext, useEffect, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [isPaymentActive, setIsPaymentActive] = useState(false);

  useEffect(() => {
    fetch("/api/settings/payment-status")
      .then((res) => res.json())
      .then((data) => setIsPaymentActive(data.isPaymentActive))
      .catch((error) => console.error("Error fetching payment status:", error));
  }, []);

  return (
    <PaymentContext.Provider value={{ isPaymentActive, setIsPaymentActive }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentStatus = () => useContext(PaymentContext);
