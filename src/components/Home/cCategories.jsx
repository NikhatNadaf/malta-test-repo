import React, { useState } from "react";
import CategoryCard from "@/components/cui/CategoryCard";
import { useServiceTypeState } from "@/context/servicesContext";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from "@/components/ui/zoom_carousel";

const CCategories = () => {
  const { serviceType } = useServiceTypeState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  return (
    <div className="px-4 md:px-20 py-12 bg-background">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Explore by Categories
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Discover services based on what you need most.
        </p>
      </div>

      <div className="relative mt-12">
        <Carousel
          opts={{ align: "start" }}
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
            <CarouselContent
              className="flex gap-1 scroll-smooth pe-4"
              style={{ scrollPaddingRight: '1rem' }}
            >
              {serviceType?.map((item, index) => (
                <CarouselItem
                  key={item.id || index}
                  index={index}
                  className="flex-none w-60 sm:w-72"
                >
                  <div className=" duration-300">
                    <CategoryCard data={item} />
                  </div>
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
    </div>


  );
};

export default CCategories;
