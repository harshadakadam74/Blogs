import { Bell, Mail, UserPlus } from "lucide-react";
import Button from "../Button";

function NotificationSettings({
  emailNotifications,
  setEmailNotifications,
  newFollowerAlerts,
  setNewFollowerAlerts,
  saveNotificationSettings,
}) {
  return (
    <div
      id="notifications"
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
      <div className="flex items-center gap-3 mb-8">
        <Bell className="text-gray-800" />
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Notifications
        </h2>
      </div>

      {/* Email Notifications */}
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
        <div className="flex items-start gap-3">
          <Mail className="text-gray-500 mt-1" size={20} />

          <div>
            <h3 className="font-medium text-gray-800">
              Email Notifications
            </h3>
            <p className="text-sm text-gray-500">
              Account updates and activity alerts.
            </p>
          </div>
        </div>

        {/* Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="sr-only peer"
          />

          <div
            className="
              w-11 h-6
              bg-gray-300
              rounded-full
              peer-checked:bg-pink-700
              transition
              after:content-['']
              after:absolute
              after:top-[2px]
              after:left-[2px]
              after:w-5
              after:h-5
              after:bg-white
              after:rounded-full
              after:transition
              peer-checked:after:translate-x-5
            "
          />
        </label>
      </div>

      {/* Followers Alerts */}
      <div
        className="
          flex items-center justify-between
          p-5
          rounded-xl
          border border-gray-200
          hover:bg-gray-50
          transition
          mt-4
        "
      >
        <div className="flex items-start gap-3">
          <UserPlus className="text-gray-500 mt-1" size={20} />

          <div>
            <h3 className="font-medium text-gray-800">
              New Followers
            </h3>
            <p className="text-sm text-gray-500">
              Get notified when someone follows you.
            </p>
          </div>
        </div>

        {/* Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={newFollowerAlerts}
            onChange={(e) => setNewFollowerAlerts(e.target.checked)}
            className="sr-only peer"
          />

          <div
            className="
              w-11 h-6
              bg-gray-300
              rounded-full
              peer-checked:bg-pink-700
              transition
              after:content-['']
              after:absolute
              after:top-[2px]
              after:left-[2px]
              after:w-5
              after:h-5
              after:bg-white
              after:rounded-full
              after:transition
              peer-checked:after:translate-x-5
            "
          />
        </label>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={saveNotificationSettings}
          
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default NotificationSettings;