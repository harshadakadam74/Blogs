import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector(
    (state) => state.auth.userData
  );

  const isAuthor =
    post && userData
      ? post.userId === userData.$id
      : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    const status = await appwriteService.deletePost(
      post.$id
    );

    if (status) {
      await appwriteService.deleteFile(
        post.featuredImage
      );
      navigate("/");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">
            Loading post...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-6 md:py-10">
      <Container>
        <div className="max-w-5xl mx-auto">

          {/* Cover Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <img
              src={appwriteService.getFilePreview(
                post.featuredImage
              )}
              alt={post.title}
              className="
                w-full
                h-64
                sm:h-80
                md:h-[500px]
                object-cover
                hover:scale-105
                transition-transform
                duration-700
              "
            />

            <div className="absolute inset-0 bg-black/20"></div>

            {/* Edit/Delete Buttons */}
            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2">
                    ✏️ Edit
                  </Button>
                </Link>

                <Button
                  onClick={deletePost}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2"
                >
                  🗑 Delete
                </Button>
              </div>
            )}
          </div>

          {/* Article Card */}
          <div
            className="
              bg-white/80
              backdrop-blur-lg
              rounded-3xl
              shadow-xl
              p-5
              sm:p-8
              md:p-12
              -mt-10
              relative
              z-10
              mx-2
              md:mx-6
            "
          >
            {/* Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                Blog Post
              </span>

              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString()}
              </span>
            </div>

            {/* Title */}
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-black
                text-gray-800
                leading-tight
                mb-6
              "
            >
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="
                  w-12 h-12
                  rounded-full
                  bg-green-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                A
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Author
                </h3>

                <p className="text-sm text-gray-500">
                  Published on Scriptora
                </p>
              </div>
            </div>

            {/* Content */}
            <div
              className="
                prose
                prose-sm
                sm:prose
                lg:prose-lg
                max-w-none
                prose-headings:text-gray-800
                prose-p:text-gray-700
                prose-img:rounded-xl
              "
            >
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Post;