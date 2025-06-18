import { supabase } from "@/supabaseConfig";
import { useQuery } from "@tanstack/react-query";

/**
 * React Query hook to get best price and matching group size rows
 */
export const usePriceByGroupSize = (serviceId, groupSize) => {
  return useQuery({
    queryKey: ["pricebygroupsize", serviceId, groupSize],

    queryFn: async () => {
      if (!serviceId || typeof groupSize !== "number" || isNaN(groupSize)) {
        console.warn("Skipping query due to invalid serviceId or groupSize", { serviceId, groupSize });
        return { matchingRows: [], bestPrice: 0, maxGroupSize: 0 };
      }

      // Fetch all rows for the given service ID
      const { data, error } = await supabase
        .from("pricebygroupsize")
        .select("*")
        .eq("service_id", serviceId);

      if (error) {
        console.error("Error fetching price data:", error.message);
        throw new Error(error.message);
      }

      const allPrices = data || [];

      // Process each item to extract group range [min, max]
      const matchingRows = allPrices.filter((item) => {
        try {
          const groupRange = Array.isArray(item.group_size)
            ? item.group_size
            : JSON.parse(item.group_size.replace(/{/g, "[").replace(/}/g, "]"));

          const [min, max] = groupRange;
          return Number(min) <= groupSize && groupSize <= Number(max);
        } catch (err) {
          console.warn("Skipping invalid group_size format for item:", item);
          return false;
        }
      });

      // Pick the row with the smallest upper bound among matching
      const bestPriceRow = matchingRows.reduce((best, current) => {
        const bestMax = Number(best?.group_size?.[1] || 99999);
        const currentMax = Number(current.group_size?.[1] || 99999);
        return currentMax < bestMax ? current : best;
      }, null);

      // Find the highest max group size across all rows
      const maxGroupSize = allPrices.reduce((max, item) => {
        try {
          const groupRange = Array.isArray(item.group_size)
            ? item.group_size
            : JSON.parse(item.group_size.replace(/{/g, "[").replace(/}/g, "]"));

          const upper = Number(groupRange[1]) || 0;
          return upper > max ? upper : max;
        } catch {
          return max;
        }
      }, 0);

      return {
        matchingRows,
        bestPrice: Number(bestPriceRow?.price || 0),
        maxGroupSize,
      };
    },

    enabled: Boolean(serviceId && typeof groupSize === "number" && !isNaN(groupSize)),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    keepPreviousData: true,
  });
};
