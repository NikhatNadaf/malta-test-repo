import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseConfig";

const fetchVideoUrl = async (path) => {
  const { data } = supabase.storage
    .from("maltaxplore_assets") // Replace 'videos' with your Supabase bucket name
    .getPublicUrl(path); // Get public URL of the uploaded video

  return data.publicUrl;
};

export const useVideo = (path) => {
  return useQuery({
    queryKey: ["maltaxplore_assets", path],
    queryFn: () => fetchVideoUrl(path),
    enabled: !!path,
  });
};
