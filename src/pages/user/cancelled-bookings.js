import React, { useEffect, useState } from "react";
import UserWrapper from "./_app";
import { getPastUpcomingBookings } from "@/features/dashboard/getPastUpcomingBookings.js";
import { useAuthState } from "@/context/ueAuthContext";
import { getServices } from "@/features/getServices";
import { getUserLikes } from "@/features/getUserLikes";
import BookingCardComponentNew from "@/components/cui/booking-card-new";
import Lottie from "lottie-react";
import animationData from "../../../public/empty.json";

const CancelledBookings = () => {
  const { user } = useAuthState();
  const [likes, setLikes] = useState();
  const [cancelledBookings, setCancelledBookings] = useState([]);

  useEffect(() => {
    const fetchedBookings = async () => {
      try {
        if (user) {
          const upcomingServices = await getPastUpcomingBookings(user?.id);
          setCancelledBookings(upcomingServices.cancelledBookings);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchedBookings();
  }, [user, likes]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedServices = await getServices();
      if (fetchedServices && user?.id) {
        const likesData = await getUserLikes(user.id);
        setLikes(likesData);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <UserWrapper>
      <div>
        {" "}
        <h1 className="text-2xl md:text-3xl font-semibold">Cancelled Booking</h1>
        <br />
        {cancelledBookings.length === 0 ? (
          <div className="flex flex-col justify-center items-center my-8 sm:my-12 gap-2 sm:gap-3">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: "300px", height: "300px" }}
              className="sm:w-[250px] sm:h-[250px]"
            />
            <p className="text-lg sm:text-xl font-bold text-gray-500">
              No data found.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 max-md:justify-center">
            {cancelledBookings?.map((item, index) => (
              <BookingCardComponentNew
                key={index}
                data={item?.services}
                likes={likes}
                bookingsData={item?.servicebookings}
              />
            ))}
          </div>
        )}
      </div>
    </UserWrapper>
  );
};

export default CancelledBookings;
