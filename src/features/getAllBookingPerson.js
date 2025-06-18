import { supabase } from "@/supabaseConfig";
import { useQuery } from "@tanstack/react-query";

const fetchServiceBookingPersons = async () => {
  const { data, error } = await supabase
    .from("servicebookingperson")
    .select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const useFetchServiceBookingPersons = () => {
  return useQuery({
    queryKey: ["servicebookingpersons"],
    queryFn: fetchServiceBookingPersons,
  });
};
export default useFetchServiceBookingPersons;
