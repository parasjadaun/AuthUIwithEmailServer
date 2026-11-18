
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../Services/authServices";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


   
const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    try {
        const response = await registerUser({
            name: { firstName, lastName },
            email,
            password,
        });

        console.log("SUCCESS:", response);

        setError("Registration successful! Please log in.");

        setTimeout(() => {
            navigate("/login");
        }, 1500);

    } catch (err) {
        console.log("ERROR RESPONSE:", err.response?.data);

        const message = err.response?.data?.message ||
            "Something went wrong.";

        setError(message);

        if (message.toLowerCase().includes("email already exists")) {
            setError("Email already registered. Please log in.");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    }
};



  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-amber-300 px-4 py-8">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign up to get started with your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-gray-700">
                Last Name
              </label>

              <input
                type="text"
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
            </div>

          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-16 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-amber-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-gray-800 active:scale-95"
          >
            Create Account
          </button>

        </form>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-bold text-amber-600 hover:text-amber-800"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Register;
