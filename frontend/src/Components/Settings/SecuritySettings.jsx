import React from "react";
import { Shield, KeyRound, Mail, Smartphone } from "lucide-react";

function SecuritySettings() {
  return (
    <div
      id="security"
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Shield className="text-blue-600" />
        Security
      </h2>

      <div className="space-y-4">

        {/* Change Password */}
        <div className="flex items-center justify-between p-4 border rounded-2xl">
          <div className="flex items-center gap-3">
            <KeyRound className="text-blue-600" />
            <div>
              <h3 className="font-semibold">
                Change Password
              </h3>
              <p className="text-sm text-gray-500">
                Update your account password
              </p>
            </div>
          </div>

          <button
            className="
              bg-blue-600
              text-white
              px-5 py-2
              rounded-xl
              hover:bg-blue-700
              transition
            "
          >
            Change
          </button>
        </div>

        {/* Email Verification */}
        <div className="flex items-center justify-between p-4 border rounded-2xl">
          <div className="flex items-center gap-3">
            <Mail className="text-emerald-600" />
            <div>
              <h3 className="font-semibold">
                Email Verification
              </h3>
              <p className="text-sm text-gray-500">
                Your email is verified
              </p>
            </div>
          </div>

          <span className="text-emerald-600 font-medium">
            Verified
          </span>
        </div>

        {/* Two Factor Auth */}
        <div className="flex items-center justify-between p-4 border rounded-2xl">
          <div className="flex items-center gap-3">
            <Smartphone className="text-purple-600" />
            <div>
              <h3 className="font-semibold">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security
              </p>
            </div>
          </div>

          <button
            className="
              border
              border-purple-600
              text-purple-600
              px-5 py-2
              rounded-xl
              hover:bg-purple-50
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