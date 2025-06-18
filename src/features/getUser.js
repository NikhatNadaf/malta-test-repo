import { supabase } from "@/supabaseConfig";

export const getUserFromDatabase = async (authId) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", authId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user from database:", error.message);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user from database:", error.message);
    return null;
  }
};
