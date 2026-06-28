import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import authService from "../appwrite/auth";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resetPassword = async (data) => {
    setError("");
    setMessage("");

    try {
      await authService.resetPassword(data.email);

      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-50 via-white to-purple-50">

      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-pink-100 rounded-3xl shadow-xl p-8">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center shadow-lg">
            <Mail className="text-white" size={28} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-black text-center bg-black text-transparent bg-clip-text">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Enter your email and we'll send you a password reset link.
        </p>

        {/* Success */}
        {message && (
          <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 text-center text-green-700 text-sm">
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-center text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(resetPassword)}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="
              w-full
              rounded-2xl
              border border-pink-100
              bg-white/80
              px-4 py-3
              outline-none
              transition
              focus:border-pink-300
              focus:ring-4
              focus:ring-pink-100
            "
            {...register("email", {
              required: true,
            })}
          />

          <button
            type="submit"
            className="
              w-full
              rounded-2xl
              py-3
              font-semibold
              text-white
              bg-gradient-to-r
              from-[#F58529]
              via-[#DD2A7B]
              to-[#8134AF]
              shadow-lg
              hover:shadow-xl
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            Send Reset Link
          </button>
        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;