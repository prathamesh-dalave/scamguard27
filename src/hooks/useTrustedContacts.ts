import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface TrustedContact {
  id: string;
  user_id: string;
  family_member_id: string | null;
  name: string;
  phone: string;
  created_at: string;
}

export function useTrustedContacts() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["trusted_contacts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("trusted_contacts").select("*").order("created_at");
      if (error) throw error;
      return data as TrustedContact[];
    },
    enabled: !!user,
  });
}

export function useAddTrustedContact() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (contact: { name: string; phone: string; family_member_id?: string }) => {
      const { data, error } = await supabase.from("trusted_contacts").insert({ ...contact, user_id: user!.id }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trusted_contacts"] }),
  });
}

export function useDeleteTrustedContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("trusted_contacts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trusted_contacts"] }),
  });
}
