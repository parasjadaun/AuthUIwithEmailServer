import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-amber-300 flex items-center justify-center">
      <div className="flex flex-col sm:flex-row items-center gap-5">

        <button
          onClick={() => navigate("/login")}
          className="w-48 flex items-center justify-center gap-3 rounded-xl bg-black px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105 active:scale-95"
        >
          {/* Keep your Login SVG here */}
          Log In
        </button>

        <button
          onClick={() => navigate("/register")}
          className="w-48 flex items-center justify-center gap-3 rounded-xl border-2 border-black bg-transparent px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 active:scale-95"
        >
          {/* Keep your Create Account SVG here */}
          Create Account
        </button>

      </div>
    </div>
  );
};

export default Home;