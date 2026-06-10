import React from "react";
import {
  FileText,
  Heart,
  Users,
  UserPlus,
} from "lucide-react";

function AccountStats({
  totalPosts,
  likedPosts,
  followers,
  following,
}) {
  const stats = [
    {
      title: "Posts",
      value: totalPosts,
      icon: FileText,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Likes",
      value: likedPosts,
      icon: Heart,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      title: "Followers",
      value: followers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Following",
      value: following,
      icon: UserPlus,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div id="stats">
      <h2 className="text-2xl font-bold mb-6">
        Account Stats
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                bg-white
                p-6
                rounded-3xl
                shadow-lg
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm uppercase text-gray-500">
                    {stat.title}
                  </h3>

                  <p
                    className={`mt-3 text-4xl font-black ${stat.color}`}
                  >
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`
                    w-14 h-14
                    rounded-2xl
                    flex items-center justify-center
                    ${stat.bg}
                  `}
                >
                  <Icon
                    size={26}
                    className={stat.color}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AccountStats;