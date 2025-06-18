import { supabase } from "@/supabaseConfig";

export const getServiceSubType = async (id) => {
  try {
    const { data, error } = await supabase
      .from("servicesubtype")
      .select("*")
      .eq("service_id", id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user from database:", error.message);
    return null;
  }
};
