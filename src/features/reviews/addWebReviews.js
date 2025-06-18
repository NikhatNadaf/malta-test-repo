import { supabase } from "@/supabaseConfig";

export const addWebReview = async (newReview) => {
  try {
    const { data, error } = await supabase
      .from("webcomments")
      .insert([
        {
          rating: newReview.rating,
          description: newReview.description,
          user_id: newReview.user_id,
          location: newReview.location,
        },
      ])
      .select();
    console.log(error);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding review:", error.message);
    return null;
  }
};
