import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../Store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

 const login = async (data) => {
  console.log("FORM DATA:", data);
  setError("");

  try {
    const session = await authService.login(data.email, data.password);

    if (session) {
      const userData = await authService.getCurrentUser();

      if (userData) {
        dispatch(authLogin(userData));
      }

      navigate("/");
    }
  } catch (err) {
    setError(err.message);
  }
};
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4 py-8">
    <div
      className="
        w-full
        max-w-md
        bg-white
        rounded-2xl
        sm:rounded-3xl
        shadow-xl
        p-5
        sm:p-8
      "
    >
      {/* Logo */}
      <div className="flex justify-center mb-5 sm:mb-6">
        <Logo />
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
        Welcome Back
      </h2>

      <p className="text-center text-sm sm:text-base text-gray-500 mt-2">
        Sign in to your Scriptora account
      </p>

      <p className="text-center text-xs sm:text-sm mt-4">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-green-600 font-medium hover:underline"
        >
          Sign Up
        </Link>
      </p>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center text-sm mt-4">
          {error}
        </p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(login)}
        className="mt-6 space-y-4 sm:space-y-5"
      >
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Please enter a valid email",
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
        <Button
          type="submit"
          className="
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            py-3
            rounded-xl
            font-semibold
            transition-all
            duration-300
          "
        >
          Sign In
        </Button>
      </form>
    </div>
  </div>
);
};

export default Login;