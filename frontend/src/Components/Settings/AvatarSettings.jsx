import React from "react";
import { Camera, Upload } from "lucide-react";
import Button from "../Button";

function AvatarSettings({
  currentAvatarPreview,
  userData,
  handleAvatarSelect,
  handleUploadAvatar,
}) {
  return (
    <div
      id="avatar"
      className="
        max-w-3xl mx-auto
        bg-white
        rounded-2xl
        border border-gray-200
        shadow-sm
        p-6 md:p-10
      "
    >
      {/* Header */}
      <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800">
        Edit Profile Photo
      </h2>

      <p className="text-center text-gray-500 text-sm mt-1">
        Choose a new profile picture for your account
      </p>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mt-8">
        <div className="relative">
          {currentAvatarPreview ? (
            <img
              src={currentAvatarPreview}
              alt="Avatar"
              className="
                w-36 h-36 md:w-44 md:h-44
                rounded-full
                object-cover
                border border-gray-200
              "
            />
          ) : (
            <div
              className="
                w-36 h-36 md:w-44 md:h-44
                rounded-full
                bg-gradient-to-br from-gray-100 to-gray-200
                flex items-center justify-center
                text-4xl md:text-5xl
                font-semibold text-gray-600
                border border-gray-200
              "
            >
              {userData?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          {/* Camera Icon */}
          <label
            className="
    absolute bottom-2 right-2
    w-10 h-10
    bg-black/80
    backdrop-blur-md
    text-white
    flex items-center justify-center
    rounded-full
    cursor-pointer
    border border-white/20
    shadow-md
    hover:scale-105
    hover:bg-black
    active:scale-95
    transition
  "
          >
            <Camera size={16} />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarSelect}
            />
          </label>
        </div>

        {/* Upload Box */}
        <label
          className="
            mt-6
            w-full md:w-[420px]
            border border-gray-200
            rounded-xl
            p-6
            flex flex-col items-center justify-center
            cursor-pointer
            hover:bg-gray-50
            transition
          "
        >
          <Upload size={28} className="text-gray-600 mb-2" />

          <p className="text-sm font-medium text-gray-700">
            Click to upload photo
          </p>

          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP up to 5MB</p>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarSelect}
          />
        </label>

        {/* Save Button */}
        <Button onClick={handleUploadAvatar}>Save Changes</Button>
      </div>
    </div>
  );
}

export default AvatarSettings;
