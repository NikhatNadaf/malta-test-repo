import React, { useState, useEffect } from "react";
import { useAuthState } from "@/context/ueAuthContext";
import { useServicesState } from "@/context/servicesContext";
import { ServiceCard } from "@/components/cui/ServiceCard";

function FavoriteTripComponent({ data, className, likes }) {
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

  if (!data) return null;

  return (
    <ServiceCard 
      data={data} 
      index={0} 
      loading={false} 
      likes={likes} 
      className={className}
    />
  );
}

export default FavoriteTripComponent;
