
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendVerificationCode } from "../../Services/forgotPassword";

const SendVerificationMail = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Email address is required.");
      return;
    }

    try {
      setLoading(true);

      await sendVerificationCode(normalizedEmail);

      navigate("/forgot-password/verifyOtp", {
        state: { email: normalizedEmail },
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-300 px-4 py-10">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 mb-5">

            <svg
              className="w-8 h-8 text-amber-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>

          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Forgot Password?
          </h1>

          <p className="text-gray-600 text-sm mt-2">
            Don't worry! Enter your registered email address and
            we'll send you a verification code.
          </p>

        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Error */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                required
              />

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold shadow-md transition duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending Verification Code..." : "Send Verification Code"}
            </button>

          </form>

          {/* Back to Login */}
          <Link
            to="/login"
            className="block text-center text-sm text-gray-500 hover:text-amber-700 mt-6 transition"
          >
            ← Back to Login
          </Link>

        </div>

        <p className="text-center text-xs text-gray-700 mt-6">
          Your account security matters.
        </p>

      </div>
    </div>
  );
};

export default SendVerificationMail;
