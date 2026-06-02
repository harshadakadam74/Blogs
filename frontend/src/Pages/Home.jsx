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
  <div className="bg-gray-50 min-h-screen">
    
    {/* Hero Section */}
    <section className="bg-gradient-to-r from-emerald-600 to-green-500 text-white">
      <Container>
        <div className="py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-black">
            Share Your Story
          </h1>

          <p className="mt-5 text-lg max-w-2xl mx-auto text-green-50">
            Discover blogs, tutorials, experiences and ideas from creators
            around the world.
          </p>

          <button className="mt-8 px-8 py-3 bg-white text-emerald-700 font-bold rounded-full shadow-lg hover:scale-105 transition">
            Start Reading
          </button>
        </div>
      </Container>
    </section>

    {/* Stats */}
    <section className="py-10">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-emerald-600">
              {posts.length}
            </h2>
            <p className="text-gray-500">Posts</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-blue-600">100+</h2>
            <p className="text-gray-500">Readers</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-orange-600">20+</h2>
            <p className="text-gray-500">Writers</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-pink-600">24/7</h2>
            <p className="text-gray-500">Community</p>
          </div>
        </div>
      </Container>
    </section>

    {/* Featured Section */}
    <section className="pb-8">
      <Container>
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
            Featured
          </span>

          <h2 className="text-3xl font-bold mt-4">
            Explore Trending Stories
          </h2>

          <p className="text-gray-600 mt-3">
            Read the latest blogs shared by our community members.
          </p>
        </div>
      </Container>
    </section>

    {/* Posts */}
    <section className="pb-16">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            Latest Posts
          </h2>

          <span className="text-emerald-600 font-semibold">
            {posts.length} Articles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </section>

  </div>
);
  
};

export default Home;