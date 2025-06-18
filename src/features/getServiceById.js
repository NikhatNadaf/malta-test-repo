import { supabase } from "@/supabaseConfig";
import { useQuery } from "@tanstack/react-query";

export const getServiceById = async (id) => {
  try {
    const { data: service, error } = await supabase
      .from("services")
      .select(
        `*, 
         supplieraccess(*, 
           supplier_company_id:suppliercompany(*)
         ),
         service_type(*)
         `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return service;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error.message);
    throw error;
  }
};

export const useService = (id) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });
};
