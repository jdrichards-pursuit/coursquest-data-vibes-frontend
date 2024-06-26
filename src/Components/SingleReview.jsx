import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SingleReview = ({
  review,
  user,
  id,
  reviewToggle,
  setReviewToggle,
}) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/api/users/${review.user_id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUserName(userData.name);
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [API, review.user_id]);

  const handleDeleteReview = () => {
    fetch(`${API}/api/reviews/${review.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setReviewToggle(!reviewToggle);
          console.log("Review deleted successfully");
        } else {
          throw new Error("Failed to delete review");
        }
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

  function navigateEditForm(id, reviewid) {
    navigate(`/courses/${id}/edit/${reviewid}`);
  }

  const isCurrentUserReview = review.user_id === user.id;

  return (
    <div>
      {review && (
        <div className="bg-white border border-blue-950 rounded-lg shadow-md p-2 m-2 ">
          <div className="">
            <p className="text-lg font-bold">{userName}:</p>
            <p className="text-lg ml-2">{"⭐️".repeat(review.rating)}</p>
          </div>
          <div>
            <p className="text-lg">{review.review}</p>
          </div>
          {isCurrentUserReview && (
            <div>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-1 rounded-md w-1/6 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-4 mr-4" onClick={handleDeleteReview}>Delete</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded-md w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4 mr-4" onClick={() => navigateEditForm(id, review.id)}>
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleReview;
