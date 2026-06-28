import React from "react";
import { Container, PostForm } from "../Components";
import { SquarePen } from "lucide-react";

const AddPost = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 py-10 px-4">
      <Container>
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">

            {/* Badge */}
            <span
              className="
                inline-flex items-center gap-2
                px-5 py-2 rounded-full
                bg-gradient-to-r from-pink-100 via-purple-100 to-orange-100
                text-rose-700 font-semibold
                shadow-sm
              "
            >
              <SquarePen size={18} />
              New Post
            </span>

            {/* Title */}
            <h1
              className="
                mt-6
                text-4xl sm:text-5xl lg:text-6xl
                font-black
                bg-pink-700
                text-transparent bg-clip-text
                tracking-tight
              "
            >
              Create Your Story
            </h1>

            {/* Subtitle */}
            <p
              className="
                mt-4
                text-gray-600
                text-base sm:text-lg
                max-w-2xl mx-auto
              "
            >
              Share your ideas, experiences, and insights with the Scriptora community.
            </p>

            {/* Tip */}
            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-pink-100">
                <SquarePen size={18} className="text-pink-500" />
                <p className="text-sm text-gray-600">
                  Write a strong title, add an image, and publish your story.
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div
            className="
              relative
              bg-white/80 backdrop-blur-md
              rounded-3xl
              shadow-xl
              border border-pink-100
              p-6 sm:p-8 lg:p-10
              hover:shadow-2xl
              transition-all duration-300
              overflow-hidden
            "
          >
            {/* soft glow background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 via-purple-200 to-yellow-200 opacity-10 blur-2xl"></div>

            {/* form content */}
            <div className="relative z-10">
              <PostForm />
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default AddPost;