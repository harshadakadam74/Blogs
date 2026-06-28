import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // if (authentication && authStatus !== authentication) {
    //         navigate("/login")
    //     }else if(!authentication && authStatus !== authentication){
    //         navigate("/")
    //     }
    //     setLoader(false)
    // }, [authStatus, navigate, authentication])
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }

    const timer = setTimeout(() => {
      setLoader(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [authStatus, authentication, navigate]);

  if (loader) {
    return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF7F3] via-[#FFF5FA] to-[#F9F3FF]">
    <div className="text-center">
      {/* Spinner */}
      <div
        className="
          w-14
          h-14
          border-4
          border-[#F8D8C0]
          border-t-[#DD2A7B]
          rounded-full
          animate-spin
          mx-auto
        "
      ></div>

      {/* Logo */}
      <h1 className="mt-6 text-4xl font-black">
        <span className="text-[#2B2B2B]">Script</span>
        <span className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
          ora
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-gray-500 font-medium tracking-wide">
        Preparing your stories...
      </p>
    </div>
  </div>
);
  }

  return <>{children}</>;
};

export default AuthLayout;
