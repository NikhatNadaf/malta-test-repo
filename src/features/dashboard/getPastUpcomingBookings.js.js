import { supabase } from "@/supabaseConfig";
import { useQuery } from "@tanstack/react-query";

export const getPastUpcomingBookings = async (userId) => {
  try {
    const { data: bookingData, error: bookingError } = await supabase
      .from("servicebookingperson")
      .select(
        `
        *,
        servicebookings (*),
        services (*)
      `
      )
      .eq("user_id", userId);

    if (bookingError) throw bookingError;

    const today = new Date();

    const pastBookings = bookingData.filter((booking) => {
      const startDate = new Date(booking.servicebookings.start_date);
      const durationInMs = booking.servicebookings.duration * 60 * 60 * 1000;
      const endTime = new Date(startDate.getTime() + durationInMs);

      return endTime < today && booking.servicebookings.status !== "cancelled";
    });

    const upcomingBookings = bookingData.filter((booking) => {
      const startDate = new Date(booking.servicebookings.start_date);
      const endDate = new Date(booking.servicebookings.end_date);
      return (
        (startDate >= today || endDate >= today) &&
        booking.servicebookings.status !== "cancelled"
      );
    });

    const cancelledBookings = bookingData.filter((booking) => {
      return booking.servicebookings.status === "cancelled";
    });

    return { pastBookings, upcomingBookings, cancelledBookings };
  } catch (error) {
    console.error("Error fetching bookings for user:", error.message);
    return { pastBookings: [], upcomingBookings: [], cancelledBookings: [] };
  }
};

export const useBookings = (userId) => {
  return useQuery({
    queryKey: ["bookings", userId],
    queryFn: () => fetchBookings(userId),
    enabled: !!userId,
  });
};
