import { supabase } from "@/supabaseConfig";
import { create } from "zustand";

export const useServicesState = create((set) => ({
  services: [],
  isLoading: false,

  setServices: (services) => set({ services }),
  setIsLoading: (isLoading) => set({ isLoading }),

  likeService: async (data, userId) => {
    if (data && userId) {
      console.log(data, userId);
      try {
        const response = await supabase
          .from("likes")
          .insert([{ user_id: userId, service_id: data.id }])
          .select();
        console.log("response", response);
      } catch (error) {
        console.error("Error liking service:", error);
        throw error;
      }
    }
  },

  unlikeService: async (service, userId) => {
    if (service && userId) {
      try {
        const response = await supabase
          .from("likes")
          .delete()
          .eq("user_id", userId)
          .eq("service_id", service.id);
        console.log(response);
      } catch (error) {
        console.error("Error unliking service:", error);
        throw error;
      }
    }
  },
}));


export const useServiceTypeState = create((set) => ({
  serviceType: [],
  isLoading: false,

  setServiceType: (serviceType) => set({ serviceType }),
  setIsServiceTypeLoading: (isLoading) => set({ isLoading }),
}));
