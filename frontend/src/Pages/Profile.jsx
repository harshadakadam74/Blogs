import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "../Components";
import appwriteService from "../appwrite/config";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const [totalPosts, setTotalPosts] = useState(0);
  const [likedPosts, setLikedPosts] = useState(0);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    if (!userData) return;

    let isMounted = true;

    const fetchProfileData = async () => {
      try {
        const posts = await appwriteService.getPostsByUser(userData.$id);

        if (!isMounted) return;
        setTotalPosts(posts?.documents?.length ?? 0);

        const likes = await appwriteService.getUserLikes(userData.$id);

        if (!isMounted) return;
        setLikedPosts(likes?.documents?.length ?? 0);

        const bookmarks = await appwriteService.getUserBookmarks(userData.$id);

        if (!isMounted) return;
        setBookmarkedPosts(bookmarks?.documents?.length ?? 0);

        const followersRes = await appwriteService.getFollowers(userData.$id);
        const followingRes = await appwriteService.getFollowing(userData.$id);

        if (!isMounted) return;
        setFollowers(followersRes?.documents?.length ?? 0);
        setFollowing(followingRes?.documents?.length ?? 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileData();
    return () => {
      isMounted = false;
    };
  }, [userData]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploaded = await appwriteService.uploadAvatar(file);
      if (!uploaded) return;

      await appwriteService.updateUserAvatar(userData.$id, uploaded.$id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-10 px-4">
        {/* Header */}
        <div
          className="
            bg-linear-to-r
            from-emerald-600
            via-green-600
            to-teal-600
            rounded-4xl
            shadow-2xl
            p-10 md:p-14
            text-white
            mb-10
  
"
        >
          <div className=" grid lg:grid-cols-4 gap-8 ">
            <div className="lg:col-span-2">
              <div
                className="
                  bg-white
                  rounded-4xl
                  shadow-lg
                  p-8
                  sticky top-24
                  border border-slate-100
                  hover:shadow-2xl
                  transition-all duration-300
                  overflow-hidden
      
      
    "
              >
                <div className="grid md:grid-cols-[140px_1fr] gap-6 items-center">
                  {/* Profile Image */}
                  <div className="flex justify-center relative">
                    {userData?.avatar ? (
                      <img
                        src={appwriteService.getAvatarPreview(userData.avatar).toString()}
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
                        {userData?.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <label className="
                      absolute bottom-0 right-0
                      bg-emerald-600 text-white
                      w-10 h-10 rounded-full
                      flex items-center justify-center
                      cursor-pointer shadow-lg
                      hover:bg-emerald-700
                      text-xl
                    ">
                      📷
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </label>
                  </div>

                  {/* User Info */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {userData?.name}
                    </h2>

                    <p className="text-gray-500 mt-2">{userData?.email}</p>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Link
            to="/profile/posts"
            className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition block"
          >
            <h2 className="text-gray-500">Posts</h2>
            <p className="text-6xl font-black text-emerald-600">
              {totalPosts}
            </p>
          </Link>

          <Link
            to="/profile/likes"
            className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition block"
          >
            <h2 className="text-gray-500">Likes</h2>
            <p className="text-6xl font-black text-red-500">
              {likedPosts}
            </p>
          </Link>

          <Link
            to="/profile/bookmarks"
            className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition block"
          >
            <h2 className="text-gray-500">Saved</h2>
            <p className="text-6xl font-black text-yellow-500">
              {bookmarkedPosts}
            </p>
          </Link>

          <Link
            to="/profile/followers"
            className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition block"
          >
            <h2 className="text-gray-500">Followers</h2>
            <p className="text-6xl font-black text-blue-600">
              {followers}
            </p>
          </Link>

          <Link
            to="/profile/following"
            className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition block"
          >
            <h2 className="text-gray-500">Following</h2>
            <p className="text-6xl font-black text-purple-600">
              {following}
            </p>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Profile;
