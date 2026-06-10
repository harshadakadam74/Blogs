import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { LogOut, UserPen,Image, LockKeyhole, BellRing, SunMoon, ChartLine, Upload } from "lucide-react";

function Settings() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const [profileName, setProfileName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const currentAvatarPreview =
    avatarPreview ||
    (userData?.avatar
      ? appwriteService.getAvatarPreview(userData.avatar).toString()
      : null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newFollowerAlerts, setNewFollowerAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [totalPosts, setTotalPosts] = useState(0);
  const [likedPosts, setLikedPosts] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    if (!userData) return;

    let isMounted = true;

    const fetchStats = async () => {
      try {
        const posts = await appwriteService.getPostsByUser(userData.$id);
        const likes = await appwriteService.getUserLikes(userData.$id);
        const followersRes = await appwriteService.getFollowers(userData.$id);
        const followingRes = await appwriteService.getFollowing(userData.$id);

        if (!isMounted) return;

        setTotalPosts(posts?.documents?.length ?? 0);
        setLikedPosts(likes?.documents?.length ?? 0);
        setFollowers(followersRes?.documents?.length ?? 0);
        setFollowing(followingRes?.documents?.length ?? 0);
      } catch (error) {
        console.log("Settings fetch stats error:", error);
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [userData]);

  const handleAvatarSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUploadAvatar = async () => {
    if (!selectedAvatar || !userData) return;

    try {
      const uploaded = await appwriteService.uploadAvatar(selectedAvatar);
      if (uploaded) {
        await appwriteService.updateUserAvatar(userData.$id, uploaded.$id);
        window.location.reload();
      }
    } catch (error) {
      console.log("Avatar upload error:", error);
    }
  };

  const handleSaveProfile = () => {
    window.alert("Profile settings saved.");
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    window.alert("Delete account feature is not configured yet.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Scriptora Settings</h1>

        <div className="lg:hidden bg-white rounded-3xl p-4 shadow-lg mb-6">
          <nav className="flex flex-wrap gap-2">
            <Link
              to="/profile"
              className="flex-1 min-w-30 text-center rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition"
            >
              <UserPen size={18} />
              <span>Profile</span>
            </Link>
            <Link
              to="/settings/avatar"
              className="flex-1 min-w-30 text-center rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition"
            >
              <Image size={18} />
              <span>Avatar</span>
            </Link>
            <Link
              to="/settings/security"
              className="flex-1 min-w-30 text-center rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition"
            >
              <LockKeyhole size={18} />
              <span>Security</span>
            </Link>
            <Link
              to="/settings/notifications"
              className="flex-1 min-w-30 text-center rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition"
            >
              <BellRing size={18} />
              <span>Notifications</span>
            </Link>
            <Link
              to="/settings/appearance"
              className="flex-1 min-w-30 text-center rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition"
            >
              <SunMoon size={18} />
              <span>Appearance</span>
            </Link>
            <Link
              to="/settings/stats"
              className="flex-1 min-w-30 text-center rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition"
            >
              <ChartLine size={18} />
              <span>Account Stats</span>
            </Link>
          </nav>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block bg-white rounded-3xl p-6 shadow-lg h-fit lg:sticky lg:top-24">
            <nav className="space-y-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition"
              >
                <UserPen size={18} /> 
                <span>Profile</span>
              </Link>

              <Link
                to="/settings/avatar"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition"
              >
                <Image size={18} />
                <span> Avatar </span>
              </Link>

              <Link
                to="/settings/security"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition"
              >
                <LockKeyhole size={18} />
                <span>Security</span>
              </Link>

              <Link
                to="/settings/notifications"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition"
              >
                <BellRing size={18}/>
                <span>Notifications</span>
              </Link>

              <Link
                to="/settings/appearance"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition"
              >
                <SunMoon size={18} />
                <span>Appearance</span>
              </Link>

              <Link
                to="/settings/stats"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition"
              >
                <ChartLine size={18} />
                <span>Account Stats</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            <div
              id="profile"
              className="bg-white rounded-3xl p-8 shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <div className="grid gap-4">
                <input
                  type="text"
                  value={profileName || userData?.name || ""}
                  onChange={(event) => setProfileName(event.target.value)}
                  placeholder="Full Name"
                  className="w-full border rounded-xl p-3"
                />
                <input
                  type="email"
                  disabled
                  value={userData?.email || ""}
                  className="w-full border rounded-xl p-3 mt-4 bg-gray-50"
                />
                <button
                  onClick={handleSaveProfile}
                  className="mt-5 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div
              id="avatar"
              className="bg-white rounded-3xl p-8 shadow-lg scroll-mt-24"
            >
              <div className="grid gap-6 md:grid-cols-[180px_1fr] items-center">
                <div className="flex flex-col items-center gap-4">
                  {currentAvatarPreview ? (
                    <img
                      src={currentAvatarPreview}
                      alt="Avatar preview"
                      className="w-40 h-40 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-emerald-600 text-white flex items-center justify-center text-4xl font-bold">
                      {userData?.name?.charAt(0) || "S"}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload a new avatar
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarSelect}
                  />
                 <button
  onClick={handleUploadAvatar}
  className="
    w-full
    bg-emerald-600
    text-white
    font-medium
    px-6 py-3
    rounded-xl
    hover:bg-emerald-700
    transition
    flex
    items-center
    justify-center
    gap-2
  "
>
  <Upload size={20} />
  <span>Upload Avatar</span>
</button>
                </div>
              </div>
            </div>

            <div
              id="security"
              className="bg-white rounded-3xl p-8 shadow-lg scroll-mt-24"
            >
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                Change Password
              </button>
            </div>

            <div
              id="notifications"
              className="bg-white rounded-3xl p-8 shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-6">Notifications</h2>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications((prev) => !prev)}
                  className="h-5 w-5 rounded border-gray-300 text-emerald-600"
                />
                Email Notifications
              </label>
              <label className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  checked={newFollowerAlerts}
                  onChange={() => setNewFollowerAlerts((prev) => !prev)}
                  className="h-5 w-5 rounded border-gray-300 text-emerald-600"
                />
                New Followers Alerts
              </label>
            </div>

            <div
              id="appearance"
              className="bg-white rounded-3xl p-8 shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-6">Appearance</h2>
              <p className="text-gray-600 mb-4">
                Customize your Scriptora experience.
              </p>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode((prev) => !prev)}
                  className="h-5 w-5 rounded border-gray-300 text-emerald-600"
                />
                Dark Mode
              </label>
            </div>

            <div
              id="stats"
              className="bg-white rounded-3xl p-8 shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-6">Account Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-3xl border border-gray-200 p-5">
                  <h3 className="text-sm uppercase text-gray-500">Posts</h3>
                  <p className="mt-3 text-3xl font-semibold">{totalPosts}</p>
                </div>
                <div className="rounded-3xl border border-gray-200 p-5">
                  <h3 className="text-sm uppercase text-gray-500">
                    Liked posts
                  </h3>
                  <p className="mt-3 text-3xl font-semibold">{likedPosts}</p>
                </div>
                <div className="rounded-3xl border border-gray-200 p-5">
                  <h3 className="text-sm uppercase text-gray-500">Followers</h3>
                  <p className="mt-3 text-3xl font-semibold">{followers}</p>
                </div>
                <div className="rounded-3xl border border-gray-200 p-5">
                  <h3 className="text-sm uppercase text-gray-500">Following</h3>
                  <p className="mt-3 text-3xl font-semibold">{following}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Danger Zone</h2>
              <div className="flex flex-col gap-4 sm:flex-row">
              <button
  onClick={handleLogout}
  className="
    group
    flex items-center
    gap-2
    bg-red-600
    text-white
    px-4 py-3
    rounded-xl
    hover:bg-red-700
    transition
  "
>
  <LogOut size={18} />

  <span className="font-medium">
    Logout
  </span>
</button>
                <button
                  onClick={handleDeleteAccount}
                  className="border border-red-500 font-medium text-red-500 px-6 py-3 rounded-xl hover:bg-red-50 transition"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
