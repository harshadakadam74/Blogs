import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../Components";
import appwriteService from "../appwrite/config";

function Dashboard() {
  const userData = useSelector(
    (state) => state.auth.userData
  );

  const [totalPosts, setTotalPosts] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    if (userData) {
      loadDashboard();
    }
  }, [userData]);

  const loadDashboard = async () => {
    try {
      const posts =
        await appwriteService.getPostsByUser(
          userData.$id
        );

      setTotalPosts(posts.documents.length);

      const likes =
        await appwriteService.getUserLikes(
          userData.$id
        );

      setTotalLikes(likes.documents.length);

      setRecentPosts(
        posts.documents.slice(0, 5)
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="max-w-6xl mx-auto py-10">

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-emerald-50 p-6 rounded-3xl shadow">
            <h2 className="text-lg font-semibold">
              Total Posts
            </h2>

            <p className="text-5xl font-bold text-emerald-600 mt-3">
              {totalPosts}
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-3xl shadow">
            <h2 className="text-lg font-semibold">
              Total Likes ❤️
            </h2>

            <p className="text-5xl font-bold text-red-500 mt-3">
              {totalLikes}
            </p>
          </div>

        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Posts
          </h2>

          {recentPosts.length > 0 ? (
            <div className="space-y-4">

              {recentPosts.map((post) => (
                <div
                  key={post.$id}
                  className="border rounded-2xl p-4 hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-lg">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {post.category}
                  </p>
                </div>
              ))}

            </div>
          ) : (
            <p className="text-gray-500">
              No posts available.
            </p>
          )}

        </div>
      </div>
    </Container>
  );
}

export default Dashboard;