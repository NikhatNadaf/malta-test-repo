import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from "@/components/ui/zoom_carousel";
import { ServiceCard } from "@/components/cui/ServiceCard";
import { supabase } from "@/supabaseConfig";
import { useAuthState } from "@/context/ueAuthContext";
import Link from "next/link";
import Events from "@/components/Home/events";

const TopPicks = ({ heading, services, isLoading }) => {
  const sServices = services?.slice(0, 5);
  const { user } = useAuthState();
  const [likes, setLikes] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const { data: likes, error } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", user?.id);
      if (!error) setLikes(likes);
    };
    if (user?.id) fetchLikes();
  }, [user]);

  if (!sServices || sServices.length === 0) return null;

  return (
    <div className="px-4 md:px-20 py-12">
      {/* Heading & Description */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-20 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <Skeleton className="h-8 w-full max-w-lg" />
            <Skeleton className="h-8 w-3/4 max-w-md" />
          </div>
        ) : (

      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-800">
      {heading}
      </h2>
        )}

        {isLoading ? (
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <Skeleton className="h-6 w-full max-w-md" />
            <Skeleton className="h-6 w-2/3 max-w-sm" />
          </div>
        ) : (
   
      <h4 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-800">
      </h4>
        )}
      </div>

      {/* Carousel */}
      <div className="relative mt-10 max-w-7xl mx-auto">
        <Carousel
          opts={{ align: "center" }}
          setApi={(api) => {
            if (!api) return;
            setScrollSnaps(api.scrollSnapList());
            setCurrentIndex(api.selectedScrollSnap());

            api.on("select", () => {
              setCurrentIndex(api.selectedScrollSnap());
            });
          }}
        >
          <div className="overflow-hidden">
            <CarouselContent className="flex gap-2 lg:gap-2  scroll-smooth">
              {sServices.map((item, index) => (
                <CarouselItem
                  key={item.id || index}
                  index={index}
                  className="
                    flex-none
                    w-[85%]
                    sm:w-1/2
                    md:w-1/3
                    lg:w-1/4
                    xl:w-1/4
                  "
                >
                  <ServiceCard
                    data={item}
                    index={index}
                    loading={isLoading}
                    likes={likes}
                    id={item?.id}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

          <CarouselPrevious
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 ml-2 md:ml-4"
            disabled={currentIndex === 0}
          />
          <CarouselNext
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 mr-2 md:mr-4"
            disabled={currentIndex >= scrollSnaps.length - 1}
          />
        </Carousel>
      </div>

      {/* Events Section */}
      <div className="mt-16">
        <Events />
      </div>
    </div>
  );
};

export default TopPicks;
