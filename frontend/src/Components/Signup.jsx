import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
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
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#2B2B2B]">
          Join{" "}
          <span className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
            Scriptora
          </span>
        </h2>

        <p className="text-center text-gray-500 mt-3 text-sm sm:text-base leading-relaxed">
          Create your account and start sharing your
          <span className="font-semibold text-[#DD2A7B]"> stories</span>,
          <span className="font-semibold text-[#8134AF]"> ideas</span>, and
          <span className="font-semibold text-[#F58529]"> creativity</span>.
        </p>

        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
      font-semibold
      bg-gradient-to-r
      from-[#F58529]
      via-[#DD2A7B]
      to-[#8134AF]
      bg-clip-text
      text-transparent
      hover:opacity-80
      transition
    "
          >
            Sign In
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center text-sm mt-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Please enter a valid email",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />

          <Button
            type="submit"
            className="
          w-full  
          rounded-xl
        "
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
