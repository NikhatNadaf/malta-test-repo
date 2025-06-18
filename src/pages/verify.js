import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { sendEmail, sendEmailToBookingPersons } from "@/features/sendEmail";
import { usePaymentDetails } from "@/features/getPaymentDetails";
import { supabase } from "@/supabaseConfig";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);

function verify() {
  const router = useRouter();
  const {
    bookingId,
    payment_intent,
    payment_intent_client_secret,
    redirect_status,
  } = router.query;

  const {
    data: paymentDetails,
    loading,
    isError,
    error,
  } = usePaymentDetails(stripePromise, payment_intent_client_secret);

  const [session, setSession] = useState();
  const [users, setUsers] = useState([]);
  const [service, setService] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      setSession(data);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchBookingPersons = async () => {
      try {
        const { data: bookingData, error: bookingError } = await supabase
          .from("servicebookingperson")
          .select(`user_id, service_id, booking_id(*, created_by(*))`)
          .eq("booking_id", bookingId);

        if (bookingError) {
          console.log(bookingError);
          return;
        }
        setBookingData(bookingData);
        if (bookingData.length > 0) {
          const userIds = bookingData.map((booking) => booking.user_id);
          const serviceIds = bookingData.map((booking) => booking.service_id);

          const [usersRes, servicesRes] = await Promise.all([
            supabase.from("users").select("*").in("id", userIds),
            supabase.from("services").select("*").in("id", serviceIds),
          ]);

          if (usersRes.error || servicesRes.error) {
            console.log(usersRes.error || servicesRes.error);
            return;
          }

          const filteredUsers = usersRes.data.filter(
            (user) => user.auth_id !== session?.user.id
          );

          setUsers(filteredUsers);
          setService(servicesRes.data);
        }
      } catch (err) {}
    };

    if (bookingId) {
      fetchBookingPersons();
    }
  }, [bookingId]);

  useEffect(() => {
    if (!paymentDetails || !service?.length) return;

    const updatePaymentStatus = async () => {
      if (paymentDetails?.status === "succeeded" && paymentDetails) {
        const { data, error } = await supabase
          .from("servicebookings")
          .update({ payment_status: true, status: "confirmed" })
          .eq("payment_intent_id", paymentDetails.id);

        if (error) {
          console.error("Error updating payment status:", error);
        } else {
          console.log("Payment status updated successfully:", data);
        }

        if (
          paymentDetails &&
          paymentDetails.status === "succeeded" &&
          service?.length > 0
        ) {
          const templateDetails = {
            booking_id: bookingId,
            service_name: service[0]?.name,
            service_date: "-",
            service_location: service[0]?.location,
            service_location: service[0]?.location,
            service_location: service[0]?.location,
            pickup_location: bookingData?.[0]?.booking_id?.pickup_location,
            pickup_date: bookingData?.[0]?.booking_id?.pickup_date,
            pickup_time: bookingData?.[0]?.booking_id?.pickup_time,
            booker_name: bookingData?.[0]?.booking_id?.created_by?.name,
            total_tickets_booked: users.length,
          };

          for (const user of users) {
            const emailTemplate = {
              ...templateDetails,
              guest_name: user.name,
              email: user.email,
              id: user.id,
            };

            sendEmail(paymentDetails, templateDetails);
            sendEmailToBookingPersons(
              templateDetails,
              emailTemplate,
              bookingData
            );
          }
        }
        router.replace({
          pathname: `/complete`,
          query: {
            bookingId,
            payment_intent,
            payment_intent_client_secret,
            redirect_status,
          },
        });
      }
    };

    updatePaymentStatus();
  }, [paymentDetails, service, bookingData]);
}

export default verify;
