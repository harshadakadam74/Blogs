import React from "react";
import { Container } from "../Components";

function AllComments() {
  return (
    <Container>
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-6">Comments 💬</h1>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-600">
            No comments found.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default AllComments;