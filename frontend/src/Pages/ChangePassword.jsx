import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { KeyRound } from "lucide-react";

function ChangePassword() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updatePassword = async (data) => {
    setError("");
    setMessage("");

    try {
      await authService.updatePassword(
        data.newPassword,
        data.oldPassword
      );

      setMessage("Password updated successfully!");
      reset();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-50 via-white to-purple-50">

      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-pink-100 rounded-3xl shadow-xl p-8">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-md">
            <KeyRound />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-black text-center bg-black
         text-transparent bg-clip-text">
          Change Password
        </h2>

        <p className="text-center text-gray-600 mt-2 mb-6">
          Update your account security
        </p>

        {/* Success */}
        {message && (
          <div className="mb-4 text-center text-green-600 bg-green-50 border border-green-100 py-2 rounded-xl text-sm">
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 text-center text-red-600 bg-red-50 border border-red-100 py-2 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(updatePassword)} className="space-y-4">

          <input
            type="password"
            placeholder="Current Password"
            className="
              w-full p-3 rounded-xl
              bg-white/80
              border border-pink-100
              outline-none
              focus:ring-4 focus:ring-pink-100
            "
            {...register("oldPassword", { required: true })}
          />

          <input
            type="password"
            placeholder="New Password"
            className="
              w-full p-3 rounded-xl
              bg-white/80
              border border-pink-100
              outline-none
              focus:ring-4 focus:ring-purple-100
            "
            {...register("newPassword", {
              required: true,
              minLength: 8,
            })}
          />

          <button
            type="submit"
            className="
              w-full py-3 rounded-xl
              font-semibold text-white
              bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]
              shadow-md
              hover:scale-[1.02]
              transition
            "
          >
            Update Password
          </button>

        </form>

      </div>
    </div>
  );
}

export default ChangePassword;