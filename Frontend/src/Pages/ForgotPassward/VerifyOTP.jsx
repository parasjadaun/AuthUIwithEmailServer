
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  verifyOtp,
  sendVerificationCode,
} from "../../Services/forgotPassword";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // Redirect if the user opens this page without an email.
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password/sendOtp", { replace: true });
    }
  }, [email, navigate]);

  // OTP resend countdown.
  useEffect(() => {
    if (timer <= 0) return;

    const timeout = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      await verifyOtp(email, otp);

      navigate("/forgot-password/createNewPassword", {
        state: { email },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid or expired OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0 || loading) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await sendVerificationCode(email);

      setOtp("");
      setTimer(60);
      setSuccess("A new verification code has been sent.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-300 px-4 py-10">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-7 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl text-amber-700 border border-amber-200">
            ✉
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Verify Your Email
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter the 6-digit verification code sent to
          </p>

          <p className="mt-1 break-all font-semibold text-amber-700">
            {email}
          </p>

        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-5">

          {/* OTP Input */}
          <div>

            <label
              htmlFor="otp"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Verification Code <span className="text-red-500">*</span>
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setOtp(value);
                setError("");
              }}
              placeholder="Enter 6-digit OTP"
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-xl tracking-[0.5em] text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 disabled:opacity-50"
            />

          </div>

          {/* Error */}
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {success}
            </p>
          )}

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full rounded-xl bg-black py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-gray-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        {/* Resend OTP */}
        <div className="mt-6 text-center text-sm text-gray-500">

          Didn't receive the code?{" "}

          {timer > 0 ? (
            <span className="font-medium text-amber-700">
              Resend in {timer}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading}
              className="font-semibold text-amber-700 hover:text-amber-900 disabled:opacity-50"
            >
              Resend OTP
            </button>
          )}

        </div>

        {/* Change Email */}
        <div className="mt-5 text-center">

          <Link
            to="/forgot-password/sendOtp"
            className="text-sm text-gray-500 transition hover:text-amber-700"
          >
            ← Change email address
          </Link>

        </div>

      </div>
    </div>
  );
};

export default VerifyOTP;
