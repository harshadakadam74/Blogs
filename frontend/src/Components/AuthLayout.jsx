import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({
  children,
  authentication = true,
}) => {
  const navigate = useNavigate();
  const authStatus = useSelector(
    (state) => state.auth.status
  );

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, authentication, navigate]);

  if (loader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div
            className="
              w-12 h-12
              border-4
              border-green-200
              border-t-green-600
              rounded-full
              animate-spin
              mx-auto
            "
          ></div>

          <p className="mt-4 text-green-700 font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;