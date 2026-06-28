import React from "react";
import { Shield, KeyRound, Mail, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SecuritySettings() {
  const navigate = useNavigate();

  return (
    <div
      id="security"
      className="
        max-w-3xl mx-auto
        bg-white
        rounded-2xl
        border border-gray-200
        shadow-sm
        p-6 md:p-10
        mt-10
      "
    >
      {/* Header */}
      <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800 mb-8">
        <Shield className="text-gray-800" />
        Security
      </h2>

      <div className="space-y-4">

        {/* Change Password */}
        <div
          className="
            flex items-center justify-between
            p-5
            rounded-xl
            border border-gray-200
            hover:bg-gray-50
            transition
          "
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center">
              <KeyRound className="text-gray-700" size={20} />
            </div>

            <div>
              <h3 className="font-medium text-gray-800">
                Change Password
              </h3>
              <p className="text-sm text-gray-500">
                Update your account password
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/change-password")}
            className="
              px-4 py-2
             text-sm font-medium
              text-blue-500
              hover:text-blue-600
              active:scale-95
              transition
              bg-blue-100
              rounded-xl
            "
          >
            Change
          </button>
        </div>

        {/* Email Verification */}
        <div
          className="
            flex items-center justify-between
            p-5
            rounded-xl
            border border-gray-200
            hover:bg-green-50
            transition
          "
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center">
              <Mail className="text-gray-700" size={20} />
            </div>

            <div>
              <h3 className="font-medium text-gray-800">
                Email Verification
              </h3>
              <p className="text-sm text-gray-500">
                Your email is verified
              </p>
            </div>
          </div>

          <span
            className="
              px-3 py-1.5
              rounded-full
              text-xs font-medium
              bg-gray-100
              text-green-500
            "
          >
            Verified
          </span>
        </div>

        {/* Two Factor Auth */}
        <div
          className="
            flex items-center justify-between
            p-5
            rounded-xl
            border border-gray-200
            hover:bg-blue-50
            transition
          "
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center">
              <Smartphone className="text-gray-700" size={20} />
            </div>

            <div>
              <h3 className="font-medium text-gray-800">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security
              </p>
            </div>
          </div>

          <button
            className="
              px-4 py-2
              border border-gray-300
              text-blue-500
              text-sm
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >
            Enable
          </button>
        </div>

      </div>
    </div>
  );
}

export default SecuritySettings;