import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "../Components";
import { ThumbsUp } from "lucide-react";
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

  const [bookmarkedPosts, setBookmarkedPosts] =
  useState(0);

  const [bookmarkItems, setBookmarkItems] =
  useState([]);

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

        const bookmarks =
          await appwriteService.getUserBookmarks(
            userData.$id
          );

        if (!isMounted) return;
        setBookmarkedPosts(bookmarks?.documents?.length ?? 0);

        const bookmarkDetails = await Promise.all(
          (bookmarks?.documents ?? []).map(
            async (bookmark) => {
              try {
                return await appwriteService.getPost(
                  bookmark.postId,
                );
              } catch {
                return null;
              }
            },
          ),
        );

        if (!isMounted) return;
        setBookmarkItems(
          bookmarkDetails.filter((post) => post && post.$id),
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



  useEffect(() => {
  if (!userData) return;

  let isMounted = true;

  const fetchBookmarks = async () => {
    try {
      const bookmarks =
        await appwriteService.getUserBookmarks(
          userData.$id
        );

      if (!isMounted) return;

      setBookmarkedPosts(
        bookmarks?.documents?.length ?? 0
      );

      const bookmarkedPostIds =
        bookmarks.documents.map(
          (bookmark) => bookmark.postId
        );

      const bookmarkDetails =
        await Promise.all(
          bookmarkedPostIds.map(
            async (postId) => {
              try {
                return await appwriteService.getPost(
                  postId
                );
              } catch {
                return null;
              }
            }
          )
        );

      if (!isMounted) return;

      setBookmarkItems(
        bookmarkDetails.filter(Boolean)
      );

    } catch (error) {
      console.log(error);
    }
  };

  fetchBookmarks();

  return () => {
    isMounted = false;
  };
}, [userData]);
  return (
    <Container>
      <div className="max-w-7xl mx-auto py-10 px-4">

        {/* Header */}
        <div className="
  bg-gradient-to-r
  from-emerald-600
  via-green-600
  to-teal-600
  rounded-[32px]
  shadow-2xl
  p-10 md:p-14
  text-white
  mb-10
  
">
  <div className=" grid lg:grid-cols-4 gap-8 ">

    <div className="lg:col-span-2">
  <div
    className="
      bg-white
      rounded-[32px]
      shadow-lg
      p-8
      sticky top-24
      border border-slate-100
      hover:shadow-2xl
      transition-all duration-300
      overflow-hidden
      relative
      
    "
  >

  <div className="grid md:grid-cols-[140px_1fr] gap-6 items-center">

  {/* Profile Image */}
  <div className="flex justify-center">
    {userData?.avatar ? (
      <img
        src={userData.avatar}
        alt="Profile"
        className="
          w-32 h-32
          rounded-full
          object-cover
          border-4 border-emerald-100
          shadow-lg
        "
      />
    ) : (
      <div
        className="
          w-32 h-32
          rounded-full
          bg-emerald-500
          flex items-center justify-center
          text-white
          text-5xl
          font-bold
          shadow-lg
        "
      >
        {userData?.name?.charAt(0).toUpperCase()}
      </div>
    )}
  </div>

  {/* User Info */}
  <div>
    <h2 className="text-3xl font-bold text-gray-800">
      {userData?.name}
    </h2>

    <p className="text-gray-500 mt-2">
      {userData?.email}
    </p>

    <span
      className="
        inline-block
        mt-4
        px-4 py-2
        rounded-full
        bg-emerald-100
        text-emerald-700
        text-sm font-medium
      "
    >
      Scriptora Member
    </span>
  </div>

  </div>

</div>
    </div>

  </div>
</div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-8 shadow-lg">
  <h3>Posts</h3>

  <p className="text-5xl font-black text-emerald-600">
    {totalPosts}
  </p>
</div>

<div className="bg-white rounded-3xl p-8 shadow-lg">
  <h3 className="text-gray-600"><ThumbsUp/></h3>

  <p className="text-5xl font-black text-red-500">
    {likedPosts}
  </p>
</div>
<div className="bg-white rounded-3xl p-8 shadow-lg">
  <h3>Saved</h3>

  <p className="text-5xl font-black text-yellow-500 mt-4">
    {bookmarkedPosts}
  </p>
</div>
        </div>

        <div className="
  grid
  grid-cols-1
  md:grid-cols-3
  xl:grid-cols-3
  gap-6
">
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

          <button
  type="button"
  onClick={() =>
    setActiveTab("bookmarks")
  }
  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
    activeTab === "bookmarks"
      ? "bg-yellow-500 text-white"
      : "bg-white text-gray-700 border border-gray-200"
  }`}
>
  Saved Post
</button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              {activeTab === "posts"
                ? "My Posts"
                : activeTab === "likes"
                ? "Liked Posts"
                : "Bookmarks"}
            </h2>

            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activeTab === "posts"
                ? "bg-green-100 text-green-700"
                : activeTab === "likes"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {activeTab === "posts"
                ? `${totalPosts} Posts`
                : activeTab === "likes"
                ? `${likedPosts} Posts`
                : `${bookmarkedPosts} Posts`}
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
          ) : activeTab === "likes" ? (
            likedPostItems.length > 0 ? (
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
            )
          ) : activeTab === "bookmarks" ? (
            bookmarkItems.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-5">
                {bookmarkItems.map((post) => (
                  <Link
                    key={post.$id}
                    to={`/post/${post.$id}`}
                    className="border rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition block"
                  >
                    <h3 className="text-xl font-bold text-gray-800">
                      {post.title}
                    </h3>

                    <div className="flex justify-between items-center mt-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                        Saved
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
                <h3 className="text-xl font-semibold">
                  No bookmarks yet
                </h3>

                <p className="text-gray-400 mt-2">
                  Save posts to read later.
                </p>
              </div>
            )
          ) : null}
  
        </div>
        
      </div>
    </Container>
  );
}

export default Profile;