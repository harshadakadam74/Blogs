import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../Components";
import appwriteService from "../appwrite/config";
import { Bookmark } from "lucide-react";

function Bookmarks() {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      setLoading(false);
      return;
    }

    const loadBookmarks = async () => {
      try {
        const bookmarks = await appwriteService.getUserBookmarks(userData.$id);

        const bookmarkedPosts = await Promise.all(
          (bookmarks?.documents ?? []).map(async (bookmark) => {
            try {
              return await appwriteService.getPost(bookmark.postId);
            } catch {
              return null;
            }
          })
        );

        setPosts(bookmarkedPosts.filter((post) => post && post.$id));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, [userData]);

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="text-center bg-white/70 backdrop-blur-md px-8 py-10 rounded-3xl shadow-lg border border-pink-100">
          <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading saved posts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-10 px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-orange-100 text-purple-700 font-semibold text-sm shadow-sm">
            <Bookmark size={16} /> Saved
          </span>

          <h1 className="mt-4 text-4xl sm:text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-transparent bg-clip-text">
            Bookmarks
          </h1>

          <p className="mt-2 text-gray-600">
            Your saved stories appear here
          </p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                category={post.category}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative mb-4">
              <Bookmark className="w-14 h-14 text-pink-400" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-orange-300 opacity-20 blur-2xl rounded-full"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No saved posts yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
              Tap the bookmark icon on posts you like. They’ll show up here.
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Bookmarks;