import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseConfig";

const fetchTaxRate = async () => {
  const { data, error } = await supabase.from("taxandrate").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useTaxRate = () => {
  return useQuery({
    queryKey: ["taxRate"],
    queryFn: fetchTaxRate,
  });
};