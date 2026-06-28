import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Bookmark, BookmarkCheck } from "lucide-react";

const Post = () => {
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [bookmarked, setBookmarked] = useState(false);

  const [bookmarkDoc, setBookmarkDoc] = useState(null);

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followDoc, setFollowDoc] = useState(null);

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
      await appwriteService.addLike(post.$id, userData.$id);

      setLiked(true);
      setLikes((prev) => prev + 1);
    } else {
      const userLike = await appwriteService.getUserLike(
        post.$id,
        userData.$id,
      );

      if (userLike.documents && userLike.documents.length > 0) {
        await appwriteService.removeLike(userLike.documents[0].$id);
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

    const newComment = await appwriteService.addComment({
      postId: post.$id,
      userId: userData.$id,
      authorName: userData.name,
      comment,
    });

    if (newComment) {
      setComments((prev) => [...prev, newComment]);

      setComment("");
    }
  };

  useEffect(() => {
    if (!userData || !post) return;

    let isMounted = true;

    const checkFollow = async () => {
      try {
        const res = await appwriteService.getFollow(userData.$id, post.userId);

        if (!isMounted) return;

        if (res?.documents?.length > 0) {
          setIsFollowing(true);
          setFollowDoc(res.documents[0].$id);
        } else {
          setIsFollowing(false);
          setFollowDoc(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFollowCounts = async () => {
      try {
        const followersRes = await appwriteService.getFollowers(post.userId);
        const followingRes = await appwriteService.getFollowing(post.userId);

        if (!isMounted) return;

        setFollowers(followersRes?.documents?.length ?? 0);
        setFollowing(followingRes?.documents?.length ?? 0);
      } catch (error) {
        console.log(error);
      }
    };

    checkFollow();
    fetchFollowCounts();

    return () => {
      isMounted = false;
    };
  }, [userData, post]);

  const handleFollow = async () => {
    if (!userData || !post) return;

    if (isFollowing) {
      if (followDoc) {
        await appwriteService.unfollowUser(followDoc);
      }
      setIsFollowing(false);
      setFollowDoc(null);
      setFollowers((prev) => Math.max(prev - 1, 0));
    } else {
      const doc = await appwriteService.followUser(userData.$id, post.userId);

      if (doc) {
        setFollowDoc(doc.$id);
        setIsFollowing(true);
        setFollowers((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    const checkBookmark = async () => {
      if (!post || !userData) return;

      try {
        const res = await appwriteService.getUserBookmark(
          post.$id,
          userData.$id,
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

    const loadBookmark = async () => {
      if (post && userData) {
        await checkBookmark();
      }
    };

    loadBookmark();
  }, [post, userData]);

  const handleBookmark = async () => {
    if (!userData) return;

    if (bookmarked) {
      await appwriteService.removeBookmark(bookmarkDoc);

      setBookmarked(false);
      setBookmarkDoc(null);
    } else {
      const doc = await appwriteService.addBookmark(post.$id, userData.$id);

      setBookmarked(true);
      setBookmarkDoc(doc.$id);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full bg-pink-300/30 blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-orange-300/20 blur-3xl"></div>

        <div
          className="
          relative
          bg-white/80
          backdrop-blur-xl
          border
          border-white/50
          shadow-2xl
          rounded-[32px]
          px-10
          py-12
          text-center
        "
        >
          {/* Instagram Gradient Spinner */}
          <div
            className="
            w-16
            h-16
            rounded-full
            border-[5px]
            border-transparent
            border-t-[#F58529]
            border-r-[#DD2A7B]
            border-b-[#8134AF]
            animate-spin
            mx-auto
          "
          ></div>

          {/* Logo */}
          <div className="mt-6">
            <img
              src="/logo.png"
              alt="Scriptora"
              className="w-14 h-14 mx-auto rounded-2xl shadow-lg"
            />
          </div>

          <h2 className="mt-6 text-2xl font-black bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
            Loading Story...
          </h2>

          <p className="mt-3 text-gray-500">
            Preparing your article for reading.
          </p>

          {/* Loading Dots */}
          <div className="flex justify-center gap-2 mt-6">
            <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce"></span>
            <span
              className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"
              style={{ animationDelay: "0.15s" }}
            ></span>
            <span
              className="w-3 h-3 rounded-full bg-orange-500 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></span>
          </div>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-[#FFF5F8] to-[#FFF1E8]">

  {/* Pink Glow */}
  <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-pink-400/20 blur-[140px]" />

  {/* Orange Glow */}
  <div className="absolute top-20 right-0 w-[450px] h-[450px] rounded-full bg-orange-300/20 blur-[140px]" />

  {/* Purple Glow */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-300/20 blur-[160px]" />

  {/* Light Grid */}
  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      <Container>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Cover Image */}
          <div className="relative overflow-hidden rounded-[36px] shadow-2xl group">
            <img
              src={
                post.featuredImage
                  ? appwriteService
                      .getFilePreview(post.featuredImage)
                      .toString()
                  : "/placeholder.jpg"
              }
              alt={post.title}
              className="
      w-full
      h-[320px]
      md:h-[600px]
      object-cover
      transition-all
      duration-700
      group-hover:scale-105
    "
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Category */}
            <div className="absolute top-6 left-6 z-20">
              <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white text-sm font-semibold">
                📚 {post.category}
              </span>
            </div>

            {/* Like + Bookmark */}
            <div className="absolute top-6 right-6 flex gap-3 z-20">
              <button
                onClick={handleLike}
                className="
        w-12 h-12
        rounded-full
        bg-white/15
        backdrop-blur-xl
        border border-white/20
        flex items-center justify-center
        hover:scale-110
        transition
      "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={liked ? "#ef4444" : "white"}
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </button>

              <button
                onClick={handleBookmark}
                className="
        w-12 h-12
        rounded-full
        bg-white/15
        backdrop-blur-xl
        border border-white/20
        flex items-center justify-center
        hover:scale-110
        transition
      "
              >
                {bookmarked ? (
                  <BookmarkCheck className="text-yellow-300" size={22} />
                ) : (
                  <Bookmark className="text-white" size={22} />
                )}
              </button>
            </div>

            {/* Edit/Delete */}
            {isAuthor && (
              <div className="absolute top-20 right-6 flex gap-3 z-20">
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="px-5 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition">
                    ✏️ Edit
                  </button>
                </Link>

                <button
                  onClick={deletePost}
                  className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  🗑 Delete
                </button>
              </div>
            )}

            {/* Bottom Info */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  {(post.authorName || "S").charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="text-white text-xl font-bold">
                    {post.authorName || "Scriptora"}
                  </h3>

                  <p className="text-white/80 text-sm">
                    Published on{" "}
                    {new Date(post.$createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="hidden md:flex gap-3">
                <div className="bg-white/15 backdrop-blur-xl rounded-full px-5 py-3 text-white text-sm">
                  ❤️ {post.likesCount || 0}
                </div>

                <div className="bg-white/15 backdrop-blur-xl rounded-full px-5 py-3 text-white text-sm">
                  🔖 Saved
                </div>

                <div className="bg-white/15 backdrop-blur-xl rounded-full px-5 py-3 text-white text-sm">
                  📖 5 min read
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[32px] bg-white/90 backdrop-blur-xl border border-pink-100 shadow-2xl p-6 sm:p-10 lg:p-14">
            {/* Content */}
            <div
              className="
    prose
    prose-base
    lg:prose-lg
    xl:prose-xl
    max-w-none

    prose-headings:font-black
    prose-headings:text-gray-900
    prose-headings:scroll-mt-24

    prose-p:text-gray-700
    prose-p:leading-8

    prose-a:text-[#DD2A7B]
    prose-a:font-semibold
    prose-a:no-underline
    hover:prose-a:text-[#8134AF]

    prose-strong:text-gray-900

    prose-blockquote:border-l-4
    prose-blockquote:border-[#DD2A7B]
    prose-blockquote:bg-pink-50
    prose-blockquote:rounded-r-xl
    prose-blockquote:px-6
    prose-blockquote:py-3
    prose-blockquote:italic

    prose-code:bg-gray-100
    prose-code:px-2
    prose-code:py-1
    prose-code:rounded-md
    prose-code:text-pink-600
    prose-code:before:content-none
    prose-code:after:content-none

    prose-pre:bg-gray-900
    prose-pre:text-gray-100
    prose-pre:rounded-2xl
    prose-pre:shadow-lg

    prose-ul:marker:text-[#DD2A7B]
    prose-ol:marker:text-[#DD2A7B]

    prose-img:rounded-3xl
    prose-img:shadow-xl
    prose-img:border
    prose-img:border-gray-100

    prose-hr:border-pink-100
  "
            >
              {parse(post.content)}
            </div>

            {/* Comments Section */}
            <div className="mt-16 border-t border-pink-100 pt-12">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-gray-900">
                    💬 Discussion
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {comments.length}{" "}
                    {comments.length === 1 ? "Comment" : "Comments"}
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-[#DD2A7B] font-semibold">
                  ❤️ Community
                </div>
              </div>

              {/* Comment Box */}
              <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-[30px] border border-pink-100 shadow-lg p-6">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {(userData?.name || "S").charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      placeholder="Share your thoughts..."
                      className="
            w-full
            rounded-2xl
            border
            border-pink-100
            bg-white
            p-4
            resize-none
            outline-none
            focus:ring-2
            focus:ring-pink-500
          "
                    />

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleComment}
                        className="
              px-8
              py-3
              rounded-full
              bg-gradient-to-r
              from-[#F58529]
              via-[#DD2A7B]
              to-[#8134AF]
              text-white
              font-semibold
              shadow-lg
              hover:scale-105
              transition-all
            "
                      >
                        Post Comment 🚀
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6 mt-10">
                {comments.length > 0 ? (
                  comments.map((item) => (
                    <div
                      key={item.$id}
                      className="
            bg-white
            rounded-[28px]
            border
            border-gray-100
            shadow-md
            hover:shadow-xl
            transition-all
            p-6
          "
                    >
                      <div className="flex gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {item.authorName?.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-gray-900">
                                {item.authorName}
                              </h4>

                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </p>
                            </div>

                            <button className="text-gray-400 hover:text-red-500 transition text-xl">
                              ❤️
                            </button>
                          </div>

                          <p className="mt-4 text-gray-700 leading-7">
                            {item.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-[30px] border border-pink-100 shadow-md py-16 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-4xl text-white">
                      💬
                    </div>

                    <h3 className="mt-6 text-2xl font-bold">No comments yet</h3>

                    <p className="mt-3 text-gray-500">
                      Be the first to share your thoughts.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {/* Category */}
              <span
                className="
      px-4 py-2
      rounded-full
      bg-gradient-to-r
      from-[#F58529]
      via-[#DD2A7B]
      to-[#8134AF]
      text-white
      text-sm
      font-semibold
      shadow-md
    "
              >
                📚 {post.category || "Blog"}
              </span>

              {/* Date */}
              <span
                className="
      px-4 py-2
      rounded-full
      bg-white
      border
      border-gray-200
      text-gray-600
      text-sm
      font-medium
      shadow-sm
    "
              >
                📅{" "}
                {new Date(post.$createdAt || Date.now()).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </span>

              {/* Read Time */}
              <span
                className="
      px-4 py-2
      rounded-full
      bg-white
      border
      border-gray-200
      text-gray-600
      text-sm
      font-medium
      shadow-sm
    "
              >
                ⏱️ 5 min read
              </span>

              {/* Featured Badge */}
              {post.featured && (
                <span
                  className="
        px-4 py-2
        rounded-full
        bg-yellow-100
        text-yellow-700
        text-sm
        font-semibold
      "
                >
                  ⭐ Featured
                </span>
              )}
            </div>
            {/* Title */}
            <div className="mb-8">
              <span className="uppercase tracking-[0.3em] text-xs font-bold text-[#DD2A7B]">
                SCRIPTORA STORY
              </span>

              <h1
                className="
      mt-3
      text-4xl
      md:text-5xl
      lg:text-6xl
      font-extrabold
      leading-tight
      bg-gradient-to-r
      from-gray-900
      via-gray-800
      to-gray-600
      bg-clip-text
      text-transparent
    "
              >
                {post.title}
              </h1>

              <div className="flex items-center gap-3 mt-6">
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]" />
                <div className="w-2 h-2 rounded-full bg-[#DD2A7B]" />
              </div>
            </div>

            {/* Author Card */}
            <div
              className="
    mb-8
    rounded-3xl
    bg-white
    border
    border-gray-100
    shadow-lg
    p-5
    flex
    flex-col
    md:flex-row
    md:items-center
    md:justify-between
    gap-6
  "
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  {post.author?.avatar ? (
                    <img
                      src={appwriteService
                        .getAvatarPreview(post.author.avatar)
                        .toString()}
                      alt={post.authorName}
                      className="
            w-16
            h-16
            rounded-full
            object-cover
            ring-4
            ring-pink-100
          "
                    />
                  ) : (
                    <div
                      className="
            w-16
            h-16
            rounded-full
            bg-gradient-to-r
            from-[#F58529]
            via-[#DD2A7B]
            to-[#8134AF]
            flex
            items-center
            justify-center
            text-white
            text-2xl
            font-bold
            ring-4
            ring-pink-100
          "
                    >
                      {post.authorName?.charAt(0).toUpperCase() || "S"}
                    </div>
                  )}

                  {/* Verified */}
                  <div
                    className="
          absolute
          -bottom-1
          -right-1
          w-6
          h-6
          rounded-full
          bg-blue-500
          border-2
          border-white
          flex
          items-center
          justify-center
          text-white
          text-xs
        "
                  >
                    ✓
                  </div>
                </div>

                {/* Author Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {post.authorName || "Scriptora"}
                    </h3>

                    <span className="text-blue-500 text-sm">✔</span>
                  </div>

                  <p className="text-gray-500">
                    Content Creator • Published on Scriptora
                  </p>
                </div>
              </div>

              {/* Right */}
              {userData && post.userId !== userData.$id && (
                <button
                  onClick={handleFollow}
                  className={`
        px-7
        py-3
        rounded-full
        font-semibold
        transition-all
        ${
          isFollowing
            ? "bg-gray-200 text-gray-700"
            : "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:scale-105 shadow-lg"
        }
      `}
                >
                  {isFollowing ? "Following ✓" : "+ Follow"}
                </button>
              )}
            </div>

            {/* Social Stats */}
            <div className="flex flex-wrap gap-4 mb-8">
              {/* Followers */}
              <div
                className="
      flex items-center gap-3
      px-5 py-3
      rounded-2xl
      bg-white
      border border-pink-100
      shadow-sm
    "
              >
                <div
                  className="
        w-11 h-11
        rounded-full
        bg-gradient-to-r
        from-[#F58529]
        via-[#DD2A7B]
        to-[#8134AF]
        flex items-center
        justify-center
        text-white
      "
                >
                  👥
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Followers
                  </p>

                  <h3 className="text-lg font-bold text-gray-900">
                    {followers}
                  </h3>
                </div>
              </div>

              {/* Following */}
              <div
                className="
      flex items-center gap-3
      px-5 py-3
      rounded-2xl
      bg-white
      border border-pink-100
      shadow-sm
    "
              >
                <div
                  className="
        w-11 h-11
        rounded-full
        bg-gradient-to-r
        from-[#F58529]
        via-[#DD2A7B]
        to-[#8134AF]
        flex items-center
        justify-center
        text-white
      "
                >
                  ❤️
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Following
                  </p>

                  <h3 className="text-lg font-bold text-gray-900">
                    {following}
                  </h3>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div
              className="
    relative
    rounded-[32px]
    bg-white
    border
    border-gray-100
    shadow-xl
    p-6
    sm:p-8
    md:p-12
    lg:p-16
    overflow-hidden
  "
            >
              {/* Decorative Glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40"></div>

              {/* Reading Progress Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]" />

              <div
                className="
      relative
      z-10

      prose
      prose-lg
      lg:prose-xl
      max-w-none

      prose-headings:font-black
      prose-headings:text-gray-900
      prose-headings:tracking-tight

      prose-p:text-gray-700
      prose-p:leading-9
      prose-p:text-[18px]

      prose-a:text-[#DD2A7B]
      prose-a:no-underline
      hover:prose-a:underline

      prose-strong:text-gray-900
      prose-code:text-pink-600
      prose-code:bg-pink-50
      prose-code:px-1
      prose-code:rounded

      prose-blockquote:border-l-4
      prose-blockquote:border-[#DD2A7B]
      prose-blockquote:bg-pink-50
      prose-blockquote:px-6
      prose-blockquote:py-3
      prose-blockquote:rounded-r-xl

      prose-img:rounded-3xl
      prose-img:shadow-xl

      prose-ul:marker:text-[#DD2A7B]
      prose-ol:marker:text-[#DD2A7B]
    "
              >
                {parse(post.content)}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Post;
