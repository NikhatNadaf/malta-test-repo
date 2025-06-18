import { supabase } from "@/supabaseConfig";

export const getContacts = async () => {
  try {
    const { data, error } = await supabase.from("contacts").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user from database:", error.message);
    return null;
  }
};