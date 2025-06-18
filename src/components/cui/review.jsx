import { useEffect, useState } from "react";
import ReviewSection from "./ReviewSection";
import { getWebReviews } from "@/features/reviews/getWebReviews";

const Reviews = ({ heading }) => {
    const [allReviews, setAllReviews] = useState([]);
  
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getWebReviews();
        setAllReviews(fetchedReviews);
      } catch (error) {
        console.log("Failed to fetch reviews.");
      }
    };
  
    useEffect(() => {
      fetchReviews();
    }, []);

  return (
    <ReviewSection
      heading={heading ? heading : "Real Travelers. Real Savings."}
      allReviews={allReviews}
    />
  );
};

export default Reviews;
