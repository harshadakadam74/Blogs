import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../Components";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
        <Container>
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 text-center max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold text-emerald-700 mb-4">
              Welcome to Scriptora
            </h1>

            <p className="text-gray-600 text-sm sm:text-base">
              Login to read, create, and share amazing blog posts with the community.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-6 sm:py-10">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-emerald-700">
            Latest Blog Posts
          </h1>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Discover stories, ideas, and insights from our community.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transition-all duration-300 hover:-translate-y-2"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;