import { supabase } from "@/supabaseConfig";
import { useQuery } from "@tanstack/react-query";

const fetchServices = async () => {
  const { data, error } = await supabase
    .from("services")
    .select("*, supplieraccess(*)")
    .eq("status", "active");

  if (error) throw new Error(error.message);
  return data;
};

export const useFetchServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });
};

export default useFetchServices;
