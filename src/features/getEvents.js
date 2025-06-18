import { supabase } from "@/supabaseConfig";
import { useQuery } from "@tanstack/react-query";

export const fetchEvents = async () => {
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};
