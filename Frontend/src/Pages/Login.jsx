import {loginUser} from "../Services/authServices";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const response = await loginUser({
      email,
      password
    });

    const user = response.user;

    console.log("Login successful:", response);

    navigate("/welcome", {
      state: { user },
      replace: true
    });

  } catch (requestError) {
    const message =
      requestError.response?.data?.message ||
      "Unable to log in. Please try again.";

    setError(message);

    console.error("Login request failed:", requestError);

  } finally {
    setLoading(false);
    setPassword("");
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-amber-300 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Login to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-16 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-amber-600 hover:text-amber-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
           onClick={() => navigate("/forgot-password")}
              type="button"
              className="text-sm font-semibold text-amber-600 hover:text-amber-800"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
  type="submit"
  disabled={loading}
  className="w-full rounded-xl bg-black py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-gray-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60" >
            {loading ? "Logging in..." : "Login"}
         </button>

          {error && <p className="text-center text-sm text-red-600">{error}</p>}

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
        <Link
            to="/register"
           className="font-bold text-amber-600 hover:text-amber-800 transition-colors"
      >
          Create Account
       </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
