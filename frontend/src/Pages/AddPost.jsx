import React from "react";
import { Container, PostForm } from "../Components";

const AddPost = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 py-10 px-4">
      <Container>
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
              ✍️ New Blog
            </span>

            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-gray-800">
              Create New Post
            </h1>

            <p className="mt-3 text-gray-600 text-base sm:text-lg">
              Share your ideas, experiences, and stories with readers around the world.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 p-6 sm:p-8 lg:p-10">
            <PostForm />
          </div>

        </div>
      </Container>
    </div>
  );
};

export default AddPost;