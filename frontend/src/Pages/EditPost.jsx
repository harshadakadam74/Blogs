import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../Components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
      } else {
        navigate("/");
      }
      setLoading(false);
    });
  }, [slug, navigate]);

  /* Loading UI */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="text-center bg-white/70 backdrop-blur-md px-8 py-10 rounded-3xl shadow-lg border border-pink-100">
          <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading post...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8 sm:py-12">

      <Container>

        {/* Header */}
        <div className="text-center mb-10">

          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-md">
              <Pencil />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black bg-black text-transparent bg-clip-text">
            Edit Post
          </h1>

          <p className="text-gray-600 mt-2">
            Update your story and keep it fresh for your audience
          </p>

        </div>

        {/* Form */}
        {post && (
          <div className="relative bg-white/70 backdrop-blur-md border border-pink-100 rounded-3xl shadow-xl p-6 sm:p-10 overflow-hidden">

            {/* glow background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 via-purple-200 to-orange-200 opacity-10 blur-2xl"></div>

            <div className="relative z-10">
              <PostForm post={post} />
            </div>

          </div>
        )}

      </Container>

    </div>
  );
};

export default EditPost;