import { supabase } from "@/supabaseConfig";

export const getServiceType = async () => {
  try {
    const { data, error } = await supabase.from("servicetype").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user from database:", error.message);
    return null;
  }
};