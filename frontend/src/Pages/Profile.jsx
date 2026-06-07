import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "../Components";
import appwriteService from "../appwrite/config";

function Profile() {
  const userData = useSelector(
    (state) => state.auth.userData
  );

  const [activeTab, setActiveTab] = useState("posts");
  const [totalPosts, setTotalPosts] = useState(0);
  const [likedPosts, setLikedPosts] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const [likedPostItems, setLikedPostItems] = useState([]);

  useEffect(() => {
    if (!userData) return;

    let isMounted = true;

    const fetchProfileData = async () => {
      try {
        const posts =
          await appwriteService.getPostsByUser(
            userData.$id
          );

        if (!isMounted) return;
        setTotalPosts(posts?.documents?.length ?? 0);
        setMyPosts(posts?.documents ?? []);

        const likes =
          await appwriteService.getUserLikes(
            userData.$id
          );

        if (!isMounted) return;
        setLikedPosts(likes?.documents?.length ?? 0);

        const likedPostIds = likes?.documents
          ?.map((like) => like.postId)
          .filter(Boolean) ?? [];

        const likedDetails = await Promise.all(
          likedPostIds.map(async (postId) => {
            try {
              return await appwriteService.getPost(postId);
            } catch {
              return null;
            }
          }),
        );

        if (!isMounted) return;
        setLikedPostItems(
          likedDetails.filter((post) => post && post.$id),
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileData();
    return () => {
      isMounted = false;
    };
  }, [userData]);

  return (
    <Container>
      <div className="max-w-6xl mx-auto py-10">

        {/* Header */}
        <div className="bg-linear-to-r from-emerald-500 to-green-700 rounded-3xl shadow-2xl p-8 text-white mb-8">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-white text-green-700 flex items-center justify-center text-5xl font-bold shadow-lg">
              {userData?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {userData?.name}
              </h1>

              <p className="text-green-100 mt-2">
                {userData?.email}
              </p>

              <p className="mt-3 bg-white/20 inline-block px-4 py-1 rounded-full text-sm">
                Scriptora Member
              </p>
            </div>

          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

            <h2 className="text-gray-600 text-lg">
              Total Posts
            </h2>

            <p className="text-6xl font-black text-emerald-600 mt-3">
              {totalPosts}
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

            <h2 className="text-gray-600 text-lg">
              Liked Posts ❤️
            </h2>

            <p className="text-6xl font-black text-red-500 mt-3">
              {likedPosts}
            </p>

          </div>

        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            type="button"
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeTab === "posts"
                ? "bg-emerald-600 text-white"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            My Posts
          </button>

          <button
            type="button"
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeTab === "likes"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
            onClick={() => setActiveTab("likes")}
          >
            Liked Posts
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              {activeTab === "posts"
                ? "My Posts"
                : "Liked Posts"}
            </h2>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              {activeTab === "posts"
                ? `${totalPosts} Posts`
                : `${likedPosts} Posts`}
            </span>
          </div>

          {activeTab === "posts" ? (
            myPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-5">
                {myPosts.map((post) => (
                  <Link
                    key={post.$id}
                    to={`/post/${post.$id}`}
                    className="border rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition block"
                  >
                    <h3 className="text-xl font-bold text-gray-800">
                      {post.title}
                    </h3>

                    <div className="flex justify-between items-center mt-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          post.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {post.status}
                      </span>

                      <span className="text-gray-400 text-sm">
                        {new Date(post.$createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold text-gray-600">
                  No Posts Yet
                </h3>

                <p className="text-gray-400 mt-2">
                  Create your first blog post 🚀
                </p>
              </div>
            )
          ) : likedPostItems.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-5">
              {likedPostItems.map((post) => (
                <Link
                  key={post.$id}
                  to={`/post/${post.$id}`}
                  className="border rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition block"
                >
                  <h3 className="text-xl font-bold text-gray-800">
                    {post.title}
                  </h3>

                  <div className="flex justify-between items-center mt-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700">
                      Liked
                    </span>

                    <span className="text-gray-400 text-sm">
                      {new Date(post.$createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold text-gray-600">
                No liked posts yet
              </h3>

              <p className="text-gray-400 mt-2">
                Like posts to see them here.
              </p>
            </div>
          )}

        </div>
      </div>
    </Container>
  );
}

export default Profile;