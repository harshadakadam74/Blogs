import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../Components";
import { FileText, Search } from "lucide-react";

const AllPosts = () => {
  const categories = ["All", "Technology", "Programming", "AI", "Education"];
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
    const normalizedCategory = typeof postCategory === "string"
      ? postCategory.toLowerCase()
      : Array.isArray(postCategory)
        ? postCategory.map((cat) => String(cat).toLowerCase())
        : [];

    const matchesCategory = typeof normalizedCategory === "string"
      ? normalizedCategory === selectedCategory.toLowerCase()
      : normalizedCategory.includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-green-50 to-emerald-100 px-4">
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
    <div className="min-h-screen py-5 sm:py-8 bg-linear-to-br from-green-50 via-white to-emerald-100 text-gray-900">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-block px-3 sm:px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs sm:text-sm">
                 Scriptora Community
              </span>

              <h1 className="mt-3 text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
                Explore All Posts
              </h1>

              <p className="mt-3 text-sm sm:text-base max-w-2xl mx-auto">
                Discover inspiring stories, tutorials, ideas, and insights shared
                by creators from around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Search + Categories */}
        <div className="mb-8 px-4 sm:px-0">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="text-center">
              <label className="block text-2xl font-semibold text-gray-600 mb-2" htmlFor="search-posts">
                Search Posts
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                <input
                  id="search-posts"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search posts by title..."
                  className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-gray-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm(searchTerm.trim());
                  setCurrentPage(1);
                }}
                className="w-full sm:w-auto rounded-3xl bg-emerald-600 px-6 py-4 text-white font-semibold shadow-sm hover:bg-emerald-700 transition"
              >
                <Search />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => {
        setSelectedCategory(category);
        setCurrentPage(1);
      }}
      className={`
        px-5 py-2 rounded-full font-medium transition
        ${
          selectedCategory === category
            ? "bg-emerald-600 text-white"
            : "bg-white"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
                {currentPosts.map((post) => (
                  <div
                    key={post.$id}
                    className="transition-all duration-300 sm:hover:-translate-y-2 sm:hover:scale-[1.02]"
                  >
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl overflow-hidden">
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

              <div className="mt-8 flex flex-col gap-3 items-center justify-between rounded-3xl border border-slate-200 bg-white/80 px-4 py-4 text-sm text-slate-700 shadow-sm sm:flex-row">
                <div>
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center py-16 sm:py-24 px-4 text-center">
              <div className="text-5xl sm:text-7xl mb-4"><Search /></div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
                No posts match your search or category filter
              </h2>

              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Try a different keyword, clear the search box, or choose another category.
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center py-16 sm:py-24 px-4 text-center">
            <div className="text-5xl sm:text-7xl mb-4"><FileText /></div>

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