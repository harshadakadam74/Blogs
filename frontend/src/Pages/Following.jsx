import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../Components";
import appwriteService from "../appwrite/config";
import { UserPlus } from "lucide-react";

function Following() {
  const userData = useSelector((state) => state.auth.userData);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      setLoading(false);
      return;
    }

    const loadFollowing = async () => {
      try {
        const response = await appwriteService.getFollowing(userData.$id);
        setFollowing(response?.documents ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadFollowing();
  }, [userData]);

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="text-center bg-white/70 backdrop-blur-md px-8 py-10 rounded-3xl shadow-lg border border-pink-100">
          <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading following...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div className="max-w-6xl mx-auto py-10 px-4">

        {/* Header */}
        <div className="text-center mb-10">

          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-md">
              <UserPlus />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black bg-black text-transparent bg-clip-text">
            Following
          </h1>

          <p className="text-gray-600 mt-2">
            Creators you support
          </p>

        </div>

        {/* Grid */}
        {following.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {following.map((item) => {
              const username =
                item.username ||
                item.followingName ||
                item.name ||
                item.followingId?.slice(0, 8) ||
                "user";

              return (
                <div
                  key={item.$id}
                  className="
                    bg-white/70 backdrop-blur-md
                    border border-pink-100
                    rounded-3xl
                    p-5
                    shadow-md
                    hover:shadow-xl
                    transition
                  "
                >
                  {/* Avatar */}
                  <div className="flex items-center gap-3 mb-3">

                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white font-bold">
                      {username.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {username}
                      </h3>

                      <p className="text-xs text-gray-500">
                        @{username}
                      </p>
                    </div>

                  </div>

                  {/* ID fallback (optional) */}
                  <p className="text-sm text-gray-400 break-all">
                    {item.followingId}
                  </p>

                </div>
              );
            })}

          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="relative mb-4">
              <UserPlus className="w-14 h-14 text-pink-400" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-orange-300 opacity-20 blur-2xl rounded-full"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Not following anyone yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
              Follow creators to see their updates and posts here.
            </p>

          </div>
        )}

      </div>
    </Container>
  );
}

export default Following;