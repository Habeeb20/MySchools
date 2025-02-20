import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import im from "../../assets/eschools.png";
const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  // Combine OTP array to a string
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_1}/verify-email`,
        { code: otpCode }
      );
      if (response.data.success) {
        navigate("/makepayment");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-xs mx-auto ">
        <div className="flex justify-center mb-0">
          <img src={im} alt="logo" className="rounded-full w-36" />
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-1 pb-10 mt-1">
          <h2 className="text-2xl font-semibold mb-6 text-center">Signin</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4> input the code being sent to your registered email</h4>
            <div className="grid grid-cols-6 gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`} // Unique ID for each input
                  type="text"
                  maxLength="1"
                  className="p-2 border rounded text-center text-lg"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  required
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-700"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
