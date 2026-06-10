import { Bell, Mail, UserPlus } from "lucide-react";

function NotificationSettings({
  emailNotifications,
  setEmailNotifications,
  newFollowerAlerts,
  setNewFollowerAlerts,
}) {
  return (
    <div
      id="notifications"
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-emerald-600" />
        <h2 className="text-2xl font-bold">
          Notifications
        </h2>
      </div>

      {/* Email Notifications */}
      <div className="flex items-center justify-between py-4 border-b">
        <div className="flex items-start gap-3">
          <Mail className="text-gray-500 mt-1" size={20} />

          <div>
            <h3 className="font-semibold">
              Email Notifications
            </h3>

            <p className="text-sm text-gray-500">
              Receive updates about your account and posts.
            </p>
          </div>
        </div>

        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={() =>
            setEmailNotifications(!emailNotifications)
          }
          className="h-5 w-5 accent-emerald-600"
        />
      </div>

      {/* Followers Alerts */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-start gap-3">
          <UserPlus
            className="text-gray-500 mt-1"
            size={20}
          />

          <div>
            <h3 className="font-semibold">
              New Followers Alerts
            </h3>

            <p className="text-sm text-gray-500">
              Get notified when someone follows you.
            </p>
          </div>
        </div>

        <input
          type="checkbox"
          checked={newFollowerAlerts}
          onChange={() =>
            setNewFollowerAlerts(!newFollowerAlerts)
          }
          className="h-5 w-5 accent-emerald-600"
        />
      </div>
    </div>
  );
}

export default NotificationSettings;