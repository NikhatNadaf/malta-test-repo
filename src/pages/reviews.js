"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useCustomForm from "@/hooks/use-custom-form";
import FileUpload from "@/components/ui/filepond";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addWebReview } from "@/features/reviews/addWebReviews";
import { useAuthState } from "@/context/ueAuthContext";
import { reviewsSchema } from "@/lib/schema";
import { getWebReviews } from "@/features/reviews/getWebReviews";
import { useServicesState } from "@/context/servicesContext";
import CPagination from "@/components/ui/CPagniation";
import { useRouter } from "next/router";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
const SIZE = 4;

const reviews = () => {
  const router = useRouter();
  const { query } = router;
  const { user } = useAuthState();
  const { services } = useServicesState();
  const {
    FormWrapper,
    FormInput,
    formState: { isSubmitting },
    reset,
  } = useCustomForm({
    schema: reviewsSchema,
  });
  const [userRating, setUserRating] = useState(0);
  // const [currentPage, setCurrentPage] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
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

  const currentPage =
    isNaN(parseInt(query.page, 10)) || parseInt(query.page, 10) < 0
      ? 0
      : parseInt(query.page, 10);

  const chunkedData = chunkArray(allReviews, SIZE);

  useEffect(() => {
    if (currentPage >= chunkedData.length) {
      handlePageChange(chunkedData.length - 1);
    }
  }, [currentPage, chunkedData.length]);

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page.toString() },
    });
  };

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const newReview = {
        rating: userRating,
        description: data?.reviews,
        user_id: user?.id,
        location: "Malta",
      };
      await addWebReview(newReview);
      reset();
      fetchReviews();
      setUserRating(0);
    } catch (error) {
      console.error("An unexpected error occurred:", error.message || error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: "Please check the form for errors and try again.",
    });
    console.error(errors);
  };

  const totalReviews = allReviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].reduce((acc, star) => {
    acc[star] = allReviews.filter((review) => review.rating === star).length;
    return acc;
  }, {});

  const averageRating =
    totalReviews > 0
      ? (
          allReviews.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews
        ).toFixed(1)
      : 0;
  return (
    <div className=" px-8 md:px-32 my-16">
      {" "}
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        Reviews & Testimonials
      </h1>
      <br />
      <br />
      <div className="min-h-screen max-w-6xl mx-auto px-0 sm:px-0 lg:px-0 py-8 sm:py-0">
        {/* <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Reviews & Testimonials</h1> */}

        {/* Rating Overview */}
        <div className="bg-white rounded-2xl border-2 p-6 mb-12 w-full md:w-[70%]">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Left side - Overall rating */}
            <div className="md:w-[240px] p-4">
              <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
              <div className="text-6xl font-bold mb-2">{averageRating}</div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? "fill-red-500 text-red-500"
                        : "fill-gray-300 text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">Out of 5 stars</p>
            </div>

            {/* Right side - Rating bars */}
            <div className="flex-1 space-y-4">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingCounts[stars] || 0;
                const percentage =
                  totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                return (
                  <div key={stars} className="flex items-center gap-4">
                    <span className="w-16 text-sm text-gray-600">
                      {stars} star
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                    <span className="w-8 text-sm text-gray-600 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-12 md:space-y-8">
          {allReviews.map((review, idx) => (
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Card key={idx} className="rounded-2xl w-full md:w-[70%]">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                    {/* Content container - 70% width on desktop */}
                    <div className="w-full md:w-[70%]">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarImage
                              src={review?.user?.avatar}
                              alt={review?.user?.name}
                            />
                            <AvatarFallback>
                              {review?.users.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">
                              {review?.users.name}
                            </h3>
                            <h3 className="text-sm font-md">
                              {review.location}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600">
                        {review.description}
                      </p>
                    </div>

                    {/* Image container - 30% width on desktop */}
                    <div className="w-full md:w-[30%] md:h-[200px]">
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= review.rating
                                ? "fill-red-500 text-red-500"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {review?.created_at}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-1">
                <div className="text-base text-ellipsis font-semibold">
                  Luxury Yacht Charters
                </div>
                <Image
                  width={500}
                  height={500}
                  className=" rounded-xl h-60 object-cover w-[300px]"
                  src={"/adventure.jpg"}
                  alt={"title"}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
          <CPagination
            className="mx-auto"
            size={SIZE}
            data={chunkedData.map((_, idx) => idx)}
          />
        </div>

        {/* Write Review Section */}
        {/* <div className="w-full md:w-1/2 mt-16">
          <h2 className="text-3xl font-bold mb-8">Write a review</h2>
          <Card>
            <CardContent className="p-6">
              <FormWrapper
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
                onError={onError}
              >
                <div className="space-y-6">
                  <div>
                    <p className="mb-2 text-gray-700">Your rating</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setUserRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= userRating
                                ? "fill-red-500 text-red-500"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <FormInput
                      id="reviews"
                      title="Write your review"
                      placeholder="Write your review here..."
                      required
                      className={"h-24"}
                    />
                  </div>
                  <div className="flex gap-8">
                    <Button className="w-32 py-9">
                      {isLoading ? "Submitting..." : "Submit"}
                    </Button>{" "}
                    <FileUpload />
                  </div>
                </div>
              </FormWrapper>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default reviews;
