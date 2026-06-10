import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../Components";
import appwriteService from "../appwrite/config";

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
      <Container>
        <div className="py-20 text-center">Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8">My Posts</h1>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                category={post.category}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold mb-3">No posts yet</h2>
            <p className="text-gray-500">Write your first blog post to populate this page.</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default MyPosts;
