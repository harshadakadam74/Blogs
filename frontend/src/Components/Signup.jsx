import React, {useState} from 'react';
import authService  from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Store/authSlice';
import {Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux'; 
import { useForm } from 'react-hook-form';

const Signup = () => {
    const  navigate = useNavigate()
    const [ error, setError ] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                    navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4 py-8">
  <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8">

    {/* Logo */}
    <div className="flex justify-center mb-6">
      <Logo />
    </div>

    {/* Heading */}
    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
      Create Account
    </h2>

    <p className="text-center text-gray-500 mt-2 text-sm sm:text-base">
      Join Scriptora and start sharing your stories
    </p>

    <p className="text-center text-sm mt-4">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-green-600 font-medium hover:underline"
      >
        Sign In
      </Link>
    </p>

    {/* Error Message */}
    {error && (
      <p className="text-red-500 text-center text-sm mt-4">
        {error}
      </p>
    )}

    {/* Form */}
    <form
      onSubmit={handleSubmit(create)}
      className="mt-6 space-y-4"
    >
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
        {...register("password", {
          required: true,
        })}
      />

      <Button
        type="submit"
        className="
          w-full
          bg-gradient-to-r
          from-green-500
          to-emerald-600
          hover:from-green-600
          hover:to-emerald-700
          text-white
          py-3
          rounded-xl
          font-semibold
          transition-all
          duration-300
          shadow-md
        "
      >
        Create Account
      </Button>
    </form>
  </div>
</div>
    </>
  )
}

export default Signup
