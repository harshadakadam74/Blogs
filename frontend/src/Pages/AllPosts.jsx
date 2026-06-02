import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../Components";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-14 sm:h-14 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
            Loading Posts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-5 sm:py-8">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <span className="inline-block px-3 sm:px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs sm:text-sm">
            📚 Scriptora Community
          </span>

          <h1 className="mt-3 text-3xl sm:text-5xl md:text-6xl font-black text-gray-800 leading-tight">
            Explore All Posts
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover inspiring stories, tutorials, ideas, and insights shared
            by creators from around the world.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="
                  transition-all
                  duration-300
                  sm:hover:-translate-y-2
                  sm:hover:scale-[1.02]
                "
              >
                <div
                  className="
                    bg-white/80
                    backdrop-blur-md
                    rounded-2xl
                    shadow-md
                    hover:shadow-xl
                    overflow-hidden
                  "
                >
                  <PostCard
                    $id={post.$id}
                    title={post.title}
                    featuredImage={post.featuredImage}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-16 sm:py-24 px-4 text-center">
            <div className="text-5xl sm:text-7xl mb-4">📝</div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
              No Posts Available
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Be the first one to publish a post.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllPosts;