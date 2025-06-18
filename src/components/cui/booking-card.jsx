import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useAuthState } from "@/context/ueAuthContext";
import { useServicesState } from "@/context/servicesContext";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/supabaseConfig";
import { getBookingByServiceId } from "@/features/getBookingDetailsByServiceId";
import { useRouter } from "next/router";

function BookingCardComponent({ data, className, likes, bookingId }) {
  const router = useRouter();
  const { user } = useAuthState();
  const { likeService, unlikeService } = useServicesState();
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    setIsLiked(likes?.some((like) => like.service_id === data?.id));
  }, [likes, data?.id]);

  const handleLikesbutton = async () => {
    try {
      if (isLiked) {
        await unlikeService(data, user.id);
        setIsLiked(false);
      } else {
        await likeService(data, user.id);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error handling like/unlike:", error);
    }
  };

  const handleViewDetails = () => {
    router.push(`/booking-details?booking_id=${bookingId}`);
  };

  if (!data) return null;

  return (
    <Card className={className}>
      <div className="relative">
        <Image
          width={500}
          height={500}
          className=" rounded-t-xl h-64 object-cover w-[350px]"
          src={"/adventure.jpg"}
          alt={data?.title}
          loading="lazy"
        />
        <div className="absolute z-10 top-4 right-4 cursor-pointer transition-transform duration-200 transform hover:scale-110">
          <Button
            variant="outline"
            className={cn("rounded-full w-10 h-10 p-0")}
            onClick={handleLikesbutton}
          >
            <Heart className={cn(isLiked && "fill-primary text-primary")} />
          </Button>
        </div>
      </div>
      <div className="flex flex-col my-4 gap-2 px-6">
        <div className="flex justify-between font-semibold text-sm gap-8">
          <div className="relative group">
            <p className="text-lg font-bold line-clamp-1">{data?.name}</p>
            <span className="absolute top-full left-0 z-10 hidden w-max max-w-xs p-2 bg-white shadow-lg rounded-md group-hover:block">
              {data?.name}
            </span>
          </div>
          <p className="text-lg font-semibold">${data?.price}</p>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className="font-medium text-base">{data?.start_date}</p>
          </div>
          <div
            className="hover:cursor-pointer hover:underline"
            onClick={handleViewDetails}
          >
            View Details
          </div>
        </div>
      </div>
    </Card>
  );
}

export default BookingCardComponent;
