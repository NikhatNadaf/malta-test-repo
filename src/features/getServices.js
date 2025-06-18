import { supabase } from "@/supabaseConfig";

export const getServices = async () => {
  try {
    const { data: services, error } = await supabase
      .from("services")
      .select("*");
    if (error) throw error;
    return services;
  } catch (error) {
    console.error("Error fetching services:", error.message);
    return [];
  }
};

export const getServicesWithTypeandSubType = async () => {
  try {
    const { data: services, error } = await supabase.from("services").select(`
        *,
        servicetype(name),
        servicesubtype(name),
        supplieraccess(name)
      `);

    if (error) throw error;

    const formattedServices = services.map((service) => ({
      ...service,
      service_type_name: service.servicetype?.name || null,
      service_sub_type_name: service.servicesubtype?.name || null,
      supplier_name: service.supplieraccess?.name || null,
    }));

    return formattedServices;
  } catch (error) {
    console.error("Error fetching services:", error.message);
    return [];
  }
};
