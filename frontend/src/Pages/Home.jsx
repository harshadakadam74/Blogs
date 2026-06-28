import { useEffect, useRef, useState } from "react";
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from "../Components";
import { Link } from "react-router-dom";
import {
  FileText,
  Users,
  PenSquare,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  const scrollRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  useEffect(() => {
    appwriteService.getFeaturedPosts().then((posts) => {
      if (posts) {
        setFeaturedPosts(posts.documents);
      }
    });
  }, []);

  useEffect(() => {
    if (!scrollRef.current || featuredPosts.length === 0) return;

    const container = scrollRef.current;
    const firstCard = container.children[0];

    if (!firstCard) return;

    const gap = 24;
    const cardWidth = firstCard.getBoundingClientRect().width + gap;

    const autoSlide = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      }
    }, 4000);
    return () => clearInterval(autoSlide);
  }, [featuredPosts]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const firstCard = scrollRef.current.children[0];

    if (!firstCard) return;

    const gap = 24;
    const cardWidth = firstCard.getBoundingClientRect().width + gap;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-24 px-4">
        <Container>
          <div className="flex justify-center">
            <div
              className="bg-white/90 backdrop-blur-md border border-gray-100 
          rounded-3xl shadow-md p-8 sm:p-12 text-center 
          max-w-xl w-full relative overflow-hidden"
            >
              {/* Glow effects */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-300/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300/20 blur-3xl rounded-full" />

              {/* Content */}
              <div className="relative z-10">
                <h1
                  className="text-3xl sm:text-4xl font-bold mb-4 
              bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]
              bg-clip-text text-transparent"
                >
                  Welcome to Scriptora
                </h1>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                  Login to read, create, and share amazing blog posts with the
                  community.
                </p>

                {/* Instagram-style button */}
                <Link to={`/signup`}>
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-24">
        {/* Instagram Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-orange-400/20 blur-3xl"></div>

        <Container>
          <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.9fr] gap-8 items-center">
            {/* Left */}
            <div>
              <span
                className="
            inline-flex items-center gap-2
            px-4 py-2
            rounded-full
            bg-gradient-to-r
            from-pink-100
            via-purple-100
            to-orange-100
            text-[#DD2A7B]
            font-semibold
            text-sm
          "
              >
                ✨ Scriptora Community
              </span>

              <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight text-gray-900">
                Tell Stories
                <span className="block bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
                  That Inspire.
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Join thousands of creators sharing blogs, AI tutorials,
                programming guides, experiences and educational content.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/all-posts">
                  <button
                    className="
                px-8 py-4
                rounded-full
                bg-gradient-to-r
                from-[#F58529]
                via-[#DD2A7B]
                to-[#8134AF]
                text-white
                font-semibold
                shadow-xl
                hover:scale-105
                transition
              "
                  >
                    Explore Posts
                  </button>
                </Link>

                <Link to="/add-post">
                  <button
                    className="
                px-8 py-4
                rounded-full
                bg-white
                border
                border-gray-200
                shadow-md
                hover:bg-gray-50
                transition
              "
                  >
                    Write Story
                  </button>
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="relative hidden lg:flex justify-center">
              {/* Main Card */}
              <div
                className="
            w-[340px]
            rounded-[35px]
            bg-white
            shadow-2xl
            border
            border-gray-100
            overflow-hidden
          "
              >
                <img
                  src="https://images.openai.com/static-rsc-4/iqTOPmChKils-B126fVr4m_Q-qpUvOo3gYemvTd_hlci2WEYMWeduBX8NNlQaVhcprBN5FWYkDwraD700-UlgeCGGu6H9uVQP4eVAfNJRcB7S24HGuiL_O9xHCi84q_ISnMJwj61aq4FZOh3ZNaoo88k5t-j2j4thRUo4djWMi2JI2t1wG3S0UnQL-P2vHYQ?purpose=fullsize"
                  alt="Blog"
                  className="h-72 w-full aspect-[4/5] object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white font-bold">
                      {"Scriptora".charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-bold">Scriptora</h3>
                      <p className="text-sm text-gray-500">
                        Inspiring developers
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600">
                    "Share your knowledge with the world."
                  </p>
                </div>
              </div>

              {/* Floating Cards */}

              <div
                className="
            absolute
            -left-8
            top-16
            bg-white
            rounded-2xl
            shadow-lg
            px-5
            py-4
          "
              >
                ❤️ 12K Likes
              </div>

              <div
                className="
            absolute
            -right-0
            bottom-12
            bg-white
            rounded-2xl
            shadow-lg
            px-5
            py-4
          "
              >
                🚀 500+ Creators
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-b from-white to-pink-50">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Posts */}
            <div
              className="
          group
          bg-white/80
          backdrop-blur-md
          rounded-3xl
          border border-pink-100
          shadow-md
          hover:shadow-xl
          hover:-translate-y-2
          transition-all
          duration-300
          p-6
          text-center
        "
            >
              <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500 text-white mb-4">
                <FileText size={26} />
              </div>

              <h2 className="text-4xl font-black text-gray-900">
                {posts.length}
              </h2>

              <p className="text-gray-500 mt-1">Published Posts</p>
            </div>

            {/* Readers */}
            <div
              className="
          group
          bg-white/80
          backdrop-blur-md
          rounded-3xl
          border border-pink-100
          shadow-md
          hover:shadow-xl
          hover:-translate-y-2
          transition-all
          duration-300
          p-6
          text-center
        "
            >
              <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600 text-white mb-4">
                <Users size={26} />
              </div>

              <h2 className="text-4xl font-black text-gray-900">100+</h2>

              <p className="text-gray-500 mt-1">Active Readers</p>
            </div>

            {/* Writers */}
            <div
              className="
          group
          bg-white/80
          backdrop-blur-md
          rounded-3xl
          border border-pink-100
          shadow-md
          hover:shadow-xl
          hover:-translate-y-2
          transition-all
          duration-300
          p-6
          text-center
        "
            >
              <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white mb-4">
                <PenSquare size={26} />
              </div>

              <h2 className="text-4xl font-black text-gray-900">20+</h2>

              <p className="text-gray-500 mt-1">Content Creators</p>
            </div>

            {/* Community */}
            <div
              className="
          group
          bg-white/80
          backdrop-blur-md
          rounded-3xl
          border border-pink-100
          shadow-md
          hover:shadow-xl
          hover:-translate-y-2
          transition-all
          duration-300
          p-6
          text-center
        "
            >
              <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white mb-4">
                <Globe size={26} />
              </div>

              <h2 className="text-4xl font-black text-gray-900">24/7</h2>

              <p className="text-gray-500 mt-1">Global Community</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Section */}
      <section className="py-12">
        <Container>
          <div
            className="
        relative
        overflow-hidden
        rounded-[32px]
        bg-gradient-to-r
        from-[#F58529]
        via-[#DD2A7B]
        to-[#8134AF]
        p-8
        md:p-12
        text-white
        shadow-2xl
      "
          >
            {/* Background Glow */}
            <div className="absolute -top-16 -left-16 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-300/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sm font-semibold">
                  <Sparkles size={16} />
                  Featured Collection
                </div>

                <h2 className="mt-6 text-4xl md:text-5xl font-black leading-tight">
                  Discover
                  <span className="block text-yellow-300">
                    Trending Stories
                  </span>
                </h2>

                <p className="mt-5 text-white/90 text-lg leading-relaxed">
                  Explore the most popular blogs, programming tutorials, AI
                  insights, educational articles, and inspiring stories shared
                  by the Scriptora community.
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col items-center gap-5">
                <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-3xl px-8 py-6 text-center">
                  <h3 className="text-5xl font-black">
                    {featuredPosts.length}
                  </h3>

                  <p className="text-white/80 mt-2">Featured Posts</p>
                </div>

                <Link to="/all-posts">
                  <button
                    className="
              flex items-center gap-2
              bg-white
              text-[#DD2A7B]
              px-6 py-3
              rounded-full
              font-semibold
              hover:scale-105
              transition-all
            "
                  >
                    Explore Now
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {featuredPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-pink-50 via-white to-pink-50">
          <Container>
            {/* Header */}
            <div className="text-center mb-10">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-orange-100 text-[#DD2A7B] font-semibold">
                ⭐ Featured Stories
              </span>

              <h2 className="mt-5 text-5xl font-black">
                Discover Amazing Stories
              </h2>

              <p className="mt-3 text-gray-500">
                Tap a story to explore featured articles.
              </p>
            </div>

            {/* Story Avatars */}
            <div className="flex overflow-x-auto gap-6 justify-center pb-8 custom-scrollbar">
              {featuredPosts.map((post, index) => (
                <button
                  key={post.$id}
                  onClick={() => setActiveStory(index)}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  <div
                    className={`p-1 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]
            ${activeStory === index ? "scale-110" : ""}`}
                  >
                    <div className="bg-white p-1 rounded-full">
                      <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <span className="mt-2 text-sm font-medium w-20 truncate">
                    {post.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Story */}
            <div
              className="
      max-w-5xl
      mx-auto
      rounded-[35px]
      overflow-hidden
      bg-white
      shadow-2xl
      grid
      lg:grid-cols-2
      "
            >
              <img
                src={appwriteService.getFilePreview(
                  featuredPosts[activeStory].featuredImage,
                )}
                className="h-full w-full object-cover"
              />

              <div className="p-10 flex flex-col justify-center">
                <span className="text-pink-500 font-semibold">
                  FEATURED ARTICLE
                </span>

                <h3 className="text-4xl font-black mt-3">
                  {featuredPosts[activeStory].title}
                </h3>

                <p className="text-gray-500 mt-5">
                  {featuredPosts[activeStory].excerpt ||
                    "Discover one of the most inspiring articles from our community."}
                </p>

                <Link
                  to={`/post/${featuredPosts[activeStory].$id}`}
                  className="
          mt-8
          w-fit
          px-8
          py-3
          rounded-full
          bg-gradient-to-r
          from-[#F58529]
          via-[#DD2A7B]
          to-[#8134AF]
          text-white
          font-semibold
          "
                >
                  Read Story →
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Latest Posts */}
      <section className="py-20 bg-gradient-to-b from-white via-pink-50/30 to-white">
        <Container>
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-orange-100 text-[#DD2A7B] text-sm font-semibold">
                Latest Collection
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900">
                Fresh Stories
              </h2>

              <p className="mt-3 text-gray-500 max-w-xl">
                Programming, AI, Education and inspiring articles published by
                our creators.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <h3 className="text-4xl font-black text-[#DD2A7B]">
                  {posts.length}
                </h3>
                <p className="text-gray-500 text-sm">Articles</p>
              </div>
            </div>
          </div>
          {/* Grid */}

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="
            group
            rounded-[28px]
            bg-white
            border
            border-pink-100
            overflow-hidden
            shadow-sm
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

          {/* CTA */}

          <div className="flex justify-center mt-16">
            <Link
              to="/all-posts"
              className="
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
              Explore All Posts →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
