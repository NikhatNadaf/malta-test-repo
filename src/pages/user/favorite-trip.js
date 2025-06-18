import React, { useState, useEffect } from "react";
import UserWrapper from "./_app";
import { useServicesState } from "@/context/servicesContext";
import { useAuthState } from "@/context/ueAuthContext";
import FavoriteEventComponent from "@/components/cui/favorite-trip";
import { getServices } from "@/features/getServices";
import { getUserLikes } from "@/features/getUserLikes";
import Lottie from "lottie-react";
import animationData from "../../../public/empty.json";

const FavoriteTrip = () => {
  const { user } = useAuthState();
  const [userLikeServices, setUserLikeServices] = useState([]);
  const [likes, setLikes] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedServices = await getServices();
      if (fetchedServices && user?.id) {
        const likesData = await getUserLikes(user.id);

        if (likesData.length > 0) {
          setLikes(likesData);
          const userLikes = fetchedServices.filter((service) =>
            likesData.some((like) => like.service_id === service.id)
          );
          setUserLikeServices(userLikes);
        } else {
          console.log("No likes data found for the user");
        }
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, likes]);

  return (
<UserWrapper>
  <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
    <h1 className="text-2xl md:text-3xl font-semibold mb-8">Favorite Trips</h1>

    {userLikeServices.length === 0 ? (
      <div className="flex flex-col justify-center items-center py-20 gap-6">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="w-[220px] h-[220px] md:w-[300px] md:h-[300px]"
        />
        <p className="text-lg md:text-xl font-semibold text-gray-500">
          No favorites found.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userLikeServices.map((item, index) => (
          <FavoriteEventComponent key={index} data={item} likes={likes} />
        ))}
      </div>
    )}
  </div>
</UserWrapper>


  );
};

export default FavoriteTrip;
