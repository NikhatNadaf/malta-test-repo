import { supabase } from "@/supabaseConfig";
import { useQuery } from "@tanstack/react-query";

export const getServicesBySupplierAccessId = async (supplierAccessId) => {
  try {
    const { data: services, error } = await supabase
      .from("services")
      .select(
        `*, 
         supplieraccess(*, 
           supplier_company_id:suppliercompany(*)
         )`
      )
      .eq("supplier_access_id", supplierAccessId)
      .eq("status", "active");

    if (error) throw error;
    return services;
  } catch (error) {
    console.error(
      `Error fetching services for Supplier Access ID ${supplierAccessId}:`,
      error.message
    );
    throw error;
  }
};

export const useServicesBySupplier = (supplierAccessId) => {
  return useQuery({
    queryKey: ["services", supplierAccessId],
    queryFn: () => getServicesBySupplierAccessId(supplierAccessId),
    enabled: !!supplierAccessId,
  });
};
