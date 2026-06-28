import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from "../Components";
import { FileText, Search } from "lucide-react";
import { Link } from "react-router-dom";

const AllPosts = () => {
  const categories = [
    "All",
    "Technology",
    "Programming",
    "AI",
    "Education",
    "LifeStyle",
  ];
  const postsPerPage = 6;

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  const filteredPosts = posts.filter((post) => {
    const searchValue = searchTerm.toLowerCase().trim();
    const matchesSearch = post.title.toLowerCase().includes(searchValue);

    if (selectedCategory === "All") {
      return matchesSearch;
    }

    const postCategory = post.category || post.categories || "";
    const normalizedCategory =
      typeof postCategory === "string"
        ? postCategory.toLowerCase()
        : Array.isArray(postCategory)
          ? postCategory.map((cat) => String(cat).toLowerCase())
          : [];

    const matchesCategory =
      typeof normalizedCategory === "string"
        ? normalizedCategory === selectedCategory.toLowerCase()
        : normalizedCategory.includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / postsPerPage),
  );
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 px-4">
        <div className="text-center bg-white/70 backdrop-blur-md px-8 py-10 rounded-3xl shadow-lg border border-pink-100">
          {/* Spinner */}
          <div className="relative flex justify-center items-center">
            <div className="w-14 h-14 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>

            {/* inner glow */}
            <div className="absolute w-10 h-10 bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 rounded-full opacity-20 blur-md"></div>
          </div>

          {/* Text */}
          <p className="mt-5 text-sm sm:text-base text-gray-600 font-medium">
            Loading your feed...
          </p>

          {/* subtle hint */}
          <p className="mt-1 text-xs text-gray-400">
            Bringing fresh stories for you...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-5 sm:py-8 bg-gradient-to-br from-pink-50 via-white to-purple-50 text-gray-900">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14 px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="w-full">
              {/* Badge */}
              <span
                className="inline-flex items-center px-4 py-2 rounded-full 
        bg-gradient-to-r from-pink-100 via-purple-100 to-orange-100 
        text-purple-700 font-semibold text-xs sm:text-sm shadow-sm"
              >
                ✨ Scriptora Community
              </span>

              {/* Title */}
              <h1 className="mt-5 text-4xl sm:text-6xl md:text-7xl font-black leading-tight">
                <span className="bg-black text-transparent bg-clip-text">
                  Explore Posts
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Discover inspiring stories, tutorials, ideas, and insights
                shared by creators around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Search + Categories */}
        <div className="mb-10 px-4 sm:px-0">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Label */}
            <div className="text-center">
              <label
                htmlFor="search-posts"
                className="block text-2xl font-bold text-gray-700"
              >
                Search Posts
              </label>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex-1">
                <input
                  id="search-posts"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search inspiring stories..."
                  className="
            w-full px-5 py-4
            rounded-full
            bg-white/70 backdrop-blur-md
            border border-pink-100
            shadow-sm
            outline-none
            transition
            focus:ring-4 focus:ring-pink-100
            focus:border-pink-300
          "
                />
              </div>

              <Button
                type="button"
                onClick={() => {
                  setSearchTerm(searchTerm.trim());
                  setCurrentPage(1);
                }}
                className="
          
         px-6 py-4
          rounded-full
          font-semibold
        "
              >
                <Search />
              </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`
            px-5 py-2 rounded-full text-sm font-medium transition-all
            ${
              selectedCategory === category
                ? "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-md"
                : "bg-white/70 text-gray-700 border border-pink-100 hover:bg-pink-50"
            }
          `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          filteredPosts.length > 0 ? (
            <>
              {/* Feed Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-3 sm:px-0">
                {currentPosts.map((post) => (
                  <div
                    key={post.$id}
                    className="
              transition-all duration-300
              hover:-translate-y-1 hover:scale-[1.01]
            "
                  >
                    <div
                      className="
                bg-white/70 backdrop-blur-md
                rounded-3xl
                shadow-md
                hover:shadow-2xl
                border border-pink-100
                overflow-hidden
                transition-all duration-300
              "
                    >
                      <PostCard
                        $id={post.$id}
                        title={post.title}
                        featuredImage={post.featuredImage}
                        category={post.category || post.categories}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div
                className="
          mt-10
          flex flex-col sm:flex-row
          items-center justify-between gap-4
          rounded-3xl
          bg-white/70 backdrop-blur-md
          border border-pink-100
          px-5 py-4
          shadow-sm
          text-sm text-gray-700
        "
              >
                <div className="font-medium">
                  Page {currentPage} of {totalPages}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="
              px-5 py-2 rounded-full
              border border-pink-200
              bg-white
              hover:bg-pink-50
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="
              px-5 py-2 rounded-full
              bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]
              text-white font-medium
              shadow-md
              hover:scale-105
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center py-20 sm:py-28 px-4 text-center">
              {/* Icon */}
              <div className="relative mb-5">
                <div className="text-6xl sm:text-7xl text-pink-400">
                  <Search />
                </div>

                {/* soft glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-orange-300 opacity-20 blur-2xl rounded-full"></div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800">
                No posts found
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-md">
                We couldn’t find anything matching your search or selected
                category. Try exploring different topics or keywords.
              </p>

              {/* Hint chips */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {["Technology", "AI", "Programming", "Education"].map((tag) => (
                  <span
                    key={tag}
                    className="
          px-4 py-2 text-xs sm:text-sm
          rounded-full
          bg-white/70 backdrop-blur-md
          border border-pink-100
          text-gray-600
        "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center py-20 sm:py-28 px-4 text-center">
            {/* Icon */}
            <div className="relative mb-5">
              <div className="text-6xl sm:text-7xl text-purple-400">
                <FileText />
              </div>

              {/* glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-orange-300 opacity-20 blur-2xl rounded-full"></div>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800">
              No posts yet
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-md">
              Be the first creator to share a story. Inspire the community with
              your thoughts, ideas, or tutorials.
            </p>

            {/* CTA hint */}
            <div className="mt-6">
              <Link
                to={`/add-post`}
                className="
                 px-6 py-3
                 rounded-full
                  font-medium
               "
              >
                <Button>Create First Post</Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllPosts;
