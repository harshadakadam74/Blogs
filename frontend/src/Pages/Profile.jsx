import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../Components";
import appwriteService from "../appwrite/config";
import { Image } from "lucide-react";

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
    <div className="max-w-6xl mx-auto py-10 px-4 relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute -z-10 top-0 left-0 w-[500px] h-[500px] bg-pink-300/20 blur-3xl rounded-full" />
      <div className="absolute -z-10 bottom-0 right-0 w-[500px] h-[500px] bg-purple-300/20 blur-3xl rounded-full" />

      {/* PROFILE CARD */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[40px] p-8 md:p-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-10">

          {/* LEFT: AVATAR + INFO */}
          <div className="flex items-center gap-6">

            {/* Avatar */}
            <div className="relative">
              <div className="p-[4px] rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
                {userData?.avatar ? (
                  <img
                    src={appwriteService.getAvatarPreview(userData.avatar).toString()}
                    alt="profile"
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-black">
                    {userData?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>

              {/* upload */}
              <label className="absolute bottom-1 right-1 w-9 h-9 bg-white text-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition">
                <Image size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>

            {/* USER INFO */}
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                {userData?.name}
              </h2>

              <p className="text-gray-500 mt-1">
                {userData?.email}
              </p>

              {/* BADGES */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold">
                   Creator
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                   Blogger
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                   Writer
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: ACTION BUTTON (optional future use) */}
          <Link to={`/edit-profile`}>
            <Button >
              Edit Profile
            </Button>
          </Link>

        </div>

        {/* DIVIDER */}
        <div className="my-8 border-t border-gray-200" />

        {/* STATS (Instagram clickable style) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 text-center">

          <Link to="/profile/posts" className="group">
            <div className="p-4 rounded-2xl hover:bg-gray-50 transition group-hover:scale-105">
              <p className="text-3xl font-black text-purple-600">{totalPosts}</p>
              <p className="text-gray-500 text-sm mt-1">Posts</p>
            </div>
          </Link>

          <Link to="/profile/likes" className="group">
            <div className="p-4 rounded-2xl hover:bg-gray-50 transition group-hover:scale-105">
              <p className="text-3xl font-black text-pink-500">{likedPosts}</p>
              <p className="text-gray-500 text-sm mt-1">Likes</p>
            </div>
          </Link>

          <Link to="/profile/bookmarks" className="group">
            <div className="p-4 rounded-2xl hover:bg-gray-50 transition group-hover:scale-105">
              <p className="text-3xl font-black text-yellow-500">{bookmarkedPosts}</p>
              <p className="text-gray-500 text-sm mt-1">Saved</p>
            </div>
          </Link>

          <Link to="/profile/followers" className="group">
            <div className="p-4 rounded-2xl hover:bg-gray-50 transition group-hover:scale-105">
              <p className="text-3xl font-black text-blue-500">{followers}</p>
              <p className="text-gray-500 text-sm mt-1">Followers</p>
            </div>
          </Link>

          <Link to="/profile/following" className="group">
            <div className="p-4 rounded-2xl hover:bg-gray-50 transition group-hover:scale-105">
              <p className="text-3xl font-black text-indigo-500">{following}</p>
              <p className="text-gray-500 text-sm mt-1">Following</p>
            </div>
          </Link>

        </div>

      </div>
    </div>
  </Container>
);
}

export default Profile;
