import { supabase } from "@/supabaseConfig";

export const addReview = async (newReview) => {
  try {
    const { data, error } = await supabase
      .from("servicecomments")
      .insert([
        {
          rating: newReview.rating,
          description: newReview.description,
          service_id: newReview.service_id,
          user_id: newReview.user_id,
          location: newReview.location,
        },
      ])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding review:", error.message);
    return null;
  }
};
