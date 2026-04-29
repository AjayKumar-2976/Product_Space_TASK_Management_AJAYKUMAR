import { useState } from "react";
import { signupUser } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      return toast.error("All fields required ❗");
    }

    const res = await signupUser({ email, password });

    if (res.token) {
      toast.success("Account created ");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } else {
      toast.error(res.message || "Signup failed ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl w-80">
        <h2 className="text-xl mb-4 text-center">Create Account</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white p-2 rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;