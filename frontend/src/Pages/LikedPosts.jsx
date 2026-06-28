import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../Components";
import appwriteService from "../appwrite/config";
import { Heart } from "lucide-react";

function LikedPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) return;

    const loadLikedPosts = async () => {
      try {
        const likes = await appwriteService.getUserLikes(userData.$id);
        const postIds = likes?.documents?.map((like) => like.postId).filter(Boolean) ?? [];

        const likedPosts = await Promise.all(
          postIds.map(async (postId) => {
            try {
              return await appwriteService.getPost(postId);
            } catch {
              return null;
            }
          }),
        );

        setPosts(likedPosts.filter((post) => post && post.$id));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadLikedPosts();
  }, [userData]);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-pink-100 text-center">
        <div className="w-12 h-12 mx-auto border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-gray-600 font-medium">
          Loading liked posts...
        </p>
      </div>
    </div>
  );
}

  return (
  <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 py-12">
    <Container>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">

        <div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-orange-100 text-[#DD2A7B] font-semibold text-sm">
            <Heart className="w-4 h-4 fill-current" />
            Your Collection
          </div>

          <h1 className="mt-5 text-5xl font-black text-gray-900">
            Liked Posts
          </h1>

          <p className="mt-3 text-gray-500 max-w-xl">
            Articles you've liked are saved here for quick access.
          </p>

        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg px-8 py-5 text-center">

          <p className="text-sm text-gray-500">
            Saved Articles
          </p>

          <h2 className="text-5xl font-black bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
            {posts.length}
          </h2>

        </div>

      </div>

      {posts.length > 0 ? (

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

          {posts.map((post) => (

            <div
              key={post.$id}
              className="
                group
                rounded-[30px]
                overflow-hidden
                bg-white
                border
                border-pink-100
                shadow-sm
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              <PostCard {...post} />
            </div>

          ))}

        </div>

      ) : (

        <div className="bg-white rounded-[35px] border border-pink-100 shadow-lg py-20 text-center">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center shadow-lg">

            <Heart className="w-10 h-10 text-white" />

          </div>

          <h2 className="mt-8 text-3xl font-bold text-gray-900">
            No liked posts yet
          </h2>

          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            Discover amazing stories on Scriptora and tap the ❤️ button to
            save your favorite articles here.
          </p>

          <Link
            to="/all-posts"
            className="
              inline-flex
              mt-8
              px-8
              py-4
              rounded-full
              bg-gradient-to-r
              from-[#F58529]
              via-[#DD2A7B]
              to-[#8134AF]
              text-white
              font-semibold
              shadow-xl
              hover:scale-105
              transition-all
            "
          >
            Explore Posts
          </Link>

        </div>

      )}

    </Container>
  </div>
);
}

export default LikedPosts;
