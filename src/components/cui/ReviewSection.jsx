"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const ReviewSection = ({ heading, allReviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % allReviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + allReviews.length) % allReviews.length
    );
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-8 md:mx-auto">
        {/* Title and Navigation */}
        <div className="mb-12 md:mb-20 space-y-8 md:space-y-0 ">
          <h2 className="text-5xl text-center font-bold">{heading}</h2>
         
        </div>

        {/* Reviews Grid */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {allReviews.map((review, index) => (
              <CarouselItem key={review?.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="bg-white p-8 rounded-2xl shadow-md">
                    <CardContent className="flex flex-col items-center p-6">
                      {/* Star Rating */}
                      <div className="flex items-start gap-2 mb-4">
                        <span className="text-4xl text-gray-300 font-serif">"</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                star <= review?.rating
                                  ? "fill-red-500 text-red-500"
                                  : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Description */}
                      <p className="text-gray-700 mb-6">{review?.description}</p>

                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={review?.users?.avatar}
                            alt={review?.users?.name || "User Avatar"}
                          />
                          <AvatarFallback>
                            {review?.users?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{review?.users?.name}</h3>
                          <p className="text-sm text-gray-500">{review?.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Navigation */}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Read More Button */}
        <div className="text-center mt-8">
          <Button
            variant="default"
            className=" hover:bg-red-600 text-white "

          >
            <Link href={"/reviews"}>Read More Reviews</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;



