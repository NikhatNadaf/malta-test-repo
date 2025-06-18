import { supabase } from "@/supabaseConfig";

export const updateBookingStatus = async (bookingId) => {
  try {
    const { data, error } = await supabase
      .from("servicebookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId);

    if (error) throw error; 

    console.log("Booking status updated to cancelled:", data);
    return data;  
  } catch (error) {
    console.error("Error updating booking status:", error.message);
    throw error; 
  }
};
