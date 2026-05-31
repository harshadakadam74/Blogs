import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../Components";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-5 sm:py-8">
      <Container>
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-10 px-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-emerald-700">
            All Blog Posts
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Explore stories shared by our community
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="
                  transition-all
                  duration-300
                  hover:-translate-y-2
                "
              >
                <PostCard
                  $id={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-16 sm:py-24">
            <h2 className="text-lg sm:text-xl text-gray-500">
              No posts available
            </h2>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllPosts;