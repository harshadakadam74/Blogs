import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../Components";
import { Link } from "react-router-dom";

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
<section className="relative overflow-hidden  bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700 text-white">
  <Container >
    <div className="py-20 md:py-32 text-center relative z-10">

      <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold">
          Welcome to Scriptora
      </span>

      <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight">
        Share Your
        <span className="block text-yellow-300">
          Stories & Ideas
        </span>
      </h1>

      <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-emerald-50">
        Discover blogs, tutorials, experiences, programming tips,
        AI insights and educational content from creators around
        the world.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <button className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-full shadow-xl hover:scale-105 transition">
          Start Reading
        </button>

        <Link to="/all-posts" className="px-8 py-4 border-2 border-white rounded-full font-bold hover:bg-white hover:text-emerald-700 transition">
          Explore Posts
        </Link>
      </div>

      
    </div>
  </Container>

  {/* Background Blur Circles */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

  <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
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
            Explore Trending Posts
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