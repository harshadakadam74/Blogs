import React from "react";
import { Camera } from "lucide-react";

function AvatarSettings({
  currentAvatarPreview,
  userData,
  handleAvatarSelect,
  handleUploadAvatar,
}) {
  return (
    <div
      id="avatar"
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">
        Profile Picture
      </h2>

      <div className="grid gap-8 md:grid-cols-[220px_1fr] items-center">
        {/* Avatar Preview */}
        <div className="flex justify-center">
          <div className="relative">
            {currentAvatarPreview ? (
              <img
                src={currentAvatarPreview}
                alt="Avatar"
                className="
                  w-44 h-44
                  rounded-full
                  object-cover
                  border-4
                  border-emerald-100
                  shadow-xl
                "
              />
            ) : (
              <div
                className="
                  w-44 h-44
                  rounded-full
                  bg-emerald-600
                  text-white
                  flex
                  items-center
                  justify-center
                  text-5xl
                  font-bold
                  shadow-xl
                "
              >
                {userData?.name?.charAt(0)?.toUpperCase() || "S"}
              </div>
            )}

            <label
              className="
                absolute
                bottom-2
                right-2
                w-12 h-12
                rounded-full
                bg-emerald-600
                text-white
                flex items-center
                justify-center
                cursor-pointer
                shadow-lg
                hover:bg-emerald-700
                transition
              "
            >
              <Camera size={20} />

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarSelect}
              />
            </label>
          </div>
        </div>

        {/* Upload Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Update your profile photo
          </h3>

          <p className="text-gray-500 mb-6">
            Upload a clear image. Recommended size:
            500×500px.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarSelect}
            className="
              w-full
              border
              border-gray-200
              rounded-xl
              p-3
              mb-4
            "
          />

          <button
            onClick={handleUploadAvatar}
            className="
              bg-emerald-600
              text-white
              px-6 py-3
              rounded-xl
              hover:bg-emerald-700
              transition
              font-medium
            "
          >
            Upload Avatar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarSettings;