import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../Components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <h1 className="text-xl sm:text-2xl font-semibold text-emerald-700">
          Loading Post...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-6 sm:py-10">
      <Container>
        {/* Page Heading */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-emerald-700">
            Edit Blog Post
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Update your article and publish changes
          </p>
        </div>

        {/* Form */}
        {post && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <PostForm post={post} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default EditPost;