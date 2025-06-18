import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseConfig";

const fetchPromoCodes = async (serviceId, originalPrice) => {
  if (!originalPrice) return [];

  let { data, error } = await supabase
    .from("service_promocodes")
    .select(`id, promocode_id(*), service_id, created_at`)
    .eq("service_id", serviceId);

  if (error) {
    throw new Error("Error fetching promo codes: " + error.message);
  }
  console.log();

  const extractedPromoCodes = data
    .map((item) => item.promocode_id)
    .filter((code) => code !== null)
    .filter(
      (code) => !code.min_ticket_price || originalPrice >= code.min_ticket_price
    );
  return extractedPromoCodes;
};

export const usePromoCodes = (serviceId, originalPrice) => {
  return useQuery({
    queryKey: ["promoCodes", serviceId, originalPrice],
    queryFn: () => fetchPromoCodes(serviceId, originalPrice),
    enabled: !!serviceId && !!originalPrice,
  });
};
