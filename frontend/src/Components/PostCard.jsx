import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage, category, featured }) => {
  const normalizedCategory =
    typeof category === "string"
      ? category
      : Array.isArray(category)
      ? category.join(", ")
      : "";

  return (
    <Link to={`/post/${$id}`} aria-label={`Read post: ${title}`}>
      <div
        className="
          relative
          bg-white/80 backdrop-blur-md
          rounded-3xl
          overflow-hidden
          shadow-md
          border border-pink-100
          hover:shadow-2xl
          hover:-translate-y-1
          transition-all duration-300
          group
        "
      >
        {/* Featured badge */}
        {featured && (
          <span
            className="
              absolute top-3 left-3 z-10
              bg-pink-700
              text-white text-xs font-bold
              px-3 py-1 rounded-full
              shadow-md
            "
          >
            ⭐ Featured
          </span>
        )}

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={
              featuredImage
                ? appwriteService.getFilePreview(featuredImage).toString()
                : "/placeholder.jpg"
            }
            alt={title}
            loading="lazy"
            className="
              w-full h-56 object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
            onError={(e) => {
              e.target.src = "/placeholder.jpg";
            }}
          />

          {/* Soft overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          {normalizedCategory && (
            <div className="mb-3">
              <span
                className="
                  inline-flex items-center
                  bg-gradient-to-r from-pink-100 to-purple-100
                  text-purple-700
                  text-xs font-semibold
                  px-3 py-1 rounded-full
                "
              >
                {normalizedCategory}
              </span>
            </div>
          )}

          {/* Title */}
          <h2
            className="
              text-lg sm:text-xl font-bold
              text-gray-800
              line-clamp-2
              group-hover:text-pink-600
              transition-colors duration-200
            "
          >
            {title}
          </h2>

          {/* CTA hint */}
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
            Tap to read more <span className="text-pink-500">→</span>
          </p>
        </div>

        {/* subtle shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
      </div>
    </Link>
  );
};

export default PostCard;