import React from "react";
import { Container } from "../Components";

function AllLikes() {
  return (
    <Container>
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-6">Liked Posts ❤️</h1>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-600">
            No liked posts found.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default AllLikes;