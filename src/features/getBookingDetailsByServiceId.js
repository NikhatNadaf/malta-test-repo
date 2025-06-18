const { supabase } = require("@/supabaseConfig");

export const getBookingByServiceId = async (serviceId) => {
    console.log("Fetching booking for serviceId:", serviceId); // Log the serviceId
    try {
    const { data: bookingData, error: bookingError } = await supabase
      .from("servicebookings")
      .select("*")
      .eq("service_id", serviceId)
      .single();
    if (bookingError) {
      throw new Error(bookingError.message);
    }

    return bookingData;
  } catch (error) {
    console.log(error.message);
  }
};
