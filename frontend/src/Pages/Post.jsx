import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button } from "../Components/index";
import {
  ArrowUp,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Heart,
  Link2,
  MessageCircle,
  MessageSquare,
  Share2,
  Users,
} from "lucide-react";

const Post = () => {
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkDoc, setBookmarkDoc] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [following] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followDoc, setFollowDoc] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [authorPostCount, setAuthorPostCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [toc, setToc] = useState([]);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const excerpt = (text) => {
    if (!text)
      return "Explore this story with helpful insights, clean prose, and beautiful visuals.";
    const plain = text
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return plain.length > 160 ? `${plain.slice(0, 157)}...` : plain;
  };

  const calculateReadingTime = (text) => {
    if (!text) return "1 min read";
    const words = text
      .replace(/<[^>]+>/g, "")
      .trim()
      .split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService.getPost(slug).then((response) => {
      if (response) {
        setPost(response);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);

  useEffect(() => {
    if (!post) return;

    window.scrollTo({ top: 0, behavior: "instant" });

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

    const fetchComments = async () => {
      const commentData = await appwriteService.getComments(post.$id);
      if (!isMounted) return;
      setComments(commentData?.documents ?? []);
    };

    const fetchRelatedPosts = async () => {
      const postsData = await appwriteService.getPosts();
      if (!isMounted || !postsData?.documents) return;
      const related = postsData.documents
        .filter(
          (item) => item.$id !== post.$id && item.category === post.category,
        )
        .slice(0, 3);
      setRelatedPosts(related);
    };

    const fetchAuthorPostCount = async () => {
      if (!post.userId) return;
      const postsByAuthor = await appwriteService.getPostsByUser(post.userId);
      if (!isMounted) return;
      setAuthorPostCount(postsByAuthor?.documents?.length ?? 0);
    };

    fetchLikes();
    fetchComments();
    fetchRelatedPosts();
    fetchAuthorPostCount();

    return () => {
      isMounted = false;
    };
  }, [post, userData]);

  useEffect(() => {
    if (!post || !contentRef.current) return;
    const headings = Array.from(
      contentRef.current.querySelectorAll("h2, h3, h4"),
    );
    const extracted = headings.map((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "");
      }
      return {
        id: heading.id,
        text: heading.textContent,
        level: Number(heading.tagName.substring(1)),
      };
    });
    setToc(extracted);
  }, [post, comments]);

  useEffect(() => {
    if (!post || !contentRef.current) return;

    const updateProgress = () => {
      const article = contentRef.current;
      const top = article.getBoundingClientRect().top + window.scrollY - 140;
      const height = article.offsetHeight;
      const scroll = window.scrollY - top;
      const percent = Math.round(
        (scroll / (height - window.innerHeight + 220)) * 100,
      );
      setProgress(Math.min(100, Math.max(0, percent)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [post]);

  useEffect(() => {
    if (!post || !userData) return;

    let isMounted = true;

    const checkBookmark = async () => {
      try {
        const res = await appwriteService.getUserBookmark(
          post.$id,
          userData.$id,
        );
        if (!isMounted) return;
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

    checkBookmark();

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
      if (userLike.documents?.length > 0) {
        await appwriteService.removeLike(userLike.documents[0].$id);
      }
      setLiked(false);
      setLikes((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleBookmark = async () => {
    if (!userData) return;
    if (bookmarked) {
      await appwriteService.removeBookmark(bookmarkDoc);
      setBookmarked(false);
      setBookmarkDoc(null);
    } else {
      const bookmark = await appwriteService.addBookmark(
        post.$id,
        userData.$id,
      );
      setBookmarked(true);
      setBookmarkDoc(bookmark.$id);
    }
  };

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

  const handleComment = async () => {
    if (!comment.trim() || !userData) return;
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 100,
      behavior: "smooth",
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full bg-pink-300/30 blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-orange-300/20 blur-3xl"></div>
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[32px] px-10 py-12 text-center">
          <div className="w-16 h-16 rounded-full border-[5px] border-transparent border-t-[#F58529] border-r-[#DD2A7B] border-b-[#8134AF] animate-spin mx-auto"></div>
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
    <div className="relative min-h-screen bg-gradient-to-br from-white via-[#FFF5F8] to-[#FFF1E8] pb-24">
      <div className="fixed inset-x-0 top-0 h-1 z-50 bg-slate-200/60">
        <div
          className="h-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,207,232,0.45),_transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[540px] h-[540px] rounded-full bg-purple-200/40 blur-[160px] pointer-events-none" />
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <section className="relative overflow-hidden rounded-[40px] border border-pink-100 bg-white/95 shadow-2xl py-10 px-6 sm:px-10 md:p-14 mb-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(253,224,220,0.8),_transparent_28%)] opacity-70 pointer-events-none" />
            <div className="relative z-10 space-y-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FCE7F3] via-[#FDE68A] to-[#FED7AA] px-4 py-2 text-sm font-semibold text-pink-700 shadow-sm">
                {post.category || "AI"}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                {post.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                {excerpt(post.content)}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-xl font-bold shadow-lg">
                    {(post.authorName || "S").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {post.authorName || "Scriptora"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(post.$createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    <Heart className="h-4 w-4 text-pink-500" /> {likes} Likes
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />{" "}
                    {calculateReadingTime(post.content)}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    <Users className="h-4 w-4 text-slate-500" />{" "}
                    {post.views
                      ? `${post.views.toLocaleString()} views`
                      : "2.3K views"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={handleLike}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${liked ? "bg-pink-600 text-white shadow-lg" : "bg-white text-slate-800 border border-slate-200 hover:bg-pink-50"}`}
                >
                  <Heart className="h-4 w-4" /> {liked ? "Liked" : "Like"}
                </button>
                <button
                  onClick={handleBookmark}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${bookmarked ? "bg-emerald-500 text-white shadow-lg" : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"}`}
                >
                  {bookmarked ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}{" "}
                  {bookmarked ? "Saved" : "Bookmark"}
                </button>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  <Link2 className="h-4 w-4" />{" "}
                  {copied ? "Link Copied" : "Copy Link"}
                </button>
              </div>
            </div>
          </section>
         <section className="mb-10 overflow-hidden rounded-[36px] shadow-2xl bg-black">
  <img
    src={
      post.featuredImage
        ? appwriteService.getFilePreview(post.featuredImage).toString()
        : "/placeholder.jpg"
    }
    alt={post.title}
    loading="lazy"
    className="w-full max-h-[450px] object-contain"
  />
</section>
          <div className="lg:grid lg:grid-cols-[1.75fr_0.85fr] gap-10">
            <article className="space-y-10">
              <div className="rounded-[32px] bg-white/95 border border-pink-100 shadow-xl p-6 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">
                      Featured article
                    </p>
                    <h2 className="mt-3 text-3xl font-black text-slate-900">
                      Read the story with a modern layout built for comfort.
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-3xl bg-slate-50 p-4 text-center">
                      <p className="text-sm text-slate-500">Words</p>
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {post.content
                          ?.replace(/<[^>]+>/g, "")
                          .split(/\s+/)
                          .filter(Boolean).length ?? 0}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4 text-center">
                      <p className="text-sm text-slate-500">Comments</p>
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {comments.length}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4 text-center">
                      <p className="text-sm text-slate-500">Author</p>
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {post.authorName || "Scriptora"}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4 text-center">
                      <p className="text-sm text-slate-500">Read time</p>
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {calculateReadingTime(post.content)}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  ref={contentRef}
                  className="prose prose-lg prose-slate max-w-none mt-10"
                >
                  {parse(post.content)}
                </div>
              </div>
              <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[32px] bg-white border border-pink-100 shadow-xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">
                        Author
                      </p>
                      <h3 className="mt-3 text-2xl font-black text-slate-900">
                        {post.authorName || "Scriptora Kadam"}
                      </h3>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {(post.authorName || "S").charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <p className="mt-5 text-slate-600 leading-7">
                    A passionate frontend writer who loves sharing clear,
                    actionable tutorials and product design stories.
                  </p>
                  <div className="mt-6 grid gap-3 text-sm text-slate-700">
                    <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                      <span>Posts</span>
                      <strong>{authorPostCount}</strong>
                    </div>
                    <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                      <span>Followers</span>
                      <strong>{followers}</strong>
                    </div>
                    <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                      <span>Following</span>
                      <strong>{following}</strong>
                    </div>
                  </div>
                  {userData && post.userId !== userData.$id && (
                    <button
                      onClick={handleFollow}
                      className={`mt-6 w-full rounded-full px-5 py-3 text-sm font-semibold transition ${isFollowing ? "bg-slate-100 text-slate-900 border border-slate-200" : "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-lg"}`}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
                <div className="rounded-[32px] bg-white border border-pink-100 shadow-xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">
                        Related
                      </p>
                      <h3 className="mt-3 text-2xl font-black text-slate-900">
                        Related posts
                      </h3>
                    </div>
                    <span className="text-sm text-slate-500">
                      Same category
                    </span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map((item) => (
                        <Link
                          key={item.$id}
                          to={`/post/${item.$id}`}
                          className="block rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:border-pink-200 hover:bg-white"
                        >
                          <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">
                            {item.category || "Story"}
                          </p>
                          <h4 className="mt-3 text-lg font-bold text-slate-900">
                            {item.title}
                          </h4>
                          <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                            {excerpt(item.content)}
                          </p>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        No related posts available yet.
                      </p>
                    )}
                  </div>
                </div>
              </section>
              <section className="rounded-[32px] bg-white border border-pink-100 shadow-xl p-6">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">
                      Discussion
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-slate-900">
                      Comments
                    </h3>
                    <p className="text-sm text-slate-500">
                      {comments.length}{" "}
                      {comments.length === 1 ? "Comment" : "Comments"}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700">
                    <MessageCircle className="h-4 w-4" /> Community
                  </div>
                </div>
                <div className="rounded-[28px] bg-slate-50 p-5">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder={
                      userData
                        ? "Write a comment..."
                        : "Login to leave a comment."
                    }
                    disabled={!userData}
                    className="w-full resize-none rounded-3xl border border-slate-200 bg-white p-4 text-slate-800 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
                  />
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                      Share your thoughts and help the community.
                    </p>
                    <Button
                      onClick={handleComment}
                      disabled={!userData || !comment.trim()}
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {comments.length > 0 ? (
                    comments.map((item) => (
                      <div
                        key={item.$id}
                        className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-bold text-lg">
                            {item.authorName?.charAt(0).toUpperCase() || "S"}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <p className="font-semibold text-slate-900">
                                  {item.authorName || "Anonymous"}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {new Date(
                                    item.createdAt,
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                Reply
                              </span>
                            </div>
                            <p className="mt-4 text-slate-700 leading-7">
                              {item.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[28px] border border-dashed border-pink-200 bg-pink-50 p-10 text-center text-slate-600">
                      No comments yet. Be the first to start the conversation.
                    </div>
                  )}
                </div>
              </section>
            </article>
            <aside className="space-y-6">
              <div className="sticky top-28 space-y-5">
                <div className="rounded-[32px] bg-white border border-pink-100 shadow-xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">
                        Share
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-slate-900">
                        Spread the word
                      </h3>
                    </div>
                    <Share2 className="h-6 w-6 text-pink-500" />
                  </div>
                  <div className="mt-5 grid gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-pink-200 hover:bg-white"
                    >
                      <ExternalLink className="h-4 w-4 text-sky-500" /> Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-pink-200 hover:bg-white"
                    >
                      <ExternalLink className="h-4 w-4 text-sky-700" /> LinkedIn
                    </a>
                    <a
                      href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-pink-200 hover:bg-white"
                    >
                      <ExternalLink className="h-4 w-4 text-blue-600" />{" "}
                      Facebook
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + pageUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-pink-200 hover:bg-white"
                    >
                      <MessageSquare className="h-4 w-4 text-emerald-600" />{" "}
                      WhatsApp
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-pink-200 hover:bg-white"
                    >
                      <Link2 className="h-4 w-4 text-slate-700" />{" "}
                      {copied ? "Copied" : "Copy Link"}
                    </button>
                  </div>
                </div>
                <div className="rounded-[32px] bg-white border border-pink-100 shadow-xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">
                        Contents
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-slate-900">
                        On this page
                      </h3>
                    </div>
                    <span className="text-sm text-slate-500">
                      Smooth scroll
                    </span>
                  </div>
                  <div className="mt-5 space-y-2">
                    {toc.length > 0 ? (
                      toc.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`w-full text-left transition rounded-3xl px-4 py-3 text-sm ${item.level === 2 ? "font-semibold text-slate-900" : "text-slate-600"} hover:bg-pink-50`}
                        >
                          {item.text}
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        The table of contents will appear after the article
                        loads.
                      </p>
                    )}
                  </div>
                </div>
                <div className="rounded-[32px] bg-white border border-pink-100 shadow-xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">
                        Sidebar
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-slate-900">
                        Quick tools
                      </h3>
                    </div>
                    <ArrowUp className="h-6 w-6 text-slate-600" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="rounded-3xl bg-slate-50 px-4 py-4 text-sm text-slate-700">
                      <span className="font-semibold">Reading progress:</span>{" "}
                      {Math.max(0, Math.min(progress, 100))}%
                    </div>
                    <div className="rounded-3xl bg-slate-50 px-4 py-4 text-sm text-slate-700">
                      <span className="font-semibold">Bookmark:</span>{" "}
                      {bookmarked ? "Saved" : "Tap to save"}
                    </div>
                    <div className="rounded-3xl bg-slate-50 px-4 py-4 text-sm text-slate-700">
                      <span className="font-semibold">Live views:</span>{" "}
                      {post.views ? post.views.toLocaleString() : "2.3K"}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div className="lg:hidden fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md">
            <button
              onClick={handleLike}
              className="inline-flex items-center justify-center rounded-full bg-pink-500 p-3 text-white shadow-lg"
            >
              <Heart className="h-4 w-4" />
            </button>
            <button
              onClick={handleBookmark}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 p-3 text-white shadow-lg"
            >
              {bookmarked ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center rounded-full bg-slate-100 p-3 text-slate-900"
            >
              <Link2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Post;
