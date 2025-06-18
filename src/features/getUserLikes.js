import { supabase } from "@/supabaseConfig";

export const getUserLikes = async (userId) => {
  try {
    const { data: likes, error } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", userId);
    if (error) throw error;
    return likes;
  } catch (error) {
    console.error("Error fetching likes:", error.message);
    return [];
  }
};
