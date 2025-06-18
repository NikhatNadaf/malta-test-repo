import { supabase } from "@/supabaseConfig";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export const useSupabaseQuery = (dbName, key, id, ...props) => {
  return useQuery({
    queryKey: [dbName, key, id],
    queryFn: () => supabase.from(dbName).select("*").eq(key, id),
    enabled: !!id,
    ...props,
  });
};
export const useSupabaseGetAllQuery = (dbName, ...props) => {
  return useQuery({
    queryKey: [dbName],
    queryFn: () => supabase.from(dbName).select("*"),
    ...props,
  });
};

export const useSupabaseUserQuery = (session, ...props) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => supabase.auth.getUser(),
    enabled: !!session,
    ...props,
  });
};
