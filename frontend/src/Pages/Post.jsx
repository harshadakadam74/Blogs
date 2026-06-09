import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Bookmark,BookmarkCheck } from "lucide-react";

const Post = () => {
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [bookmarked, setBookmarked] =
  useState(false);

  const [bookmarkDoc, setBookmarkDoc] =
  useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

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
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return;

    const status = await appwriteService.deletePost(post.$id);

    if (status) {
      await appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!post) return;

    let isMounted = true;

    const fetchLikes = async () => {
      const likesData = await appwriteService.getPostLikes(post.$id);

      if (!isMounted) return;
      setLikes(likesData?.documents?.length ?? 0);

      if (userData) {
        const userLike = await appwriteService.getUserLike(
          post.$id,
          userData.$id,
        );

        if (!isMounted) return;
        setLiked(userLike?.documents?.length > 0);
      } else {
        setLiked(false);
      }
    };

    fetchLikes();
    return () => {
      isMounted = false;
    };
  }, [post, userData]);

  const handleLike = async () => {
  if (!userData) return;

  if (!liked) {
    await appwriteService.addLike(
      post.$id,
      userData.$id
    );

    setLiked(true);
    setLikes((prev) => prev + 1);

  } else {
    const userLike =
      await appwriteService.getUserLike(
        post.$id,
        userData.$id
      );

    if (userLike.documents && userLike.documents.length > 0) {
      await appwriteService.removeLike(
        userLike.documents[0].$id
      );
    }

    setLiked(false);
    setLikes((prev) => prev - 1);
  }
};

  useEffect(() => {
    if (!post) return;

    let isMounted = true;

    const fetchComments = async () => {
      const data = await appwriteService.getComments(post.$id);
      if (!isMounted) return;

      if (data) {
        setComments(data.documents);
      }
    };

    fetchComments();
    return () => {
      isMounted = false;
    };
  }, [post]);

  const handleComment = async () => {
  if (!comment.trim()) return;

  const newComment =
    await appwriteService.addComment({
      postId: post.$id,
      userId: userData.$id,
      authorName: userData.name,
      comment,
    });

  if (newComment) {
    setComments((prev) => [
      ...prev,
      newComment,
    ]);

    setComment("");
  }
};


 useEffect(() => {
  const loadBookmark = async () => {
    if (post && userData) {
      await checkBookmark();
    }
  };

  loadBookmark();
}, [post, userData]);

const checkBookmark = async () => {
  if (!post || !userData) return;

  try {
    const res = await appwriteService.getUserBookmark(
      post.$id,
      userData.$id
    );

    if (res.documents.length > 0) {
      setBookmarked(true);
      setBookmarkDoc(res.documents[0].$id);
    } else {
      setBookmarked(false);
      setBookmarkDoc(null);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleBookmark = async () => {
  if (!userData) return;

  if (bookmarked) {
    await appwriteService.removeBookmark(
      bookmarkDoc
    );

    setBookmarked(false);
    setBookmarkDoc(null);

  } else {
    const doc =
      await appwriteService.addBookmark(
        post.$id,
        userData.$id
      );

    setBookmarked(true);
    setBookmarkDoc(doc.$id);
  }
};

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-100 py-6 md:py-10">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Cover Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <img
              src={
                post.featuredImage
                  ? appwriteService
                      .getFilePreview(post.featuredImage)
                      .toString()
                  : "/placeholder.jpg"
              }
              alt={post.title}
              loading="lazy"
              className="
              w-full
              h-64
              sm:h-80
              md:h-125
              object-cover
              rounded-3xl
              shadow-2xl
              transition-all
              duration-700
              hover:scale-105
              hover:shadow-emerald-200
              "
            />

            <div className="absolute inset-0 bg-black/20"></div>

 <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
    <button
      onClick={handleLike}
      className="rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill={liked ? "red" : "white"}
        stroke={liked ? "red" : "#555"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-md hover:scale-110 transition"
      >
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
    </button>
    
     {/* Bookmark Button */}
  <button
    onClick={handleBookmark}
    className="
      bg-white
      p-2
      rounded-full
      shadow-md
      hover:scale-110
      transition
    "
  >
    {bookmarked ? (
      <BookmarkCheck
        size={22}
        className="text-emerald-600"
      />
    ) : (
      <Bookmark
        size={22}
        className="text-gray-700"
      />
    )}
  </button>
  </div>

            {/* Edit/Delete Buttons */}
            {isAuthor && (
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2">
                    Edit
                  </Button>
                </Link>

                <Button
                  onClick={deletePost}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2"
                >
                  Delete
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

            {/* Comment Section */}
            <div className="mt-10 border-t pt-8">
              <h2 className="text-2xl font-bold mb-4">
                Comments ({comments.length})
              </h2>

              <div className="flex flex-col gap-3">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows="3"
                />

                <button
                  onClick={handleComment}
                  className="self-start bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition"
                >
                  Add Comment
                </button>
              </div>

              <div className="mt-6 space-y-4">
               {comments.map((item) => (
  <div
    key={item.$id}
    className="bg-gray-50 border border-gray-200 rounded-xl p-4"
  >
    <div className="flex justify-between">
      <h4 className="font-semibold text-gray-800">
        {item.authorName}
      </h4>

      <span className="text-xs text-gray-500">
        {new Date(
          item.createdAt
        ).toLocaleDateString()}
      </span>
    </div>

    <p className="text-gray-600 mt-2">
      {item.comment}
    </p>
  </div>
))}
              </div>
            </div>

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
                <h3 className="font-semibold text-gray-800">Author</h3>

                <p className="text-sm text-gray-500">Published on Scriptora</p>
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
