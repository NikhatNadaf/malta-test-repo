"use client";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/utils/date";

export default function ReviewsPage({ allReviews }) {
  const totalReviews = allReviews?.length;
  const ratingCounts = [5, 4, 3, 2, 1].reduce((acc, star) => {
    acc[star] = allReviews?.filter((review) => review.rating === star).length;
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
    <div className="max-w-6xl mx-auto px-0 sm:px-0 lg:px-0 py-8 sm:py-0">
      {/* <div className="min-h-screen max-w-6xl mx-auto px-0 sm:px-0 lg:px-0 py-8 sm:py-0"> */}
      {/* <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Reviews & Testimonials</h1> */}

      {/* Rating Overview */}
      <div className="bg-white rounded-2xl border-2 p-6 mb-12">
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
      <div>
        {allReviews?.map((review, idx) => (
          <Card key={idx} className="mb-6 rounded-2xl">
            <CardContent className="p-6 sm:p-8 place-self-center">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {/* Content container - 70% width on desktop */}
                <div className="w-full md:w-[70%]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage
                          src={review?.users?.avatar}
                          alt={review?.users?.name}
                        />
                        <AvatarFallback>
                          {review?.users?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{review?.users?.name}</h3>
                        <h3 className="text-sm font-md">{review?.location}</h3>
                      </div>
                    </div>
                  </div>
                  <p className="flex text-sm sm:text-base text-gray-600">
                    {review?.description}
                  </p>
                </div>

                {/* Image container - 30% width on desktop */}
                <div className="w-full md:w-[30%]">
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
                    {formatDate(review?.created_at)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
                  </Button>
                  <FileUpload />
                </div>
              </div>
            </FormWrapper>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
