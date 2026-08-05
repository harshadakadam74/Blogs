import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../Store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");

    try {
      const session = await authService.login({
        email: data.email,
        password: data.password,
      });

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));
        }
        
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="
    min-h-screen
    flex
    items-center
    justify-center
    px-4
    py-8
    bg-gradient-to-br
    from-[#FFF5F2]
    via-[#FFE8F0]
    to-[#F3E8FF]
  "
    >
      <div
        className="
    relative
    w-full
    max-w-lg
    rounded-[32px]
    bg-white/80
    backdrop-blur-2xl
    border
    border-white/60
    shadow-[0_20px_60px_rgba(221,42,123,0.15)]
    p-8
    sm:p-10
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-[0_30px_80px_rgba(221,42,123,0.25)]
  "
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h2
            className="
      text-4xl
      font-black
      tracking-tight
      text-gray-900
    "
          >
            Welcome Back
          </h2>

          <p
            className="
      mt-2
      text-gray-500
      text-base
      leading-relaxed
    "
          >
            Sign in to continue sharing your stories with
            <span className="font-semibold bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
              {" "}
              Scriptora
            </span>
          </p>
        </div>

        {/* Signup Link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="
      font-bold
      bg-gradient-to-r
      from-[#F58529]
      via-[#DD2A7B]
      to-[#8134AF]
      bg-clip-text
      text-transparent
      hover:brightness-125
      transition-all
    "
          >
            Sign Up
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <p className="mt-2 text-center text-red-500 text-sm">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-4 space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="username"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Please enter a valid email",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <div className="flex items-center justify-between text-sm mt-2">
            <label
              className="
      flex
      items-center
      gap-2
      text-gray-600
      cursor-pointer
      select-none
    "
            >
              <input
                type="checkbox"
                className="
        w-4
        h-4
        rounded
        accent-[#DD2A7B]
        cursor-pointer
      "
              />
              <span className="hover:text-gray-800 transition-colors">
                Remember me
              </span>
            </label>

            <Link
              to="/forgot-password"
              className="
      font-medium
      bg-gradient-to-r
      from-[#F58529]
      via-[#DD2A7B]
      to-[#8134AF]
      bg-clip-text
      text-transparent
      hover:brightness-125
      transition-all
      duration-300
    "
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full rounded-xl">
            Sign In
          </Button>
          <div className="flex items-center my-2">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <button
            className="
    w-full
    border
    border-gray-300
    rounded-xl
    py-3
    flex
    items-center
    justify-center
    gap-3
    hover:bg-gray-50
    transition
  "
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
