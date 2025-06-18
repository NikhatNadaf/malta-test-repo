import { supabase } from "@/supabaseConfig";
import { useQuery } from "@tanstack/react-query";

export const getServiceReviews = async (serviceId) => {
  try {
    const { data, error } = await supabase
      .from("servicecomments")
      .select(`*, service_id(*), users(*)`)
      .eq("service_id", serviceId);

    if (error) console.log(error);
    return data;
  } catch (error) {
    console.error("Error fetching reviews with user data:", error.message);
    console.log("Failed to fetch reviews");
  }
};

export const useServiceReviews = (serviceId) => {
  return useQuery({
    queryKey: ["serviceReviews", serviceId],
    queryFn: () => getServiceReviews(serviceId),
    enabled: !!serviceId,
  });
};

// export const getAllServiceReviews = async () => {
//   try {
//     const { data, error } = await supabase.from("servicecomments").select(
//       `
//         *,
//         services ()
//       `
//     );

//     if (error) throw error;
//     return data;
//   } catch (error) {
//     console.error(
//       "Error fetching reviews with user and service data:",
//       error.message
//     );
//     return [];
//   }
// };

// export const useAllServiceReviews = () => {
//   return useQuery({
//     queryKey: ["serviceReviews"],
//     queryFn: () => getServiceReviews(),
//   });
// };
