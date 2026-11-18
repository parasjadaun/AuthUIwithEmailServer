
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setNewPassword } from "../../Services/forgotPassword";

const CreateNewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password/sendOtp", {
        replace: true,
      });
    }
  }, [email, navigate]);

  // Password strength
  const passwordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = passwordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await setNewPassword(email, password);

      setSuccess("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-300 px-4 py-10">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-amber-100 border border-amber-300 mb-5">

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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-11V7a4 4 0 00-8 0v4"
              />
            </svg>

          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Create New Password
          </h1>

          <p className="text-gray-600 text-sm mt-2">
            Choose a strong password to secure your account.
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

            {/* Success */}
            {success && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                {success}
              </div>
            )}

            {/* New Password */}
            <div>

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                New Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={loading}
                  className="w-full px-4 py-3 pr-16 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-700 text-sm font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {/* Password Strength */}
              {password.length > 0 && (
                <div className="mt-3">

                  <div className="flex gap-1.5">

                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full ${
                          strength >= level
                            ? strength <= 2
                              ? "bg-red-500"
                              : strength <= 3
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}

                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    {strength <= 2
                      ? "Weak password"
                      : strength <= 3
                      ? "Moderate password"
                      : strength <= 4
                      ? "Good password"
                      : "Strong password"}
                  </p>

                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">
                Use at least 8 characters, including uppercase,
                lowercase, numbers and symbols.
              </p>

            </div>

            {/* Confirm Password */}
            <div>

              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  disabled={loading}
                  className="w-full px-4 py-3 pr-16 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-700 text-sm font-semibold"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>

              </div>

              {confirmPassword.length > 0 && (
                <p className={`text-xs mt-2 ${
                  password === confirmPassword
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                  {password === confirmPassword
                    ? "Passwords match"
                    : "Passwords do not match"}
                </p>
              )}

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !password || !confirmPassword}
              className="w-full py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold shadow-md transition duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating Password..." : "Reset Password"}
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

      </div>
    </div>
  );
};

export default CreateNewPassword;
