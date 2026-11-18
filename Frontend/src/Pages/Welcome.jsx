
import { useLocation, Navigate, useNavigate } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  // Redirect if user data is unavailable
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-black px-8 py-5 text-white">
        <h1 className="text-2xl font-bold">
          YourApp
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
        >
          Logout
        </button>
      </nav>

      {/* Welcome Section */}
      <main className="mx-auto max-w-3xl px-5 py-16">

        <div className="rounded-2xl bg-white p-8 shadow-xl">

          {/* User Avatar */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-200 text-2xl font-bold text-amber-800">
            {user.firstName?.charAt(0).toUpperCase()}
          </div>

          {/* Welcome Message */}
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h1>

          <p className="mt-2 text-gray-500">
            You have successfully logged in to your account.
          </p>

          {/* User Information */}
          <div className="mt-8 rounded-xl border border-gray-200 p-5">

            <h2 className="mb-4 text-lg font-semibold">
              Account Information
            </h2>

            <div className="space-y-3 text-sm text-gray-700">

              <p>
                <span className="font-semibold">Name:</span>{" "}
                {user.firstName} {user.lastName}
              </p>

              <p>
                <span className="font-semibold">Email:</span>{" "}
                {user.email}
              </p>

            </div>
          </div>

          {/* Dashboard Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Go to Dashboard
          </button>

        </div>
      </main>
    </div>
  );
};

export default Welcome;
