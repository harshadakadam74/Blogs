import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

function Settings() {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Scriptora Settings</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Profile</h2>

            {userData?.avatar ? (
              <img
                src={appwriteService.getAvatarPreview(userData.avatar).toString()}
                alt={userData.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xl font-bold">
                {userData?.name?.charAt(0)}
              </div>
            )}

            <h3 className="mt-4 font-semibold text-gray-900">{userData?.name}</h3>
            <p className="text-gray-500">{userData?.email}</p>

            <div className="mt-6 space-y-3">
              <button className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition">
                Edit Profile
              </button>
              <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition">
                Upload Avatar
              </button>
            </div>
          </div>

          {/* Account Card */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <p className="text-gray-500 mb-6">Manage your login and account preferences.</p>

            <button className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition">
              Change Password
            </button>
          </div>

          {/* Preferences Card */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Preferences</h2>
            <p className="text-gray-500 mb-6">Customize your Scriptora experience.</p>

            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-emerald-600" />
                Email notifications
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-emerald-600" />
                Dark mode
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-emerald-600" />
                New post alerts
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
