import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container } from "../Components";
import appwriteService from "../appwrite/config";
import { Image } from "lucide-react";

function EditProfile() {
  const userData = useSelector((state) => state.auth.userData);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.name) {
      setName(userData.name);
    }
  }, [userData]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!userData) return;

    try {
      setLoading(true);

      // Update name only if changed
      if (name !== userData.name) {
        await appwriteService.updateUserName(userData.$id, name);
      }

      // Update avatar only if new file selected
      if (avatar) {
        const uploaded = await appwriteService.uploadAvatar(avatar);
        await appwriteService.updateUserAvatar(userData.$id, uploaded.$id);
      }

      // Better UX: no reload
      alert("Profile updated successfully...");
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const avatarSrc = preview
    ? preview
    : userData?.avatar
    ? appwriteService.getAvatarPreview(userData.avatar).toString()
    : null;

  return (
    <Container>
      <div className="max-w-3xl mx-auto py-12 px-4">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900">
            Edit Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Update your personal information
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-[30px] p-8 md:p-10">

          {/* AVATAR */}
          <div className="flex flex-col items-center mb-8">

            <div className="relative">
              <div className="p-[4px] rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]">

                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt="avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-4xl font-black">
                    {userData?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

              </div>

              {/* upload button */}
              <label className="absolute bottom-2 right-2 w-9 h-9 bg-white text-purple-600 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition">
                <Image size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Click to update profile photo
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-5">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your name"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                value={userData?.email || ""}
                disabled
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500"
              />
            </div>

          </div>

          {/* SAVE BUTTON */}
          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full mt-8 py-3 "
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

        </div>
      </div>
    </Container>
  );
}

export default EditProfile;