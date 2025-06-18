"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import ReviewsPage from "@/components/cui/reviews-page";
import TopPicks from "@/components/Home/topPicks";

import { contactUs, booking } from "@/data/link";

import { useBooking } from "@/context/bookingContext";
import { useAuthState } from "@/context/ueAuthContext";
import { useServicesState } from "@/context/servicesContext";

import { cn } from "@/lib/utils";

import {
    Heart,
    MapPin,
    Share2,
    Star,
    Check,
    Minus,
    Feather,
    CalendarCheck,
    CarFront,
    Languages,
    CalendarClock,
} from "lucide-react";
import { getUserLikes } from "@/features/getUserLikes";
import { useService } from "@/features/getServiceById";
import BookingCard from "@/components/Bookings/booking-card";
import { useServiceReviews } from "@/features/reviews/getServiceReviews";
import { useServicesBySupplier } from "@/features/getServicesBySupplierId";
import useFetchServices from "@/features/getAllServices";
import { useServiceBookingCount } from "@/features/getBookingCount";
import { supabase } from "@/supabaseConfig";
import { getUserFromDatabase } from "@/features/getUser";
import Stepper from "@/components/cui/stepper";
import CancellationSection from "@/components/Bookings/CancellationSection";
import ProductImages from "@/components/ProductImages/ProductImages";

