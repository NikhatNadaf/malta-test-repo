import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroCarousel({ className }) {
  return (
    <Carousel
      className={`mx-8 md:mx-0 md:w-[600px] md:h-[360px] ${className}`}
    >
      {" "}
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="rounded-3xl">
                <CardContent className="md:h-[360px] flex items-center justify-center p-0">
                  <img
                    src={`https://picsum.photos/600/400?random=${index}`}
                    alt={`Random image ${index + 1}`}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
