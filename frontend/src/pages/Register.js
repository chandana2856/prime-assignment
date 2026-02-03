import { useState } from "react";
import { register } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await register(form);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err.response || err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <form
        onSubmit={submit}
        className="bg-white dark:bg-slate-800 p-6 rounded shadow w-80"
      >
        <h2 className="text-xl mb-4 font-semibold text-center">
          Create Account
        </h2>

        <input
          className="w-full mb-3 px-3 py-2 border rounded"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full mb-3 px-3 py-2 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-3 px-3 py-2 border rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full py-2 bg-blue-600 text-white rounded">
          Register
        </button>

        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
