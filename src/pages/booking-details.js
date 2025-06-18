import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DotFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/supabaseConfig";
import { useAuthState } from "@/context/ueAuthContext";
import { getUserFromDatabase } from "@/features/getUser";
import { CancelBookingDialog } from "@/components/cui/cancel-booking-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const BookingDetails = () => {
  const router = useRouter();
  const { booking_id } = router.query;
  const { user, setUser, setSession } = useAuthState();
  const [users, setUsers] = useState([]);
  const [service, setService] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (!booking_id) return;

    const fetchBookingPersons = async () => {
      setLoading(true);

      try {
        const { data: bookingData, error: bookingError } = await supabase
          .from("servicebookings")
          .select(`*,  created_by(*), service_id(*)`)
          .eq("id", booking_id)
          .single();

        if (bookingError) {
          console.error("Error fetching booking details:", bookingError);
          return;
        }

        setBookingDetails(bookingData);
        const { data: bookingPersonData, error: bookingPersonError } =
          await supabase
            .from("servicebookingperson")
            .select("user_id, service_id")
            .eq("booking_id", booking_id);

        if (bookingPersonError) {
          console.log(bookingPersonError);
          return;
        }
        if (bookingPersonData.length > 0) {
          const userIds = bookingPersonData.map((booking) => booking.user_id);

          const serviceId = bookingPersonData[0]?.service_id;
          const [usersRes, servicesRes] = await Promise.all([
            supabase.from("users").select("*").in("id", userIds),
            supabase.from("services").select("*").eq("id", serviceId),
          ]);

          if (usersRes.error || servicesRes.error) {
            console.log(usersRes.error || servicesRes.error);
            return;
          }

          setUsers(usersRes.data);
          setService(servicesRes.data[0]);
          console.log(usersRes.data);
          console.log(servicesRes.data[0]);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (booking_id) {
      fetchBookingPersons();
    }
  }, [booking_id]);

  if (!bookingDetails) return null;

  if (loading) {
    return (
      <div className="space-y-2 px-32 min-h-screen">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-[90%]" />
        <Skeleton className="h-6 w-[70%]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-8">
      {/* Hero Section */}
      <section className="mx-8 lg:mx-32 flex flex-col md:flex-row gap-8">
        {/* Left Content */}
        <div className="md:w-[70%] space-y-8">
          {/* Booking Details */}
          <Card>
            <CardHeader className="text-2xl font-bold text-gray-800 flex justify-between items-center">
              <span>Booking Details</span>

              {bookingDetails?.status === "cancelled" && (
                <span className="text-sm text-red-500 italic">Cancelled</span>
              )}
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Booking ID", value: bookingDetails?.id },
                {
                  label: "Payment Status",
                  value: bookingDetails?.payment_status ? "Success" : "Failed",
                },
                {
                  label: "Location",
                  value: `${bookingDetails?.address_line_1}, ${bookingDetails?.address_line_2}, ${bookingDetails?.city}, ${bookingDetails?.state}, ${bookingDetails?.country}`,
                },
                { label: "Postal Code", value: bookingDetails?.postal_code },
                {
                  label: "Pickup Location",
                  value: bookingDetails?.pickup_location,
                },
                {
                  label: "Payment Intent ID",
                  value: bookingDetails?.payment_intent_id,
                },
                {
                  label: "Booked By",
                  value: bookingDetails?.created_by?.name,
                },
                {
                  label: "Booking Time",
                  value: new Date(bookingDetails?.created_at).toLocaleString(),
                },
              ].map((detail, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-md text-gray-600 font-semibold">
                    {detail.label}
                  </span>
                  <p className="text-lg text-gray-800">{detail.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardContent>
              <h2 className="text-3xl font-bold text-gray-800 text-center">
                {service?.name}
              </h2>
              <p className="text-lg text-gray-500 mt-2 text-center break-words">
                {service?.description}
              </p>
              <p className="text-lg text-gray-500 mt-2 text-center">
                {service?.start_date} to {service?.end_date}
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Location", value: service?.location },
                  { label: "Price", value: `$${service?.price}` },
                  {
                    label: "Duration",
                    value: `${service?.duration} hours`,
                  },
                  {
                    label: "Max Group Size",
                    value: service?.maximum_group_size,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-md text-gray-600 font-semibold">
                      {item.label}
                    </span>
                    <p className="text-lg text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Includes", items: service?.includes },
                  { title: "Excludes", items: service?.excludes },
                ].map((section, index) => (
                  <div key={index} className="flex flex-col">
                    <h3 className="text-md text-gray-600 font-semibold">
                      {section.title}
                    </h3>
                    <ul className="list-disc pl-5 mt-2 text-gray-800">
                      {section.items?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-md text-gray-600 font-semibold">
                  Special Benefits
                </h3>
                <ul className="list-disc pl-5 mt-2 text-gray-800">
                  {service?.special_benefits?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-md text-gray-600 font-semibold">
                  Cancellation Policy
                </h3>
                <p className="text-lg text-gray-800 break-words">
                  {service?.cancellation_policy}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details */}
          <Card>
            <CardHeader className="text-2xl font-bold text-gray-800">
              Customers Details
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {users?.map((user, index) => (
                <Card key={index} className="">
                  <CardContent>
                    <div className="flex gap-4 items-center">
                      <Avatar>
                        <AvatarFallback>
                          {user?.name ? user.name.charAt(0) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {user?.name}
                        </h3>
                        <p className="text-sm text-gray-600 ">{user?.email}</p>
                        <p className="text-sm text-gray-600">
                          {user?.mobile_no || "N/A"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:w-[30%] ">
          {/* Left Sidebar */}
          <Card className="flex-shrink-0 h-fit">
            <div className="relative">
              <Image
                height={500}
                width={400}
                className="rounded-t-xl w-full object-cover"
                src={
                  JSON.parse(service?.images?.[0] ?? "{}")?.url ??
                  `https://picsum.photos/500/400?random=${1}`
                }
                alt="Service Image"
              />
              <div className="backdrop-blur-sm bg-white/80 absolute bottom-4 right-4 rounded-full p-2 px-4 flex items-center text-xs shadow-md">
                <DotFilledIcon
                  height={20}
                  width={20}
                  className="text-red-400"
                />
                <span className="ml-2">{service?.name} & More Info</span>
              </div>
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {service?.name}
              </h2>
              <p className="text-gray-600 mt-4 break-words">
                {service?.description}
              </p>
            </CardContent>
          </Card>

          {/* Cancel Booking Card */}
          <Card className="flex-shrink-0 h-fit mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Cancel Booking
              </h2>
              <p className="text-gray-600 mt-4">
                Are you sure you want to cancel your booking? Please consider
                the following points:
              </p>
              <ul className="mt-4 text-gray-600 list-disc pl-6">
                <li>
                  Once canceled, you may lose your reservation and the
                  availability of the service.
                </li>
                <li>
                  Cancellation fees may apply depending on the service
                  provider's policies.
                </li>
                <li>
                  Ensure you check for any applicable refunds or credits before
                  proceeding.
                </li>
                <li>
                  If you cancel, you might not be able to rebook at the same
                  time slot.
                </li>
                <li>
                  Cancellation may affect any special offers or discounts you
                  received.
                </li>
              </ul>
              {bookingDetails?.status !== "cancelled" && (
                <div className="mt-6 w-full flex justify-center">
                  <CancelBookingDialog bookingDetails={bookingDetails} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BookingDetails;
