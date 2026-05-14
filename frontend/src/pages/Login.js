import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async () => {

    if (!formData.email || !formData.password) {

  toast.error("Please fill all fields");

  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {

  toast.error("Invalid email format");

  return;
}

if (
  isSignup &&
  formData.password.length < 6
) {

  toast.error(
    "Password must be at least 6 characters"
  );

  return;
}

    try {

      setLoading(true);

      if (isSignup) {

        await API.post(
  `${process.env.REACT_APP_AUTH_URL}/auth/register`,
   {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        toast.success("Account created");

        setIsSignup(false);

      } else {

        const res = await API.post(
  `${process.env.REACT_APP_AUTH_URL}/auth/login`,
          {
            email: formData.email,
            password: formData.password
          }
        );

        localStorage.setItem("token", res.data.access_token);

        toast.success("Login successful");

        navigate("/dashboard");

      }

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.detail ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">

        {/* Glow */}
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-[-100px] left-[-100px]" />

        <div className="absolute w-96 h-96 bg-pink-400/20 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />

        <div className="relative z-10 flex flex-col justify-center px-20 text-white">

          <h1 className="text-6xl font-extrabold leading-tight mb-8">
            JobTracker
          </h1>

          <p className="text-2xl text-white/90 leading-10 mb-12">

            Track applications,
            monitor interviews,
            analyze hiring progress,
            and build your professional journey.

          </p>

          <div className="space-y-5 text-lg">

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-white" />
              Smart Application Tracking
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-white" />
              Real-time Analytics Dashboard
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-white" />
              Professional Career Profile
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-white" />
              Built with Modern DevOps
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center bg-slate-100 p-8">

        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10">

          {/* Heading */}
          <div className="mb-10 text-center">

            <h2 className="text-4xl font-bold text-slate-800 mb-3">

              {
                isSignup
                  ? "Create Account"
                  : "Welcome Back"
              }

            </h2>

            <p className="text-gray-500 text-lg">

              {
                isSignup
                  ? "Start your career journey"
                  : "Login to continue"
              }

            </p>

          </div>

          {/* Name */}
          {
            isSignup && (

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-5 px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            )
          }

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-5 px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Password */}
          <div className="relative mb-5">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-5 top-4 text-gray-500"
            >

              {
                showPassword
                  ? "Hide"
                  : "Show"
              }

            </button>

          </div>

          {/* Confirm Password */}
          {
            isSignup && (

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mb-6 px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            )
          }

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg transition shadow-lg disabled:opacity-50"
          >

            {
              loading
                ? "Please wait..."
                : (
                  isSignup
                    ? "Create Account"
                    : "Login"
                )
            }

          </button>

          {/* Toggle */}
          <div className="mt-8 text-center">

            <button
              onClick={() =>
                setIsSignup(!isSignup)
              }
              className="text-indigo-500 font-semibold hover:underline"
            >

              {
                isSignup
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"
              }

            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Login;