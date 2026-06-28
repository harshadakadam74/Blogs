import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../Components";
import appwriteService from "../appwrite/config";
import { FileText, Star } from "lucide-react";
import { Link } from "react-router-dom";

function MyPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!userData) return;

    const loadPosts = async () => {
      try {
        const response = await appwriteService.getPostsByUser(
          userData.$id,
        );

        setPosts(response?.documents ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [userData]);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-pink-100 text-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <p className="mt-4 text-gray-600 font-medium">
          Loading your posts...
        </p>
      </div>
    </div>
  );
}

  const handleToggleFeatured = async (postId, featured) => {
    try {
      const updated = await appwriteService.toggleFeatured(postId, featured);
      if (updated) {
        setPosts((current) =>
          current.map((post) =>
            post.$id === postId ? { ...post, featured } : post
          )
        );
      }
    } catch (error) {
      console.log("Toggle featured error:", error);
    }
  };

  return (
<div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 py-12">

<Container>

  <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white p-10 mb-14">

<div className="absolute -top-24 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"/>

<h1 className="text-5xl font-black">
My Writing Dashboard
</h1>

<p className="mt-4 text-white/80">
Manage your stories, feature your best work and inspire readers worldwide.
</p>

</div>

  <div className="flex flex-wrap gap-4 mb-10">

    

<Link
to="/add-post"
className="px-6 py-3 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white"
>
+ New Story
</Link>


<Link
to="/all-posts"
className="px-6 py-3 rounded-full bg-white border"
>
Browse Posts
</Link>

</div>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">

  <div className="bg-white rounded-3xl shadow border p-6">
    <p className="text-gray-500">Posts</p>
    <h2 className="text-4xl font-black">{posts.length}</h2>
  </div>

  <div className="bg-white rounded-3xl shadow border p-6">
    <p className="text-gray-500">Featured</p>
    <h2 className="text-4xl font-black text-pink-600">
      {posts.filter(post => post.featured).length}
    </h2>
  </div>

  <div className="bg-white rounded-3xl shadow border p-6">
    <p className="text-gray-500">Drafts</p>
    <h2 className="text-4xl font-black text-orange-500">
      {posts.filter(post => post.status==="draft").length}
    </h2>
  </div>

  <div className="bg-white rounded-3xl shadow border p-6">
    <p className="text-gray-500">Published</p>
    <h2 className="text-4xl font-black text-green-600">
      {posts.filter(post => post.status==="active").length}
    </h2>
  </div>

</div>


<div className="text-center ">

<h2 className="text-4xl font-bold mt-8">
Start Your Writing Journey
</h2>

<p className="mt-4 text-gray-500">
Your first article is just one click away.
</p>

<Link
to="/add-post"
className="inline-flex mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white"
>
Write Your First Story
</Link>

</div>

<div className="absolute top-6 right-6 bg-white rounded-2xl shadow-lg px-6 py-4">

<p className="text-gray-500 text-sm">
Total Stories
</p>

<h2 className="text-3xl font-black">
{posts.length}
</h2>

</div>

{/* Header */}

<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">

<div>

<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-orange-100 text-[#DD2A7B] font-semibold text-sm">

<FileText size={18}/>

My Collection

</div>

<h1 className="mt-5 text-5xl font-black">
My Posts
</h1>

<p className="mt-3 text-gray-500 max-w-xl">
Manage, edit and feature your published stories.
</p>

</div>


<div className="bg-white rounded-3xl border border-gray-100 shadow-lg px-8 py-5 text-center">

<p className="text-sm text-gray-500">
Published Posts
</p>

<h2 className="text-5xl font-black bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
{posts.length}
</h2>

</div>

</div>

{posts.length > 0 ? (

<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

{posts.map((post)=>(

<div
key={post.$id}
className="group bg-white rounded-[30px] overflow-hidden border border-pink-100 shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
>

<div className="relative">

{post.featured && (

<div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-xs font-semibold flex items-center gap-1">

<Star size={14} fill="white"/>

Featured

</div>

)}

<PostCard {...post}/>

</div>

<div className="p-5">

<button
onClick={() =>
handleToggleFeatured(post.$id,!post.featured)
}
className={`w-full py-3 rounded-2xl font-semibold transition-all ${
post.featured
? "bg-red-500 hover:bg-red-600 text-white"
: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:scale-[1.02]"
}`}
>

{post.featured
? "Remove Featured"
: "⭐ Make Featured"}

</button>

</div>

</div>

))}

</div>

):(

<div className="bg-white rounded-[35px] border border-pink-100 shadow-lg py-20 text-center">

<div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center">

<FileText size={38} className="text-white"/>

</div>

<h2 className="mt-8 text-3xl font-bold">
No Posts Yet
</h2>

<p className="mt-3 text-gray-500 max-w-md mx-auto">
Start writing your first story and inspire thousands of readers.
</p>

<Link
to="/add-post"
className="inline-flex mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-semibold shadow-xl hover:scale-105 transition-all"
>

Write Your First Post

</Link>

</div>

)}

</Container>


</div>

);
}

export default MyPosts;
