import { supabase } from "@/supabaseConfig";

export const getAllBookings = async () => {
  try {
    const { data: bookings, error } = await supabase
      .from("servicebookings")
      .select(`
        *,
        service_id (
          name,
          price,
          location,
          description,
          date
        ),
        created_by (
          name,
          email
        ),
        supplier_id (
          name
        ),
        servicebookingperson (
          *,
          user_id (
            name,
            email,
            mobile_no
          )
        )
      `);

    if (error) throw error;
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    return [];
  }
};
