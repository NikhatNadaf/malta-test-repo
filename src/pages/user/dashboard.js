"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import FavoriteEventComponent from "@/components/cui/favorite-trip";
import BookingTableComponent from "@/components/cui/bookings-table";
import { useAuthState } from "@/context/ueAuthContext";
import UserWrapper from "./_app";
import {
  getPastUpcomingBookings,
  useBookings,
} from "@/features/dashboard/getPastUpcomingBookings.js";
import { getServices } from "@/features/getServices";
import { getUserLikes } from "@/features/getUserLikes";
import { Calendar, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ icon: Icon, label, value, href }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current > value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Link href={href || "#"}>
      <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer group">
        <div className="flex items-start gap-6">
          <div className="bg-red-50 p-4 rounded-lg group-hover:bg-red-100 transition-colors">
            <Icon className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
            <h3 className="text-3xl font-bold text-gray-900">{count}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ViewAllButton = ({ href }) => (
  <Link href={href}>
    <Button
      variant="outline"
      className="ml-auto flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
    >
      View All <ArrowRight className="h-4 w-4" />
    </Button>
  </Link>
);

const Dashboard = () => {
  const { user } = useAuthState();
  const [userLikeServices, setUserLikeServices] = useState([]);
  const [likes, setLikes] = useState();
  const {
    data: bookingData,
    isLoading: loading,
    error,
  } = useBookings(user?.id);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch likes and services data
  useEffect(() => {
    const fetchLikesAndServices = async () => {
      setIsLoading(true);
      try {
        if (user?.id) {
          const [fetchedServices, likesData] = await Promise.all([
            getServices(),
            getUserLikes(user.id),
          ]);

          setLikes(likesData);

          if (likesData?.length > 0 && fetchedServices) {
            const userLikes = fetchedServices.filter((service) =>
              likesData.some((like) => like.service_id === service.id)
            );
            setUserLikeServices(userLikes);
          }
        }
      } catch (error) {
        console.error("Error fetching likes and services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchLikesAndServices();
    }
  }, [user?.id]);

  // if (loading)
  //   return (
  //     <UserWrapper>
  //       <div className="space-y-2 px-32 min-h-screen">
  //         <Skeleton className="h-6 w-full" />
  //         <Skeleton className="h-6 w-[90%]" />
  //         <Skeleton className="h-6 w-[70%]" />
  //       </div>
  //     </UserWrapper>
  //   );

  return (
    <UserWrapper>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your bookings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <StatCard
            icon={Calendar}
            label="Total Bookings"
            value={
              (bookingData?.pastBookings?.length || 0) +
              (bookingData?.upcomingBookings?.length || 0) +
              (bookingData?.cancelledBookings?.length || 0)
            }
          />
          <StatCard
            icon={Clock}
            label="Upcoming Bookings"
            value={bookingData?.upcomingBookings.length ?? 0}
            href="/user/upcoming-bookings"
          />
          <StatCard
            icon={CheckCircle}
            label="Past Bookings"
            value={bookingData?.pastBookings.length ?? 0}
            href="/user/past-bookings"
          />
        </div>

        {/* Bookings Tables Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
              <ViewAllButton href="/user/upcoming-bookings" />
            </div>
            <BookingTableComponent
              data={bookingData?.upcomingBookings.slice(0, 5)}
              className="border rounded-lg overflow-hidden"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Past Bookings</h2>
              <ViewAllButton href="/user/past-bookings" />
            </div>
            <BookingTableComponent
              data={bookingData?.pastBookings.slice(0, 5)}
              className="border border-collapse rounded-lg overflow-hidden"
            />
          </div>
        </div>

        {/* Favorite Trips Section */}
        {userLikeServices?.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Favorite Trips</h2>
              <ViewAllButton href="/user/favorite-trip" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userLikeServices?.slice(0, 4).map((item, index) => (
                <FavoriteEventComponent key={index} data={item} likes={likes} />
              ))}
            </div>
          </div>
        )}
      </div>
    </UserWrapper>
  );
};

export default Dashboard;
