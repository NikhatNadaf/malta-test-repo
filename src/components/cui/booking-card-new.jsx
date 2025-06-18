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

function BookingCardComponentNew({ data, className, likes, bookingsData }) {
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
    router.push(`/booking-details?booking_id=${bookingsData?.id}`);
  };

  if (!data) return null;

  return (
    <Card className={`${className} flex flex-col gap-4`}>
      <div className="relative flex-shrink-0">
        <Image
          width={500}
          height={500}
          className="rounded-xl h-64 object-cover w-[350px]"
          src={"/adventure.jpg"}
          alt={data?.services?.title}
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
      <div className="flex flex-col justify-between flex-grow my-4 px-6 gap-4">
        <div className="flex justify-between items-center font-semibold text-sm gap-8">
          <p className="text-lg font-bold line-clamp-1">{data?.name}</p>
          <div className="text-lg font-semibold">${data?.price}</div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
            Start Date
          </div>
          <div>
            <p className="font-medium text-base">{bookingsData?.start_date}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
            End Date
          </div>
          <div>
            <p className="font-medium text-base">{bookingsData?.end_date}</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleViewDetails}>
          View Details
        </Button>
      </div>
    </Card>
  );
}

export default BookingCardComponentNew;
