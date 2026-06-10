import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../Components";
import appwriteService from "../appwrite/config";

function Following() {
  const userData = useSelector((state) => state.auth.userData);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) return;

    const loadFollowing = async () => {
      try {
        const response = await appwriteService.getFollowing(userData.$id);
        setFollowing(response?.documents ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadFollowing();
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
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">Following</h1>

        {following.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {following.map((item) => (
              <div
                key={item.$id}
                className="bg-white rounded-2xl p-5 shadow-md"
              >
                <h3 className="font-bold">Following ID</h3>
                <p className="text-gray-500 break-words">{item.followingId}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold mb-3">Not following anyone yet</h2>
            <p className="text-gray-500">Follow users to see them on this page.</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Following;
