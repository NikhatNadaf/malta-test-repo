import { supabase } from "@/supabaseConfig";
import { useQuery } from "@tanstack/react-query";

const fetchBookingCount = async (serviceId) => {
  const { count, error } = await supabase
    .from("servicebookings")
    .select("*", { count: "exact", head: true })
    .eq("service_id", serviceId);

  if (error) throw new Error(error.message);
  return count;
};

export const useServiceBookingCount = (serviceId) => {
  return useQuery({
    queryKey: ["serviceBookings", serviceId],
    queryFn: () => fetchBookingCount(serviceId),
    enabled: !!serviceId,
  });
};
