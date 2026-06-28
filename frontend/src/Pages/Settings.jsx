import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import {
  LogOut,
  UserPen,
  Image,
  LockKeyhole,
  BellRing,
  SunMoon,
  ChartLine,
} from "lucide-react";

import { LogoutBtn } from "../Components";

function Settings() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const [profileName, setProfileName] = useState("");

  const [totalPosts, setTotalPosts] = useState(0);
  const [likedPosts, setLikedPosts] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [emailNotifications, setEmailNotifications] = useState(false);

  const [newFollowerAlerts, setNewFollowerAlerts] = useState(false);

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

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await appwriteService.getNotificationSettings(
          userData.$id,
        );

        if (settings) {
          setEmailNotifications(settings.emailNotifications);
          setNewFollowerAlerts(settings.newFollowerAlerts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userData?.$id) {
      loadSettings();
    }
  }, [userData]);


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
    <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-semibold text-center  text-gray-900 mb-5">
          {" "}
          Settings
        </h1>

        <div className="lg:hidden bg-white rounded-2xl overflow-hidden mx-4 mt-4 shadow-sm">
          <nav className="divide-y divide-gray-100">
            <Link
              to="/profile"
              className="flex items-center text-center gap-3 active:bg-gray-50 px-4 py-4 text-sm hover:text-pink-700 transition"
            >
              <UserPen size={18} />
              <span>Profile</span>
            </Link>
            <Link
              to="/settings/avatar"
              className="flex items-center text-center gap-3 active:bg-gray-50 px-4 py-4 text-sm hover:text-pink-700 transition"
            >
              <Image size={18} />
              <span>Avatar</span>
            </Link>
            <Link
              to="/settings/security"
              className="flex items-center text-center gap-3 active:bg-gray-50 px-4 py-4 text-sm hover:text-pink-700 transition"
            >
              <LockKeyhole size={18} />
              <span>Security</span>
            </Link>
            <Link
              to="/settings/notifications"
              className="flex items-center text-center gap-3 active:bg-gray-50 px-4 py-4 text-sm hover:text-pink-700 transition"
            >
              <BellRing size={18} />
              <span>Notification</span>
            </Link>
            <Link
              to="/settings/appearance"
              className="flex items-center text-center gap-3 active:bg-gray-50 px-4 py-4 text-sm hover:text-pink-700 transition"
            >
              <SunMoon size={18} />
              <span>Appearance</span>
            </Link>
            <Link
              to="/settings/stats"
              className="flex items-center text-center gap-3 active:bg-gray-50 px-4 py-4 text-sm hover:text-pink-700 transition"
            >
              <ChartLine size={18} />
              <span>Account Stats</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        <div className="lg:flex   lg:gap-10">
          {/* Sidebar */}
          <div className="hidden lg:block bg-white rounded-3xl p-6 shadow-lg h-fit lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <nav className="divide-y divide-gray-100">
                <Link
                  to={`/profile`}
                  className="flex items-center gap-3 px-4 py-4 text-sm hover:bg-gray-50"
                >
                  <UserPen size={18} />

                  <span>Profile</span>
                </Link>

                <Link
                  to={`/settings/avatar`}
                  className="flex items-center gap-3 px-4 py-4 text-sm hover:bg-gray-50"
                >
                  <Image size={18} />

                  <span>Avatar</span>
                </Link>

                <Link
                  to={`/settings/security`}
                  className="flex items-center gap-3 px-4 py-4 text-sm hover:bg-gray-50"
                >
                  <LockKeyhole size={18} />

                  <span>Security</span>
                </Link>

                <Link
                  to={`/settings/notifications`}
                  className="flex items-center gap-3 px-4 py-4 text-sm hover:bg-gray-50"
                >
                  <BellRing size={18} />

                  <span>Notifications</span>
                </Link>

                <Link
                  to={`/settings/appearance`}
                  className="flex items-center gap-3 px-4 py-4 text-sm hover:bg-gray-50"
                >
                  <SunMoon size={18} />

                  <span>Appearance</span>
                </Link>

                <Link
                  to={`/settings/stats`}
                  className="flex items-center gap-3 px-4 py-4 text-sm hover:bg-gray-50"
                >
                  <ChartLine size={18} />

                  <span>Stats</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition"
                >
                  <LogOut size={18} />

                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          <div
            id="profile"
            className="bg-white border w-full border-gray-200 rounded-xl p-6 scroll-mt-24"
          >
            {/* Header */}

            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <UserPen size={20} className="text-gray-700" />

                <span>Profile Information</span>
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Update your personal information and profile details.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={profileName || userData?.name || ""}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Enter your full name"
                    className="
          w-full
          bg-[#fafafa]
          border border-gray-200
          rounded-lg
          px-4 py-3
          text-sm
          focus:outline-none
          focus:border-gray-400
        "
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Email Address
                  </label>

                  <input
                    type="email"
                    disabled
                    value={userData?.email || ""}
                    className="
          w-full
          bg-gray-100
          border border-gray-200
          rounded-lg
          px-4 py-3
          text-sm
          text-gray-500
          cursor-not-allowed
        "
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="
       w-full
        px-5 py-3
        text-sm font-semibold
        text-white
        bg-black
        rounded-lg
        hover:bg-gray-900
        transition
        mt-3
      "
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div
              id="stats"
              className="bg-white border border-gray-200 rounded-xl p-6 scroll-mt-24 mt-6"
            >
              {/* Header */}

              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Account Stats
              </h2>

              {/* Stats list */}

              <div className="divide-y divide-gray-200">
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-600">Posts</span>

                  <span className="text-sm font-semibold text-gray-900">
                    {totalPosts}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-600">Liked Posts</span>

                  <span className="text-sm font-semibold text-gray-900">
                    {likedPosts}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-600">Followers</span>

                  <span className="text-sm font-semibold text-gray-900">
                    {followers}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-600">Following</span>

                  <span className="text-sm font-semibold text-gray-900">
                    {following}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              {/* Header */}

              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Danger Zone
              </h2>

              {/* Actions */}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <LogoutBtn />

                <button
                  onClick={handleDeleteAccount}
                  className="

        px-4 py-4

        text-sm font-medium

        text-red-600

        border border-red-200

        rounded-2xl

        hover:bg-red-50

        transition

      "
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