function TourismPage() {
    const router = useRouter();
    const { id } = router.query;
    const { user, setUser, setSession } = useAuthState();
    const { likeService, unlikeService } = useServicesState();
    const [isLiked, setIsLiked] = useState(false);
    const [stepsData, setStepsData] = useState([]);
    const { data: service, isLoading, isError } = useService(id);
    const { data: services, isLoading: isLoadingService } = useFetchServices();
    const { data: count } = useServiceBookingCount(id);

    const { data: supplierServices, isLoading: isLoadingSupplierServices } =
        useServicesBySupplier(service?.supplier_access_id);
    const {
        data: allReviews,
        isLoadingReviews,
        isErrorReviews,
    } = useServiceReviews(id);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user data:", error);
                return;
            }
            const user = await getUserFromDatabase(data?.user.id);
            setUser(user);
            setSession(data);
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (service && user?.id) {
                    const likesData = await getUserLikes(user?.id);

                    if (likesData.length > 0) {
                        const userLikes = likesData.some(
                            (like) => like.service_id === service.id
                        );

                        setIsLiked(userLikes);
                    } else {
                        console.log("No likes data found for the user");
                    }
                }
            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, service]);

    useEffect(() => {
        async function fetchWhatToExpect() {
            const { data, error } = await supabase
                .from("whattoexpects")
                .select("step, heading, description")
                .eq("service_id", id);

            if (error) {
                console.error("Error fetching data:", error);
            } else {
                const sortedData = data.sort((a, b) => a.step - b.step);
                setStepsData(sortedData);
            }
        }

        if (id) {
            fetchWhatToExpect();
        }
    }, [id]);

    const handleLikesbutton = async () => {
        try {
            if (isLiked) {
                await unlikeService(service, user.id);
                setIsLiked(false);
            } else {
                await likeService(service, user.id);
                setIsLiked(true);
            }
        } catch (error) {
            console.error("Error handling like/unlike:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-2 px-32 min-h-screen">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-[90%]" />
                <Skeleton className="h-6 w-[70%]" />
            </div>
        );
    }

    const totalReviews = allReviews?.length;
    // const ratingCounts = [5, 4, 3, 2, 1].reduce((acc, star) => {
    //   acc[star] = allReviews?.filter((review) => review.rating === star).length;
    //   return acc;
    // }, {});

    const averageRating =
        totalReviews > 0
            ? (
                allReviews.reduce((sum, review) => sum + review.rating, 0) /
                totalReviews
            ).toFixed(1)
            : 0;

    const formatKey = (key) => {
        return key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    const serviceDetailsArray = JSON.parse(service?.service_type_details || "{}");

    console.log(serviceDetailsArray)

    return (
        <main className="min-h-screen bg-white">
            <div className="md:pt-2 pt-12 px-4 lg:mx-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-0">
                    {service?.name}{" "}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= Math.round(averageRating)
                                        ? "fill-red-500 text-red-500"
                                        : "fill-gray-300 text-gray-300"
                                        }`}
                                />
                            ))}
                            <span className="ml-2 text-xs text-gray-600">
                                ({allReviews?.length} review)
                            </span>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="text-gray-500 border-thin h-6"
                        />
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="line-clamp-1">{service?.location}</span>
                    </div>
                </div>

                <ProductImages service={service} />

                {service && service?.status === "active" && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">

                        {/* Info badges */}
                        <div className="flex flex-wrap items-center gap-3 text-[12px] text-gray-600">

                            <div className="flex items-center gap-1">
                                <CarFront className="w-[14px] h-[14px] text-primary" />
                                <span>Pickup offered</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <CalendarClock className="w-[14px] h-[14px] text-primary" />
                                <span>Duration 8h</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <Languages className="w-[14px] h-[14px] text-primary" />
                                <span>English</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <CalendarCheck className="w-[14px] h-[14px] text-primary" />
                                <span>{count} Bookings</span>
                            </div>

                        </div>

                        {/* Like + Share Buttons */}
                        <div className="flex gap-2 self-start sm:self-center">
                            <Button
                                variant="outline"
                                className="rounded-full w-8 h-8 p-0 text-primary bg-[#FFE4E5] hover:bg-[#FFE4E5]"
                                onClick={handleLikesbutton}
                            >
                                <Heart className={cn("w-4 h-4", isLiked && "fill-primary text-primary")} />
                            </Button>

                            <button className="rounded-full w-8 h-8 bg-[#FFE4E5] flex items-center justify-center text-[#E5484D]">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                )}


            </div>

            {/* Booking Section */}
            {/* <section className="container mx-auto px-4 py-12"> */}
            <section className="md:pt-2 pt-6 px-4 lg:mx-20">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    <div className="lg:col-span-2">
                        <div>
                            <h2 className="text-3xl font-bold">About  {service?.name}</h2>

                            <div className="flex flex-wrap gap-4 py-4">
                                {service?.features?.map((f, index) => (
                                    <div className="flex p-2 px-4 rounded-full text-sm bg-primary-foreground w-fit gap-2">
                                        <Feather className="text-primary h-4 w-4" />
                                        <p>{f}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="break-words">{service?.description}</p>
                        </div>

                        <Separator className="my-5" />
                        {service?.special_benefits?.length > 0 && (
                            <>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                        Special Benefit
                                    </h2>
                                    <div className="space-y-4">
                                        {service?.special_benefits?.map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <Check className="h-5 w-6 md:w-5 bg-green-500 text-white rounded-full p-1" />
                                                <span className="text-gray-600">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Separator className="my-5" />
                            </>
                        )}
                        {(Object.keys(serviceDetailsArray).length > 0) && (
                            <>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                        Service Details
                                    </h2>

                                    <div className="flex flex-col md:flex-row gap-16">
                                        <table className="min-w-full table-auto border text-sm text-left">
                                            <tbody>
                                                {Object.entries(serviceDetailsArray).map(([key, value], index) => (
                                                    <tr key={index}>
                                                        <td className="border px-4 py-2">{formatKey(key)}</td>
                                                        <td className="border px-4 py-2">
                                                            {Array.isArray(value) ? (
                                                                value.join(", ")
                                                            ) : typeof value === "string" && ["menu_upload", "route_map"].includes(key) ? (
                                                                <a
                                                                    href={value}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 underline"
                                                                    download
                                                                >
                                                                    {key === "menu_upload" ? "View Menu" : "View Route Map"}
                                                                </a>
                                                            ) : ["baby_seat", "gps"].includes(key) ? (
                                                                <span className="text-xl">
                                                                    {value === true ? "✅" : "❌"}
                                                                </span>
                                                            ) : (
                                                                typeof value === "string" ? value.charAt(0).toUpperCase() + value.slice(1) : value
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <Separator className="my-5" />
                            </>
                        )}
                        {(service?.includes?.length > 0 || service?.excludes.length > 0) && (
                            <>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                        What Includes/Exclude
                                    </h2>

                                    <div className="flex flex-col md:flex-row gap-16">
                                        <div className="space-y-4">
                                            {service?.includes.map((item, index) => (
                                                <div className="flex items-center gap-3" key={index}>
                                                    <Check className="h-5 w-5 bg-green-500 text-white rounded-full p-1" />
                                                    <span className="text-gray-600">{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            {service?.excludes.map((item, index) => (
                                                <div className="flex items-center gap-3" key={index}>
                                                    <Minus className="h-5 w-5 bg-red-500 text-white rounded-full p-1" />
                                                    <span className="text-gray-600">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Separator className="my-5" />
                            </>
                        )}
                        {stepsData?.length > 0 && (
                            <>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                        What To Expect
                                    </h2>

                                    <Stepper stepsData={stepsData} />
                                </div>
                                <Separator className="my-5" />
                            </>
                        )}

                        {/* <Separator className="my-10" /> */}
                        {/* Supplier and Company Details */}
                        {/* {service?.supplieraccess && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Supplier Information
                </h2>
                <div className="flex gap-6 items-center mb-2">
                  <Avatar>
                    <AvatarFallback>
                      {service.supplieraccess.name
                        ? service.supplieraccess.name.charAt(0)
                        : "S"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.supplieraccess.name}
                  </h3>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Email:</span>{" "}
                    {service.supplieraccess.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Phone:</span>{" "}
                    {service.supplieraccess.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Total Services List:</span>{" "}
                    {supplierServices ? supplierServices?.length : 0}
                  </p>
                </div>
              </div>
            )} */}
                        {/* <Separator className="my-10" /> */}

                        {/* {service?.supplieraccess?.supplier_company_id && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Company Information
                </h2>
                <div className="flex gap-6 items-center mb-2">
                  <Avatar>
                    <AvatarFallback>
                      {service.supplieraccess.supplier_company_id.name
                        ? service.supplieraccess.supplier_company_id.name.charAt(
                            0
                          )
                        : "S"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.supplieraccess.supplier_company_id.name}
                  </h3>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Address:</span>{" "}
                    {service.supplieraccess.supplier_company_id.address_line_1},{" "}
                    {service.supplieraccess.supplier_company_id.city}{" "}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Country:</span>{" "}
                    {service.supplieraccess.supplier_company_id.country}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Postal Code: </span>{" "}
                    {service.supplieraccess.supplier_company_id.postal_code}
                  </p>
                </div>
              </div>
            )} */}

                        {allReviews?.length > 0 && <ReviewsPage allReviews={allReviews} />}
                    </div>

                    {service && service?.status === "active" && (
                        <BookingCard service={service} isLoading={isLoading} />
                    )}
                </div>
                <div className="lg:w-2/3 mt-5">
                    <CancellationSection productCode="MXP-159112P7" />
                </div>
            </section>

            <div className="md:pt-2 px-4 lg:mx-20">
                <TopPicks
                    heading={
                        <p>
                            Top Picks from{" "}
                            <span className="text-primary">
                                {service?.supplieraccess?.name}
                            </span>
                        </p>
                    }
                    services={supplierServices}
                    isLoading={isLoadingSupplierServices}
                />
                <TopPicks
                    heading={"Top Picks for Your Maltese Adventure"}
                    services={services}
                    isLoading={isLoadingService}
                />
            </div>
        </main>
    );
}

export default TourismPage;
export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: {
      id,
    },
  };
}
function TourismPage({ id }) {
  // no need to use useRouter().query.id
}

