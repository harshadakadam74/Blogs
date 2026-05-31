import React from "react";
import { Signup as SignupComponent } from "../Components";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 py-8">
      <SignupComponent />
    </div>
  );
};

export default Signup;