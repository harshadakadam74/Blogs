import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../Components";
import appwriteService from "../appwrite/config";

function Followers() {
  const userData = useSelector((state) => state.auth.userData);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) return;

    const loadFollowers = async () => {
      try {
        const response = await appwriteService.getFollowers(userData.$id);
        setFollowers(response?.documents ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadFollowers();
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
        <h1 className="text-4xl font-bold mb-8">Followers</h1>

        {followers.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {followers.map((item) => (
              <div
                key={item.$id}
                className="bg-white rounded-2xl p-5 shadow-md"
              >
                <h3 className="font-bold">Follower ID</h3>
                <p className="text-gray-500 break-words">{item.followerId}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold mb-3">No followers yet</h2>
            <p className="text-gray-500">People who follow you will appear here.</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Followers;
