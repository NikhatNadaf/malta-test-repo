import { supabase } from "@/supabaseConfig";

export const getWebReviews = async () => {
  try {
    const { data, error } = await supabase.from("webcomments").select(
      `
        *,
        users (
          id,
          name,
          email,
          mobile_no,
          auth_id,
          created_at
        )
      `
    );
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching reviews with user data:", error.message);
    return [];
  }
};
