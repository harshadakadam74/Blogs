import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {



  return (
    <Link to={`/post/${$id}`}>
      <div
        className="
          bg-white
          rounded-2xl
          overflow-hidden
          shadow-md
          hover:shadow-xl
          hover:-translate-y-2
          transition-all
          duration-300
          border
          border-gray-100
        "
      >
        {/* Image */}
      <div className="relative overflow-hidden">
  <img
    src={
      featuredImage
        ? appwriteService.getFilePreview(featuredImage).toString()
        : "/placeholder.jpg"
    }
    alt={title}
    className="
      w-full
      h-56
      object-cover
      hover:scale-110
      transition-transform
      duration-500
    "
    onError={(e) => {
      e.target.src = "/placeholder.jpg";
    }}
  />

  
</div>

        {/* Content */}
        <div className="p-5">
          <h2
            className="
              text-xl
              font-bold
              text-gray-800
              line-clamp-2
            "
          >
            {title}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Read this article →
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;