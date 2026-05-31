import React from "react";
import { Container, PostForm } from "../Components";

const AddPost = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-6 sm:py-10">
      <Container>
        <div className="max-w-7xl mx-auto">
          
          {/* Page Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Create New Post
            </h1>
            <p className="text-gray-500 mt-2">
              Share your story with the world
            </p>
          </div>

          {/* Post Form */}
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8">
            <PostForm />
          </div>

        </div>
      </Container>
    </div>
  );
};

export default AddPost;