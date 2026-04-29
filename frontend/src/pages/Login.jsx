import { useState } from "react";
import { loginUser } from "../services/api";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Please enter email and password ❗");
    }

    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      if (res.token) {
        localStorage.setItem("token", res.token);

        toast.success("Login successful");

        // delay so user can see toast
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);

      } else {
        toast.error(res.message || "Login failed ❌");
      }

    } catch (err) {
      toast.error("Something went wrong 🚫");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">

      {/* CARD */}
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-2xl">

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Welcome back
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Login to continue
        </p>

        {/* EMAIL */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SIGNUP LINK */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;